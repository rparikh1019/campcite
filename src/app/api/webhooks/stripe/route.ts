import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return new Stripe(key);
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase credentials not set");
  }
  return createClient(url, key);
}

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  const stripe = getStripe();
  const supabase = getSupabase();

  const PRICE_TO_PLAN: Record<string, string> = {
    [process.env.STRIPE_PRICE_STARTER_MONTHLY || ""]: "starter",
    [process.env.STRIPE_PRICE_STARTER_ANNUAL || ""]: "starter",
    [process.env.STRIPE_PRICE_GROWTH_MONTHLY || ""]: "growth",
    [process.env.STRIPE_PRICE_GROWTH_ANNUAL || ""]: "growth",
    [process.env.STRIPE_PRICE_PRO_MONTHLY || ""]: "pro",
    [process.env.STRIPE_PRICE_PRO_ANNUAL || ""]: "pro",
  };

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const subscriptionId = session.subscription as string;

      if (userId && subscriptionId) {
        // Get subscription to find the plan
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const priceId = subscription.items.data[0]?.price.id;
        const plan = PRICE_TO_PLAN[priceId] || "starter";

        await supabase
          .from("users")
          .update({
            plan,
            stripe_subscription_id: subscriptionId,
            trial_ends_at: null,
          })
          .eq("id", userId);
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata?.userId;
      const priceId = subscription.items.data[0]?.price.id;
      const plan = PRICE_TO_PLAN[priceId] || "starter";

      if (userId) {
        await supabase.from("users").update({ plan }).eq("id", userId);
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata?.userId;

      if (userId) {
        await supabase
          .from("users")
          .update({
            plan: "trial",
            stripe_subscription_id: null,
          })
          .eq("id", userId);
      }
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const customerId = invoice.customer as string;

      // Find user by customer ID
      const { data: user } = await supabase
        .from("users")
        .select("id, payment_failure_count")
        .eq("stripe_customer_id", customerId)
        .single();

      if (user) {
        await supabase
          .from("users")
          .update({
            payment_failed_at: new Date().toISOString(),
            payment_failure_count: (user.payment_failure_count || 0) + 1,
          })
          .eq("id", user.id);

        // TODO: Send dunning emails based on failure count
      }
      break;
    }

    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice;
      const customerId = invoice.customer as string;

      await supabase
        .from("users")
        .update({
          payment_failed_at: null,
          payment_failure_count: 0,
        })
        .eq("stripe_customer_id", customerId);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
