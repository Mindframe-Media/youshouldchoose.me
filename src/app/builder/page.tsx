/* Criado por Mindframe Media */
"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";

export default function BuilderPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: "",
    projectName: "",
    userEmail: "",
    aboutClient: "",
    targetAudience: "",
    toneOfVoice: "profissional",
    keyPoints: "",
    references: "",
    subdomain: "",
  });

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <main>
      <Header />
      
      <section style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "80px 24px 40px",
        minHeight: "100vh",
      }}>
        <h1 style={{
          fontSize: "2.5rem",
          fontWeight: 700,
          marginBottom: "16px",
          textAlign: "center",
        }}>
          Criar nova página
        </h1>
        
        <p style={{
          textAlign: "center",
          color: "rgba(255,255,255,0.7)",
          marginBottom: "40px",
        }}>
          Passo {step} de 4
        </p>

        {/* Stepper visual */}
        <div style={{
          display: "flex",
          gap: "8px",
          marginBottom: "48px",
          justifyContent: "center",
        }}>
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              style={{
                width: "60px",
                height: "4px",
                borderRadius: "2px",
                backgroundColor: num <= step ? "rgba(59,130,246,1)" : "rgba(148,163,184,0.3)",
                transition: "background-color 0.3s",
              }}
            />
          ))}
        </div>

        {/* Passo 1: Tipo de projeto */}
        {step === 1 && (
          <div>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 600, marginBottom: "24px" }}>
              Que tipo de página queres criar?
            </h2>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { value: "website", label: "Website de apresentação", desc: "Página institucional ou de produto" },
                { value: "pitch", label: "Pitch deck interativo", desc: "Apresentação de negócio ou projeto" },
                { value: "onepage", label: "One-page / Landing de scroll", desc: "Página única com scroll vertical" },
              ].map((option) => (
                <label
                  key={option.value}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    padding: "20px",
                    border: formData.projectType === option.value
                      ? "2px solid rgba(59,130,246,1)"
                      : "1px solid rgba(148,163,184,0.3)",
                    borderRadius: "12px",
                    cursor: "pointer",
                    backgroundColor: formData.projectType === option.value
                      ? "rgba(59,130,246,0.1)"
                      : "transparent",
                    transition: "all 0.2s",
                  }}
                >
                  <input
                    type="radio"
                    name="projectType"
                    value={option.value}
                    checked={formData.projectType === option.value}
                    onChange={(e) => handleChange("projectType", e.target.value)}
                    style={{ marginTop: "4px" }}
                  />
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: "4px" }}>{option.label}</div>
                    <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)" }}>
                      {option.desc}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Passo 2: Dados do projeto */}
        {step === 2 && (
          <div>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 600, marginBottom: "24px" }}>
              Dados do projeto
            </h2>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}>
                  Nome do projeto *
                </label>
                <input
                  type="text"
                  value={formData.projectName}
                  onChange={(e) => handleChange("projectName", e.target.value)}
                  placeholder="Ex: Apresentação Empresa XYZ"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "1px solid rgba(148,163,184,0.3)",
                    backgroundColor: "rgba(15,23,42,0.5)",
                    color: "white",
                    fontSize: "1rem",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}>
                  Teu email *
                </label>
                <input
                  type="email"
                  value={formData.userEmail}
                  onChange={(e) => handleChange("userEmail", e.target.value)}
                  placeholder="email@exemplo.com"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "1px solid rgba(148,163,184,0.3)",
                    backgroundColor: "rgba(15,23,42,0.5)",
                    color: "white",
                    fontSize: "1rem",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}>
                  Sobre o cliente / marca *
                </label>
                <textarea
                  value={formData.aboutClient}
                  onChange={(e) => handleChange("aboutClient", e.target.value)}
                  placeholder="Descreve brevemente o cliente, marca ou projeto..."
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "1px solid rgba(148,163,184,0.3)",
                    backgroundColor: "rgba(15,23,42,0.5)",
                    color: "white",
                    fontSize: "1rem",
                    resize: "vertical",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}>
                  Público-alvo *
                </label>
                <input
                  type="text"
                  value={formData.targetAudience}
                  onChange={(e) => handleChange("targetAudience", e.target.value)}
                  placeholder="Ex: Empresários, jovens profissionais, estudantes..."
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "1px solid rgba(148,163,184,0.3)",
                    backgroundColor: "rgba(15,23,42,0.5)",
                    color: "white",
                    fontSize: "1rem",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}>
                  Tom de voz *
                </label>
                <select
                  value={formData.toneOfVoice}
                  onChange={(e) => handleChange("toneOfVoice", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "1px solid rgba(148,163,184,0.3)",
                    backgroundColor: "rgba(15,23,42,0.5)",
                    color: "white",
                    fontSize: "1rem",
                  }}
                >
                  <option value="profissional">Profissional</option>
                  <option value="descontraido">Descontraído</option>
                  <option value="direto">Direto ao ponto</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}>
                  Pontos-chave a comunicar *
                </label>
                <textarea
                  value={formData.keyPoints}
                  onChange={(e) => handleChange("keyPoints", e.target.value)}
                  placeholder="Lista os principais pontos que a página deve comunicar..."
                  rows={5}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "1px solid rgba(148,163,184,0.3)",
                    backgroundColor: "rgba(15,23,42,0.5)",
                    color: "white",
                    fontSize: "1rem",
                    resize: "vertical",
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Passo 3: Referências */}
        {step === 3 && (
          <div>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 600, marginBottom: "24px" }}>
              Referências e documentos
            </h2>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}>
                  URLs de referência (opcional)
                </label>
                <textarea
                  value={formData.references}
                  onChange={(e) => handleChange("references", e.target.value)}
                  placeholder="Cole aqui links de sites, páginas ou conteúdos de referência (um por linha)"
                  rows={5}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "1px solid rgba(148,163,184,0.3)",
                    backgroundColor: "rgba(15,23,42,0.5)",
                    color: "white",
                    fontSize: "1rem",
                    resize: "vertical",
                  }}
                />
              </div>

              <div style={{
                padding: "24px",
                border: "2px dashed rgba(148,163,184,0.3)",
                borderRadius: "12px",
                textAlign: "center",
              }}>
                <p style={{ marginBottom: "12px", color: "rgba(255,255,255,0.7)" }}>
                  Upload de ficheiros (brevemente disponível)
                </p>
                <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>
                  Poderás fazer upload de PDFs, imagens e documentos
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Passo 4: Geração e subdomínio */}
        {step === 4 && (
          <div>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 600, marginBottom: "24px" }}>
              Gerar página com IA
            </h2>
            
            <div style={{
              padding: "32px",
              backgroundColor: "rgba(59,130,246,0.1)",
              border: "1px solid rgba(59,130,246,0.3)",
              borderRadius: "12px",
              marginBottom: "32px",
            }}>
              <p style={{ marginBottom: "16px", lineHeight: 1.6 }}>
                Vamos usar IA para gerar a tua página personalizada com base nas informações fornecidas.
              </p>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>
                Este processo demora cerca de 30 segundos.
              </p>
            </div>

            <div style={{ marginBottom: "32px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}>
                Subdomínio desejado *
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input
                  type="text"
                  value={formData.subdomain}
                  onChange={(e) => handleChange("subdomain", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                  placeholder="meu-projeto"
                  style={{
                    flex: 1,
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "1px solid rgba(148,163,184,0.3)",
                    backgroundColor: "rgba(15,23,42,0.5)",
                    color: "white",
                    fontSize: "1rem",
                  }}
                />
                <span style={{ color: "rgba(255,255,255,0.6)" }}>.youshouldchoose.me</span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", marginTop: "8px" }}>
                Apenas letras minúsculas, números e hífens
              </p>
            </div>

            <button
              onClick={() => alert("Funcionalidade de geração com IA será implementada em breve!")}
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "rgba(59,130,246,1)",
                color: "white",
                fontSize: "1.125rem",
                fontWeight: 600,
                cursor: "pointer",
                marginBottom: "16px",
              }}
            >
              Gerar página com IA
            </button>

            <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", textAlign: "center" }}>
              Após a geração, poderás pré-visualizar e avançar para o pagamento
            </p>
          </div>
        )}

        {/* Botões de navegação */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "48px",
          paddingTop: "24px",
          borderTop: "1px solid rgba(148,163,184,0.2)",
        }}>
          {step > 1 ? (
            <button
              onClick={handleBack}
              style={{
                padding: "12px 24px",
                borderRadius: "8px",
                border: "1px solid rgba(148,163,184,0.3)",
                backgroundColor: "transparent",
                color: "white",
                fontSize: "1rem",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Voltar
            </button>
          ) : (
            <Link
              href="/"
              style={{
                padding: "12px 24px",
                borderRadius: "8px",
                border: "1px solid rgba(148,163,184,0.3)",
                color: "white",
                fontSize: "1rem",
                fontWeight: 500,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Cancelar
            </Link>
          )}

          {step < 4 && (
            <button
              onClick={handleNext}
              disabled={
                (step === 1 && !formData.projectType) ||
                (step === 2 && (!formData.projectName || !formData.userEmail || !formData.aboutClient || !formData.targetAudience || !formData.keyPoints))
              }
              style={{
                padding: "12px 32px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "rgba(59,130,246,1)",
                color: "white",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
                opacity: (step === 1 && !formData.projectType) ||
                  (step === 2 && (!formData.projectName || !formData.userEmail || !formData.aboutClient || !formData.targetAudience || !formData.keyPoints))
                  ? 0.5
                  : 1,
              }}
            >
              Próximo
            </button>
          )}
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
