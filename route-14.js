/* Criado por Mindframe Media */

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { buildPresentationPrompt } from "../../../lib/aiPrompts";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Função abstrata para chamar o modelo AI
async function callAIModel(prompt) {
  // Aqui você integraria com OpenAI, Anthropic, etc.
  // Por agora, retorna um mock
  return {
    layout: "scroll",
    sections: [
      {
        id: "hero",
        type: "hero",
        headline: "Bem-vindo ao futuro",
        subheadline: "Transformamos ideias em realidade",
        primary_cta: "Começar agora",
        secondary_cta: "Saber mais",
        background_hint: "gradient-blue",
      },
      {
        id: "about",
        type: "text_block",
        title: "Sobre nós",
        body: "Somos uma equipa dedicada a criar experiências incríveis.",
      },
    ],
  };
}

export async function POST(request) {
  try {
    const { projectId, formInputs } = await request.json();
    
    if (!projectId || !formInputs) {
      return NextResponse.json(
        { error: "Dados inválidos" },
        { status: 400 }
      );
    }
    
    // Buscar projeto
    const { data: project, error: fetchError } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .single();
    
    if (fetchError) {
      return NextResponse.json(
        { error: "Projeto não encontrado" },
        { status: 404 }
      );
    }
    
    // Construir prompt
    const prompt = buildPresentationPrompt(formInputs);
    
    // Chamar AI
    const aiContent = await callAIModel(prompt);
    
    // Atualizar projeto
    const { error: updateError } = await supabase
      .from("projects")
      .update({
        ai_request_payload: formInputs,
        ai_generated_content: aiContent,
        status: "draft",
      })
      .eq("id", projectId);
    
    if (updateError) {
      return NextResponse.json(
        { error: "Erro ao atualizar projeto" },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      content: aiContent,
    });
  } catch (error) {
    console.error("Erro na API generate:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
