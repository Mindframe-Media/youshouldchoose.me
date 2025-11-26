/* Criado por Mindframe Media */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Stepper from "../../components/Stepper";
import FormField from "../../components/FormField";
import { getSupabaseBrowserClient } from "../../lib/supabaseClient";

export default function BuilderPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [projectId, setProjectId] = useState(null);
  const [generatedContent, setGeneratedContent] = useState(null);
  
  const [formData, setFormData] = useState({
    project_type: "",
    title: "",
    user_email: "",
    about_client: "",
    target_audience: "",
    tone_of_voice: "profissional",
    key_points: "",
    reference_urls: [],
    subdomain_requested: "",
  });
  
  const [newUrl, setNewUrl] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addReferenceUrl = () => {
    if (newUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        reference_urls: [...prev.reference_urls, newUrl.trim()]
      }));
      setNewUrl("");
    }
  };

  const removeReferenceUrl = (index) => {
    setFormData(prev => ({
      ...prev,
      reference_urls: prev.reference_urls.filter((_, i) => i !== index)
    }));
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    const supabase = getSupabaseBrowserClient();
    
    for (const file of files) {
      const filePath = `${Date.now()}-${file.name}`;
      const { error } = await supabase.storage
        .from("project-references")
        .upload(filePath, file);
      
      if (!error) {
        setUploadedFiles(prev => [...prev, { name: file.name, path: filePath }]);
      }
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    
    try {
      // Criar projeto no Supabase
      const supabase = getSupabaseBrowserClient();
      const { data: project, error } = await supabase
        .from("projects")
        .insert({
          user_email: formData.user_email,
          project_type: formData.project_type,
          title: formData.title,
          status: "draft",
          ai_request_payload: formData,
        })
        .select()
        .single();
      
      if (error) throw error;
      
      setProjectId(project.id);
      
      // Salvar assets
      for (const file of uploadedFiles) {
        await supabase.from("project_assets").insert({
          project_id: project.id,
          file_path: file.path,
          file_type: "reference",
        });
      }
      
      // Chamar API de geração
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: project.id,
          formInputs: formData,
        }),
      });
      
      const result = await response.json();
      setGeneratedContent(result.content);
      setCurrentStep(4);
    } catch (error) {
      console.error("Erro ao gerar:", error);
      alert("Erro ao gerar página. Tenta novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = () => {
    if (projectId && formData.subdomain_requested) {
      router.push(`/checkout?projectId=${projectId}`);
    } else {
      alert("Por favor, define um subdomínio antes de continuar.");
    }
  };

  return (
    <main>
      <Header />
      
      <div style={{
        minHeight: "100vh",
        padding: "120px var(--spacing-lg) var(--spacing-xl)",
        maxWidth: "900px",
        margin: "0 auto",
      }}>
        <h1 style={{
          fontSize: "2.5rem",
          fontWeight: 700,
          textAlign: "center",
          marginBottom: "var(--spacing-xl)",
        }}>
          Cria a tua página
        </h1>
        
        <Stepper currentStep={currentStep} totalSteps={4} />
        
        <div style={{
          backgroundColor: "var(--color-bg-soft)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-xl)",
          padding: "var(--spacing-xl)",
        }}>
          {/* Passo 1: Tipo de projeto */}
          {currentStep === 1 && (
            <div>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 600, marginBottom: "var(--spacing-lg)" }}>
                Escolhe o tipo de projeto
              </h2>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
                {[
                  { value: "presentation_website", label: "Website de apresentação" },
                  { value: "pitch_deck", label: "Pitch deck interativo" },
                  { value: "one_page", label: "One-page / landing de scroll" },
                ].map((option) => (
                  <label key={option.value} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--spacing-md)",
                    padding: "var(--spacing-lg)",
                    backgroundColor: formData.project_type === option.value ? "var(--color-primary)" : "var(--color-bg)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-lg)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}>
                    <input
                      type="radio"
                      name="project_type"
                      value={option.value}
                      checked={formData.project_type === option.value}
                      onChange={(e) => handleInputChange("project_type", e.target.value)}
                      style={{ width: "20px", height: "20px" }}
                    />
                    <span style={{ fontSize: "1.125rem", fontWeight: 500 }}>{option.label}</span>
                  </label>
                ))}
              </div>
              
              <button
                onClick={() => setCurrentStep(2)}
                disabled={!formData.project_type}
                style={{
                  marginTop: "var(--spacing-xl)",
                  width: "100%",
                  padding: "14px",
                  backgroundColor: formData.project_type ? "var(--color-primary)" : "var(--color-border)",
                  color: "white",
                  borderRadius: "var(--radius-lg)",
                  fontWeight: 600,
                  border: "none",
                  cursor: formData.project_type ? "pointer" : "not-allowed",
                }}
              >
                Continuar
              </button>
            </div>
          )}
          
          {/* Passo 2: Dados do projeto */}
          {currentStep === 2 && (
            <div>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 600, marginBottom: "var(--spacing-lg)" }}>
                Dados do projeto
              </h2>
              
              <FormField
                label="Nome do projeto"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Ex: Apresentação da minha empresa"
                required
              />
              
              <FormField
                label="Email"
                type="email"
                value={formData.user_email}
                onChange={(e) => handleInputChange("user_email", e.target.value)}
                placeholder="teu@email.com"
                required
                helpText="Usaremos este email para te contactar sobre o projeto"
              />
              
              <FormField
                label="Sobre o cliente / marca"
                as="textarea"
                value={formData.about_client}
                onChange={(e) => handleInputChange("about_client", e.target.value)}
                placeholder="Descreve brevemente o cliente ou marca..."
                required
              />
              
              <FormField
                label="Público-alvo"
                value={formData.target_audience}
                onChange={(e) => handleInputChange("target_audience", e.target.value)}
                placeholder="Ex: Empresários, jovens profissionais, etc."
                required
              />
              
              <div style={{ marginBottom: "var(--spacing-lg)" }}>
                <label style={{
                  display: "block",
                  marginBottom: "var(--spacing-sm)",
                  fontWeight: 600,
                  color: "var(--color-text)",
                }}>
                  Tom de voz <span style={{ color: "#ef4444" }}>*</span>
                </label>
                
                <select
                  value={formData.tone_of_voice}
                  onChange={(e) => handleInputChange("tone_of_voice", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    backgroundColor: "var(--color-bg-soft)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-lg)",
                    color: "var(--color-text)",
                    fontSize: "1rem",
                  }}
                >
                  <option value="profissional">Profissional</option>
                  <option value="descontraído">Descontraído</option>
                  <option value="direto">Direto ao ponto</option>
                </select>
              </div>
              
              <FormField
                label="Pontos-chave a comunicar"
                as="textarea"
                value={formData.key_points}
                onChange={(e) => handleInputChange("key_points", e.target.value)}
                placeholder="Lista os pontos principais que queres destacar..."
                required
              />
              
              <div style={{ display: "flex", gap: "var(--spacing-md)" }}>
                <button
                  onClick={() => setCurrentStep(1)}
                  style={{
                    flex: 1,
                    padding: "14px",
                    backgroundColor: "var(--color-bg)",
                    color: "var(--color-text)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-lg)",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Voltar
                </button>
                
                <button
                  onClick={() => setCurrentStep(3)}
                  disabled={!formData.title || !formData.user_email || !formData.about_client || !formData.target_audience || !formData.key_points}
                  style={{
                    flex: 1,
                    padding: "14px",
                    backgroundColor: "var(--color-primary)",
                    color: "white",
                    borderRadius: "var(--radius-lg)",
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Continuar
                </button>
              </div>
            </div>
          )}
          
          {/* Passo 3: Referências */}
          {currentStep === 3 && (
            <div>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 600, marginBottom: "var(--spacing-lg)" }}>
                Referências e documentos
              </h2>
              
              <div style={{ marginBottom: "var(--spacing-lg)" }}>
                <label style={{
                  display: "block",
                  marginBottom: "var(--spacing-sm)",
                  fontWeight: 600,
                  color: "var(--color-text)",
                }}>
                  URLs de referência
                </label>
                
                <div style={{ display: "flex", gap: "var(--spacing-sm)", marginBottom: "var(--spacing-md)" }}>
                  <input
                    type="url"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://exemplo.com"
                    style={{
                      flex: 1,
                      padding: "12px 16px",
                      backgroundColor: "var(--color-bg-soft)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-lg)",
                      color: "var(--color-text)",
                      fontSize: "1rem",
                    }}
                  />
                  <button
                    onClick={addReferenceUrl}
                    style={{
                      padding: "12px 24px",
                      backgroundColor: "var(--color-primary)",
                      color: "white",
                      borderRadius: "var(--radius-lg)",
                      fontWeight: 600,
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Adicionar
                  </button>
                </div>
                
                {formData.reference_urls.length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
                    {formData.reference_urls.map((url, index) => (
                      <div key={index} style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "var(--spacing-sm) var(--spacing-md)",
                        backgroundColor: "var(--color-bg)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "var(--radius-lg)",
                      }}>
                        <span style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>{url}</span>
                        <button
                          onClick={() => removeReferenceUrl(index)}
                          style={{
                            padding: "4px 12px",
                            backgroundColor: "#ef4444",
                            color: "white",
                            borderRadius: "6px",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "0.875rem",
                          }}
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div style={{ marginBottom: "var(--spacing-lg)" }}>
                <label style={{
                  display: "block",
                  marginBottom: "var(--spacing-sm)",
                  fontWeight: 600,
                  color: "var(--color-text)",
                }}>
                  Upload de ficheiros
                </label>
                
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    backgroundColor: "var(--color-bg-soft)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-lg)",
                    color: "var(--color-text)",
                    fontSize: "1rem",
                  }}
                />
                
                {uploadedFiles.length > 0 && (
                  <div style={{ marginTop: "var(--spacing-md)" }}>
                    {uploadedFiles.map((file, index) => (
                      <div key={index} style={{
                        padding: "var(--spacing-sm)",
                        fontSize: "0.875rem",
                        color: "var(--color-text-muted)",
                      }}>
                        ✓ {file.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div style={{ display: "flex", gap: "var(--spacing-md)" }}>
                <button
                  onClick={() => setCurrentStep(2)}
                  style={{
                    flex: 1,
                    padding: "14px",
                    backgroundColor: "var(--color-bg)",
                    color: "var(--color-text)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-lg)",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Voltar
                </button>
                
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: "14px",
                    backgroundColor: "var(--color-primary)",
                    color: "white",
                    borderRadius: "var(--radius-lg)",
                    fontWeight: 600,
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? "A gerar..." : "Gerar página com IA"}
                </button>
              </div>
            </div>
          )}
          
          {/* Passo 4: Preview e subdomínio */}
          {currentStep === 4 && generatedContent && (
            <div>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 600, marginBottom: "var(--spacing-lg)" }}>
                Preview da tua página
              </h2>
              
              <div style={{
                padding: "var(--spacing-lg)",
                backgroundColor: "var(--color-bg)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                marginBottom: "var(--spacing-lg)",
              }}>
                <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--spacing-md)" }}>
                  Layout: {generatedContent.layout}
                </p>
                <p style={{ color: "var(--color-text-muted)" }}>
                  Secções: {generatedContent.sections?.length || 0}
                </p>
              </div>
              
              <FormField
                label="Subdomínio desejado"
                value={formData.subdomain_requested}
                onChange={(e) => handleInputChange("subdomain_requested", e.target.value)}
                placeholder="exemplo"
                required
                helpText="A tua página ficará em: exemplo.youshouldchoose.me"
              />
              
              <button
                onClick={handleCheckout}
                disabled={!formData.subdomain_requested}
                style={{
                  width: "100%",
                  padding: "14px",
                  backgroundColor: "var(--color-primary)",
                  color: "white",
                  borderRadius: "var(--radius-lg)",
                  fontWeight: 600,
                  border: "none",
                  cursor: formData.subdomain_requested ? "pointer" : "not-allowed",
                }}
              >
                Avançar para pagamento
              </button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
