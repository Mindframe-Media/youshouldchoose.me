/* Criado por Mindframe Media */

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { stripe } from "../../../lib/stripe";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const PRICE_MAP = {
  "10_days": process.env.STRIPE_PRICE_10_DAYS,
  "20_days": process.env.STRIPE_PRICE_20_DAYS,
  "30_days": process.env.STRIPE_PRICE_30_DAYS,
};

export async function POST(request) {
  try {
    const { projectId, priceTier, userEmail } = await request.json();
    
    if (!projectId || !priceTier || !userEmail) {
      return NextResponse.json(
        { error: "Dados inválidos" },
        { status: 400 }
      );
    }
    
    const priceId = PRICE_MAP[priceTier];
    
    if (!priceId) {
      return NextResponse.json(
        { error: "Plano inválido" },
        { status: 400 }
      );
    }
    
    // Criar sessão Stripe
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: userEmail,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?projectId=${projectId}&canceled=1`,
      metadata: {
        projectId,
        priceTier,
      },
    });
    
    // Atualizar projeto
    await supabase
      .from("projects")
      .update({
        stripe_session_id: session.id,
        stripe_price_tier: priceTier,
        status: "pending_review",
      })
      .eq("id", projectId);
    
    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error("Erro na API checkout:", error);
    return NextResponse.json(
      { error: "Erro ao criar sessão de pagamento" },
      { status: 500 }
    );
  }
}
