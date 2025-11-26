/* Criado por Mindframe Media */

export function buildPresentationPrompt(inputs) {
  const {
    project_type,
    title,
    about_client,
    target_audience,
    tone_of_voice,
    key_points,
  } = inputs;

  return `
Gera um layout de ${project_type} em formato JSON.

Requisitos:
- Linguagem em português.
- Título principal forte.
- Tom de voz: ${tone_of_voice}.
- Público-alvo: ${target_audience}.

Dados do cliente:
${about_client}

Pontos-chave:
${key_points}

Formato de resposta (JSON válido):
{
  "layout": "scroll",
  "sections": [
    {
      "id": "hero",
      "type": "hero",
      "headline": "...",
      "subheadline": "...",
      "primary_cta": "...",
      "secondary_cta": "...",
      "background_hint": "..."
    },
    {
      "id": "problem",
      "type": "text_block",
      "title": "...",
      "body": "..."
    }
  ]
}
`;
}
