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

    // Construir prompt para a IA
    const prompt = `
Cria uma página web moderna e profissional em HTML/CSS/JavaScript com base nas seguintes informações:

**Tipo de projeto:** ${projectType}
**Nome do projeto:** ${projectName}
**Sobre o cliente/marca:** ${aboutClient}
**Público-alvo:** ${targetAudience}
**Tom de voz:** ${toneOfVoice}
**Pontos-chave a comunicar:**
${keyPoints}

${references ? `**Referências:** ${references}` : ""}

**Requisitos técnicos:**
- Design moderno, responsivo e profissional
- Paleta de cores adequada ao tom de voz e público-alvo
- Estrutura clara e navegação intuitiva
- Animações subtis e transições suaves
- Otimizado para mobile e desktop
- Código limpo e bem organizado
- Incluir meta tags para SEO

**Estrutura esperada:**
${projectType === "website" ? "- Hero section com título impactante\n- Secções sobre serviços/produtos\n- Secção sobre a empresa\n- Call-to-action\n- Footer com contactos" : ""}
${projectType === "pitch" ? "- Slide de abertura com título\n- Problema e solução\n- Proposta de valor\n- Equipa ou credenciais\n- Call-to-action" : ""}
${projectType === "onepage" ? "- Hero section\n- Secções de conteúdo com scroll suave\n- Navegação fixa\n- Call-to-action\n- Footer" : ""}

Retorna APENAS o código HTML completo (incluindo CSS inline ou em <style> e JavaScript em <script>). Não incluas explicações, apenas o código pronto a usar.
`;

    // Chamar a API da OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "És um expert em web design e desenvolvimento. Crias páginas web modernas, responsivas e profissionais em HTML/CSS/JavaScript puro. O teu código é limpo, bem estruturado e otimizado.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    const generatedHTML = completion.choices[0]?.message?.content || "";

    if (!generatedHTML) {
      return NextResponse.json(
        { error: "Falha ao gerar conteúdo" },
        { status: 500 }
      );
    }

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
