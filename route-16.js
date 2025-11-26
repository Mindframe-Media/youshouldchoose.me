/* Criado por Mindframe Media */

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { stripe } from "../../../lib/stripe";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }
  
  // Handle checkout.session.completed
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const projectId = session.metadata.projectId;
    const priceTier = session.metadata.priceTier;
    
    // Calcular data de expiração
    const daysMap = {
      "10_days": 10,
      "20_days": 20,
      "30_days": 30,
    };
    
    const days = daysMap[priceTier] || 10;
    const publishUntil = new Date();
    publishUntil.setDate(publishUntil.getDate() + days);
    
    // Atualizar projeto
    await supabase
      .from("projects")
      .update({
        publish_until: publishUntil.toISOString().split("T")[0],
        status: "pending_review",
      })
      .eq("id", projectId);
  }
  
  return NextResponse.json({ received: true });
}
