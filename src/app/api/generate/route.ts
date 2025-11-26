/* Criado por Mindframe Media */
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      projectType,
      projectName,
      aboutClient,
      targetAudience,
      toneOfVoice,
      keyPoints,
      references,
    } = body;

    // Validação básica
    if (!projectName || !aboutClient || !targetAudience || !keyPoints) {
      return NextResponse.json(
        { error: "Campos obrigatórios em falta" },
        { status: 400 }
      );
    }

    // Construir prompt hiper-moderno para a IA
    const prompt = `
/* Criado por Mindframe Media */

Gera uma página completa em HTML, CSS e JS inline com design hiper-moderno e esteticamente impactante.

**INFORMAÇÕES DO PROJETO:**
- Tipo de projeto: ${projectType}
- Nome do projeto: ${projectName}
- Sobre o cliente/marca: ${aboutClient}
- Público-alvo: ${targetAudience}
- Tom de voz: ${toneOfVoice}
- Pontos-chave a comunicar:
${keyPoints}
${references ? `- Referências: ${references}` : ""}

**REQUISITOS OBRIGATÓRIOS DE DESIGN:**

Visual futurista e fluído
- Hierarquia visual forte
- Uso intenso de efeitos de luz, gradientes profundos e glassmorphism
- Secções amplas com espaçamento generoso
- Títulos muito grandes, expressivos e elegantes
- Animações suaves em hover (translateY, scale, opacity)
- Hero com gradiente dinâmico e elementos animados
- Cartões com sombra profunda e bordas arredondadas
- Botões com animação de brilho suave

**ESPECIFICAÇÕES TÉCNICAS OBRIGATÓRIAS:**
- Não usar frameworks (somente HTML, CSS e JS puro)
- Criar um <style> interno com todas as classes
- Criar um <script> no final com micro-animações simples
- Construir estrutura mobile-first
- Manter o design system:

**DESIGN SYSTEM OBRIGATÓRIO:**

Cores (usar exatamente):
  - Fundo primário: #0A0F1F
  - Fundo secundário: #111828
  - Acento azul principal: #3B82F6
  - Acento luminoso: #60A5FA
  - Gradiente hero: linear-gradient(135deg, #1E3A8A 0%, #0A0F1F 100%)
  - Texto principal: #F1F5F9
  - Texto suave: #94A3B8

Tipografia (obrigatória):
  - Font-family: "Inter", sans-serif
  - Títulos: font-weight: 700-900; font-size: clamp(3rem, 8vw, 5rem);
  - Subtítulos: font-size: clamp(1.5rem, 4vw, 2rem);
  - Corpo: font-size: 1rem; line-height: 1.7;

Radii e sombras:
  - Border-radius global: 22px
  - Cartões: box-shadow: 0 20px 45px rgba(0,0,0,0.45);

Efeitos obrigatórios:
  - Glass effect: backdrop-filter: blur(12px); opacity: 0.92;
  - Hover com movimento: transform: translateY(-6px); transition: all 0.25s;
  - Animações lentas: 5-12s

**ESTRUTURA OBRIGATÓRIA:**
Gera sempre:
- Hero com gradiente dinâmico e elementos animados (partículas leves, glow pulses)
- Secção de apresentação
- Secção de destaques
- Secção de benefícios
- Secção final com CTA forte

**TEXTO:**
- Usa português claro, direto e profissional
- O conteúdo textual deve ser adaptado às inputs fornecidas (tema, objetivo, público-alvo e estilo)

**IMPORTANTE:**
Retorna APENAS o código HTML completo (incluindo CSS inline em <style> e JavaScript em <script>). 
Não incluas explicações, markdown, ou blocos de código. 
Apenas o HTML puro pronto a usar, começando com <!DOCTYPE html>.
`;

    // Chamar a API da OpenAI com o novo prompt
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "És um expert em web design hiper-moderno e desenvolvimento. Crias páginas web com design futurista, fluído e visualmente impactante em HTML/CSS/JavaScript puro. O teu código segue rigorosamente o design system fornecido, com gradientes profundos, glassmorphism, animações suaves e tipografia ousada. Cada página que crias parece ter sido feita por uma agência de creative tech premium.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    let generatedHTML = completion.choices[0]?.message?.content || "";

    if (!generatedHTML) {
      return NextResponse.json(
        { error: "Falha ao gerar conteúdo" },
        { status: 500 }
      );
    }

    // Limpar markdown se existir
    generatedHTML = generatedHTML
      .replace(/```html\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    return NextResponse.json({
      success: true,
      html: generatedHTML,
      projectName,
    });
  } catch (error: any) {
    console.error("Erro na geração:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao gerar página" },
      { status: 500 }
    );
  }
}
