import Stripe from "stripe";

export const runtime = "nodejs";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY);
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

    if (inv.attempt_count === 1 || inv.next_payment_attempt === null) {
      try {
        await stripe.invoices.sendInvoice(inv.id);
        console.log(
          `Sent invoice ${inv.id} to customer (attempt ${inv.attempt_count})`
        );
      } catch (err) {
        console.error(`Failed to send invoice ${inv.id}:`, err.message);
      }
    }
  }

  return Response.json({ received: true });
}
