/* Criado por Mindframe Media */

"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getSupabaseBrowserClient } from "../../lib/supabaseClient";

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  
  const [project, setProject] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState("20_days");
  const [loading, setLoading] = useState(false);
  
  const plans = [
    { id: "10_days", days: 10, price: "14,99€" },
    { id: "20_days", days: 20, price: "19,99€", featured: true },
    { id: "30_days", days: 30, price: "24,99€" },
  ];
  
  useEffect(() => {
    if (projectId) {
      loadProject();
    }
  }, [projectId]);
  
  const loadProject = async () => {
    const supabase = getSupabaseBrowserClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .single();
    
    if (!error && data) {
      setProject(data);
    }
  };
  
  const handlePayment = async () => {
    if (!project) return;
    
    setLoading(true);
    
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: project.id,
          priceTier: selectedPlan,
          userEmail: project.user_email,
        }),
      });
      
      const result = await response.json();
      
      if (result.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
      alert("Erro ao processar pagamento. Tenta novamente.");
    } finally {
      setLoading(false);
    }
  };
  
  if (!project) {
    return (
      <main>
        <Header />
        <div style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <p>A carregar...</p>
        </div>
        <Footer />
      </main>
    );
  }
  
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
          Finalizar pagamento
        </h1>
        
        {/* Resumo do projeto */}
        <div style={{
          backgroundColor: "var(--color-bg-soft)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-xl)",
          padding: "var(--spacing-xl)",
          marginBottom: "var(--spacing-xl)",
        }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "var(--spacing-md)" }}>
            Resumo do projeto
          </h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
            <div>
              <span style={{ color: "var(--color-text-muted)" }}>Título: </span>
              <span style={{ fontWeight: 600 }}>{project.title}</span>
            </div>
            <div>
              <span style={{ color: "var(--color-text-muted)" }}>Tipo: </span>
              <span style={{ fontWeight: 600 }}>{project.project_type}</span>
            </div>
            <div>
              <span style={{ color: "var(--color-text-muted)" }}>Subdomínio: </span>
              <span style={{ fontWeight: 600 }}>
                {project.ai_request_payload?.subdomain_requested}.youshouldchoose.me
              </span>
            </div>
          </div>
        </div>
        
        {/* Seleção de plano */}
        <div style={{
          backgroundColor: "var(--color-bg-soft)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-xl)",
          padding: "var(--spacing-xl)",
          marginBottom: "var(--spacing-xl)",
        }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "var(--spacing-lg)" }}>
            Escolhe o teu plano
          </h2>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "var(--spacing-md)",
          }}>
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                style={{
                  padding: "var(--spacing-lg)",
                  backgroundColor: selectedPlan === plan.id ? "var(--color-primary)" : "var(--color-bg)",
                  border: selectedPlan === plan.id ? "2px solid var(--color-secondary)" : "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  textAlign: "center",
                }}
              >
                {plan.featured && (
                  <div style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "var(--color-secondary)",
                    marginBottom: "var(--spacing-sm)",
                    textTransform: "uppercase",
                  }}>
                    Popular
                  </div>
                )}
                
                <div style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  marginBottom: "var(--spacing-sm)",
                }}>
                  {plan.price}
                </div>
                
                <div style={{
                  fontSize: "1rem",
                  color: selectedPlan === plan.id ? "rgba(255,255,255,0.9)" : "var(--color-text-muted)",
                }}>
                  {plan.days} dias
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <button
          onClick={handlePayment}
          disabled={loading}
          style={{
            width: "100%",
            padding: "16px",
            fontSize: "1.125rem",
            backgroundColor: "var(--color-primary)",
            color: "white",
            borderRadius: "var(--radius-lg)",
            fontWeight: 600,
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "A processar..." : "Pagar com Stripe"}
        </button>
      </div>
      
      <Footer />
    </main>
  );
}
