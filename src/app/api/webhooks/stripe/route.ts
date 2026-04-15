import { NextRequest } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

function getWebhookSecret() {
  return process.env.STRIPE_WEBHOOK_SECRET!;
}

// Map Stripe price IDs to products
const PRODUCT_MAP: Record<
  string,
  { name: string; type: "macro-course" | "daily-reports" | "mentorship" }
> = {
  // These will be populated with actual Stripe price IDs
  [process.env.STRIPE_PRICE_MACRO_COURSE!]: {
    name: "Macroeconomics for Financial Markets & Trading",
    type: "macro-course",
  },
  [process.env.STRIPE_PRICE_DAILY_REPORTS!]: {
    name: "Daily Macroeconomic Reports",
    type: "daily-reports",
  },
  [process.env.STRIPE_PRICE_MENTORSHIP!]: {
    name: "1-on-1 Mentorship: 12-Week Trading Curriculum",
    type: "mentorship",
  },
};

function getMacroCourseEmail(name: string) {
  return {
    subject: "Welcome to Macroeconomics for Financial Markets & Trading",
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: #121f37; padding: 40px 30px; text-align: center;">
          <h1 style="color: #ffffff; font-size: 24px; margin: 0;">Welcome to JS Financials</h1>
          <p style="color: #a48420; font-size: 14px; margin-top: 8px;">Macroeconomics for Financial Markets & Trading</p>
        </div>
        <div style="padding: 30px;">
          <p style="color: #333; font-size: 16px; line-height: 1.6;">Hi ${name},</p>
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Thank you for enrolling in <strong>Macroeconomics for Financial Markets & Trading</strong>. You now have lifetime access to the full 25,000+ word course covering how macroeconomic forces drive asset prices across FX, equities, commodities, fixed income, and crypto.
          </p>
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Your course PDF is attached to this email. Save it somewhere accessible — you'll want to refer back to it as you work through the modules. The course is designed to be studied at your own pace, and you can revisit any section at any time.
          </p>
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            If you have any questions as you work through the material, reach out directly via Instagram <a href="https://www.instagram.com/js_financials" style="color: #a48420;">@js_financials</a> or reply to this email.
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
  };
}

function getDailyReportsEmail(name: string) {
  return {
    subject: "Welcome to JSF Daily Macroeconomic Reports",
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: #121f37; padding: 40px 30px; text-align: center;">
          <h1 style="color: #ffffff; font-size: 24px; margin: 0;">Welcome to JS Financials</h1>
          <p style="color: #a48420; font-size: 14px; margin-top: 8px;">Daily Macroeconomic Reports</p>
        </div>
        <div style="padding: 30px;">
          <p style="color: #333; font-size: 16px; line-height: 1.6;">Hi ${name},</p>
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Thank you for subscribing to <strong>JSF Daily Macroeconomic Reports</strong>. Here's how it works:
          </p>
          <ul style="color: #333; font-size: 16px; line-height: 1.8; padding-left: 20px;">
            <li>You'll receive your report <strong>every day at 10:00 PM AEDT</strong>, seven days a week</li>
            <li>Each report covers <strong>40+ FX pairs, 9 commodities, 9 equity indices, and 8 cryptocurrencies</strong></li>
            <li>Reports include a global macro overview, fundamental analysis, and an all-asset dashboard with bias, risk scores, and tradability rankings</li>
            <li>Reports are delivered straight to this email address</li>
          </ul>
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Your first report will arrive at 10:00 PM AEDT tonight (or tomorrow if you're subscribing after 10 PM). Use it to prepare for the next trading session with institutional-grade macro clarity.
          </p>
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            You can cancel anytime — no lock-in, no questions asked. If you have any questions, reach out via Instagram <a href="https://www.instagram.com/js_financials" style="color: #a48420;">@js_financials</a> or reply to this email.
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
  };
}

function getMentorshipEmail(name: string) {
  return {
    subject: "Welcome to JSF 1-on-1 Mentorship — Let's Get Started",
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: #121f37; padding: 40px 30px; text-align: center;">
          <h1 style="color: #ffffff; font-size: 24px; margin: 0;">Welcome to JS Financials</h1>
          <p style="color: #a48420; font-size: 14px; margin-top: 8px;">1-on-1 Mentorship: 12-Week Curriculum</p>
        </div>
        <div style="padding: 30px;">
          <p style="color: #333; font-size: 16px; line-height: 1.6;">Hi ${name},</p>
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Thank you for joining the <strong>JSF 1-on-1 Mentorship Program</strong>. I'm looking forward to working with you over the next 12 weeks.
          </p>
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            <strong>Here's what happens next:</strong>
          </p>
          <ol style="color: #333; font-size: 16px; line-height: 1.8; padding-left: 20px;">
            <li>I'll reach out within 24 hours to schedule our first session and discuss your goals</li>
            <li>You'll receive access to your private Discord channel</li>
            <li>You'll get access to the full library of 300+ learning documents</li>
            <li>We'll design your personalised curriculum based on your experience and objectives</li>
          </ol>
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            In the meantime, book your first session directly here:
            <a href="https://calendly.com/jsfinancialsaustralia/30min" style="color: #a48420; font-weight: bold;">Book a Call</a>
          </p>
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            If you have any immediate questions, you can reach me directly via phone (you'll receive my number in our first session), Instagram <a href="https://www.instagram.com/js_financials" style="color: #a48420;">@js_financials</a>, or by replying to this email.
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
  };
}

async function verifyStripeSignature(
  body: string,
  signature: string
): Promise<Record<string, unknown>> {
  // Stripe signature verification using the raw webhook secret
  const encoder = new TextEncoder();
  const parts = signature.split(",");
  const timestamp = parts
    .find((p) => p.startsWith("t="))
    ?.replace("t=", "");
  const sig = parts
    .find((p) => p.startsWith("v1="))
    ?.replace("v1=", "");

  if (!timestamp || !sig) {
    throw new Error("Invalid signature format");
  }

  const signedPayload = `${timestamp}.${body}`;
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getWebhookSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const mac = await crypto.subtle.sign("HMAC", key, encoder.encode(signedPayload));
  const expectedSig = Array.from(new Uint8Array(mac))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  if (expectedSig !== sig) {
    throw new Error("Signature mismatch");
  }

  // Check timestamp is within 5 minutes
  const now = Math.floor(Date.now() / 1000);
  if (now - parseInt(timestamp) > 300) {
    throw new Error("Timestamp too old");
  }

  return JSON.parse(body);
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return Response.json({ error: "No signature" }, { status: 400 });
  }

  let event: Record<string, unknown>;
  try {
    event = await verifyStripeSignature(body, signature);
  } catch {
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return Response.json({ received: true });
  }

  const session = event.data as Record<string, unknown>;
  const sessionObj = session.object as Record<string, unknown>;
  const customerEmail = sessionObj.customer_email as string | null
    || (sessionObj.customer_details as Record<string, unknown>)?.email as string | null;
  const customerName = (sessionObj.customer_details as Record<string, unknown>)?.name as string || "there";

  if (!customerEmail) {
    return Response.json({ error: "No customer email" }, { status: 400 });
  }

  // Get line items to determine which product was purchased
  // The product type is determined by matching the payment link
  const paymentLink = sessionObj.payment_link as string | null;

  let productType: "macro-course" | "daily-reports" | "mentorship" | null = null;

  if (paymentLink) {
    const linkMap: Record<string, "macro-course" | "daily-reports" | "mentorship"> = {
      [process.env.STRIPE_PAYMENT_LINK_MACRO!]: "macro-course",
      [process.env.STRIPE_PAYMENT_LINK_REPORTS!]: "daily-reports",
      [process.env.STRIPE_PAYMENT_LINK_MENTORSHIP!]: "mentorship",
    };
    productType = linkMap[paymentLink] || null;
  }

  if (!productType) {
    // Fallback: try to match via price IDs from line items metadata
    console.log("Could not determine product type from payment link");
    return Response.json({ received: true });
  }

  let emailContent: { subject: string; html: string };
  const attachments: { filename: string; path: string }[] = [];

  switch (productType) {
    case "macro-course":
      emailContent = getMacroCourseEmail(customerName);
      // Attach PDF if it exists
      if (process.env.MACRO_COURSE_PDF_URL) {
        attachments.push({
          filename: "JSF-Macroeconomics-Course.pdf",
          path: process.env.MACRO_COURSE_PDF_URL,
        });
      }
      break;
    case "daily-reports":
      emailContent = getDailyReportsEmail(customerName);
      break;
    case "mentorship":
      emailContent = getMentorshipEmail(customerName);
      break;
  }

  try {
    await getResend().emails.send({
      from: process.env.RESEND_FROM_EMAIL || "JS Financials <hello@jsfinancials.com.au>",
      to: customerEmail,
      subject: emailContent.subject,
      html: emailContent.html,
      ...(attachments.length > 0 ? { attachments } : {}),
    });
  } catch (error) {
    console.error("Failed to send email:", error);
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }

  return Response.json({ received: true, emailSent: true });
}
