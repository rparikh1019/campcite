import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return new Stripe(key);
}

const PRICE_IDS: Record<string, string> = {
  starter_monthly: process.env.STRIPE_PRICE_STARTER_MONTHLY || "",
  starter_annual: process.env.STRIPE_PRICE_STARTER_ANNUAL || "",
  growth_monthly: process.env.STRIPE_PRICE_GROWTH_MONTHLY || "",
  growth_annual: process.env.STRIPE_PRICE_GROWTH_ANNUAL || "",
  pro_monthly: process.env.STRIPE_PRICE_PRO_MONTHLY || "",
  pro_annual: process.env.STRIPE_PRICE_PRO_ANNUAL || "",
};

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { priceKey } = await request.json();
  const priceId = PRICE_IDS[priceKey];

  if (!priceId) {
    return NextResponse.json({ error: "Invalid price" }, { status: 400 });
  }

  const stripe = getStripe();

  // Get or create Stripe customer
  const { data: userProfile } = await supabase
    .from("users")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .single();

  let customerId = userProfile?.stripe_customer_id;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: {
        userId: user.id,
      },
    });
    customerId = customer.id;

    await supabase
      .from("users")
      .update({ stripe_customer_id: customerId })
      .eq("id", user.id);
  }

  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgraded=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings`,
    subscription_data: {
      trial_period_days: 14,
      metadata: {
        userId: user.id,
      },
    },
    metadata: {
      userId: user.id,
    },
  });

  return NextResponse.json({ url: session.url });
}
