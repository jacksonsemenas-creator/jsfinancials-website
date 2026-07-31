import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stripe = getStripe();

  // Find the Stripe customer by email
  const customers = await stripe.customers.list({
    email: user.email,
    limit: 1,
  });

  if (customers.data.length === 0) {
    return Response.json(
      { error: "No subscription found" },
      { status: 404 }
    );
  }

  const customer = customers.data[0];

  // Find active subscriptions for this customer, expanding items to get period end
  const subscriptions = await stripe.subscriptions.list({
    customer: customer.id,
    status: "active",
    expand: ["data.items"],
    limit: 10,
  });

  if (subscriptions.data.length === 0) {
    return Response.json(
      { error: "No active subscription found" },
      { status: 404 }
    );
  }

  // Find the Daily Reports subscription specifically by matching price ID
  const dailyReportsPriceId = process.env.STRIPE_PRICE_DAILY_REPORTS;
  let target = subscriptions.data[0];

  if (dailyReportsPriceId) {
    const match = subscriptions.data.find((sub) =>
      sub.items.data.some((item) => item.price.id === dailyReportsPriceId)
    );
    if (match) target = match;
  }

  // Already set to cancel
  if (target.cancel_at_period_end) {
    const periodEnd = target.items.data[0]?.current_period_end;
    return Response.json({
      canceled: true,
      current_period_end: periodEnd
        ? new Date(periodEnd * 1000).toISOString()
        : null,
    });
  }

  // Cancel at period end so they keep access until the billing cycle ends
  await stripe.subscriptions.update(target.id, {
    cancel_at_period_end: true,
  });

  const periodEnd = target.items.data[0]?.current_period_end;

  return Response.json({
    canceled: true,
    current_period_end: periodEnd
      ? new Date(periodEnd * 1000).toISOString()
      : null,
  });
}
