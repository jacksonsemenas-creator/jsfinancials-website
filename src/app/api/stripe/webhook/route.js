import Stripe from "stripe";
import { Resend } from "resend";

export const runtime = "nodejs";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(req) {
  const stripe = getStripe();
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return Response.json({ error: err.message }, { status: 400 });
  }

  if (event.type === "invoice.payment_failed") {
    const inv = event.data.object;

    {
      try {
        const customerEmail =
          inv.customer_email ||
          inv.receipt_email;

        if (!customerEmail) {
          console.error(`No email found for invoice ${inv.id}`);
          return Response.json({ received: true });
        }

        const customerName =
          inv.customer_name || customerEmail.split("@")[0];

        // Fetch the invoice PDF from Stripe
        const pdfUrl = inv.invoice_pdf;
        let attachments = [];
        if (pdfUrl) {
          const pdfRes = await fetch(pdfUrl);
          const pdfBuffer = Buffer.from(await pdfRes.arrayBuffer());
          attachments.push({
            filename: `invoice-${inv.number || inv.id}.pdf`,
            content: pdfBuffer,
          });
        }

        const hostedUrl = inv.hosted_invoice_url;

        await getResend().emails.send({
          from:
            process.env.RESEND_FROM_EMAIL ||
            "JS Financials <hello@jsfinancials.com.au>",
          to: customerEmail,
          subject: "Overdue Invoice JS Financials",
          html: `
            <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
              <div style="background: #121f37; padding: 40px 30px; text-align: center;">
                <h1 style="color: #ffffff; font-size: 24px; margin: 0;">JS Financials</h1>
                <p style="color: #a48420; font-size: 14px; margin-top: 8px;">Overdue Invoice</p>
              </div>
              <div style="padding: 30px;">
                <p style="color: #333; font-size: 16px; line-height: 1.6;">Hi ${customerName},</p>
                <p style="color: #333; font-size: 16px; line-height: 1.6;">
                  We were unable to process your recent payment. Your invoice is attached to this email as a PDF.
                </p>
                ${hostedUrl ? `
                <p style="color: #333; font-size: 16px; line-height: 1.6;">
                  You can also pay directly online:
                </p>
                <div style="text-align: center; margin: 25px 0;">
                  <a href="${hostedUrl}" style="background: #a48420; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Pay Invoice</a>
                </div>
                ` : ""}
                <p style="color: #333; font-size: 16px; line-height: 1.6;">
                  If you have any questions, reply to this email or reach out via Instagram <a href="https://www.instagram.com/js_financials" style="color: #a48420;">@js_financials</a>.
                </p>
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                  <p style="color: #888; font-size: 13px;">
                    Jackson Semenas<br/>
                    JS Financials<br/>
                    <a href="https://jsfinancials.com.au" style="color: #a48420;">jsfinancials.com.au</a>
                  </p>
                </div>
              </div>
            </div>
          `,
          attachments,
        });

        console.log(
          `Sent overdue invoice email for ${inv.id} to ${customerEmail} (attempt ${inv.attempt_count})`
        );
      } catch (err) {
        console.error(`Failed to send invoice ${inv.id}:`, err.message);
      }
    }
  }

  return Response.json({ received: true });
}
