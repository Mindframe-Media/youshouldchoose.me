/* Criado por Mindframe Media */

"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  
  return (
    <main>
      <Header />
      
      <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--spacing-xl)",
        textAlign: "center",
      }}>
        <div style={{
          maxWidth: "600px",
          backgroundColor: "var(--color-bg-soft)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-xl)",
          padding: "var(--spacing-xl)",
        }}>
          <div style={{
            width: "80px",
            height: "80px",
            backgroundColor: "#10b981",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto var(--spacing-lg)",
            fontSize: "3rem",
          }}>
            ✓
          </div>
          
          <h1 style={{
            fontSize: "2rem",
            fontWeight: 700,
            marginBottom: "var(--spacing-md)",
          }}>
            Pagamento recebido!
          </h1>
          
          <p style={{
            fontSize: "1.125rem",
            color: "var(--color-text-muted)",
            marginBottom: "var(--spacing-lg)",
            lineHeight: 1.6,
          }}>
            Obrigado pelo teu pagamento. O teu projeto está agora em revisão.
          </p>
          
          <div style={{
            backgroundColor: "var(--color-bg)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            padding: "var(--spacing-lg)",
            marginBottom: "var(--spacing-lg)",
            textAlign: "left",
          }}>
            <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "var(--spacing-md)" }}>
              Próximos passos:
            </h3>
            
            <ul style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-sm)",
            }}>
              <li style={{ display: "flex", alignItems: "start", gap: "var(--spacing-sm)" }}>
                <span style={{ color: "var(--color-primary)" }}>1.</span>
                <span style={{ color: "var(--color-text-muted)" }}>
                  A nossa equipa irá rever o conteúdo da tua página
                </span>
              </li>
              <li style={{ display: "flex", alignItems: "start", gap: "var(--spacing-sm)" }}>
                <span style={{ color: "var(--color-primary)" }}>2.</span>
                <span style={{ color: "var(--color-text-muted)" }}>
                  Configuraremos o subdomínio manualmente
                </span>
              </li>
              <li style={{ display: "flex", alignItems: "start", gap: "var(--spacing-sm)" }}>
                <span style={{ color: "var(--color-primary)" }}>3.</span>
                <span style={{ color: "var(--color-text-muted)" }}>
                  Receberás o link final por email
                </span>
              </li>
            </ul>
          </div>
          
          <Link href="/dashboard" style={{
            display: "inline-block",
            padding: "14px 32px",
            backgroundColor: "var(--color-primary)",
            color: "white",
            borderRadius: "var(--radius-lg)",
            fontWeight: 600,
          }}>
            Ver estado dos meus projetos
          </Link>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
