/* Criado por Mindframe Media */

import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function PendingPage() {
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
            backgroundColor: "var(--color-secondary)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto var(--spacing-lg)",
            fontSize: "3rem",
          }}>
            ⏳
          </div>
          
          <h1 style={{
            fontSize: "2rem",
            fontWeight: 700,
            marginBottom: "var(--spacing-md)",
          }}>
            Projeto em revisão
          </h1>
          
          <p style={{
            fontSize: "1.125rem",
            color: "var(--color-text-muted)",
            marginBottom: "var(--spacing-lg)",
            lineHeight: 1.6,
          }}>
            O teu projeto está atualmente com o estado "Em revisão". 
            Após aprovação, vamos configurar o subdomínio e enviar-te o link final.
          </p>
          
          <div style={{
            backgroundColor: "var(--color-bg)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            padding: "var(--spacing-lg)",
            textAlign: "left",
          }}>
            <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "var(--spacing-md)" }}>
              O que acontece a seguir:
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
                <span style={{ color: "var(--color-secondary)" }}>•</span>
                <span style={{ color: "var(--color-text-muted)" }}>
                  Revisão do conteúdo pela nossa equipa
                </span>
              </li>
              <li style={{ display: "flex", alignItems: "start", gap: "var(--spacing-sm)" }}>
                <span style={{ color: "var(--color-secondary)" }}>•</span>
                <span style={{ color: "var(--color-text-muted)" }}>
                  Configuração manual do subdomínio
                </span>
              </li>
              <li style={{ display: "flex", alignItems: "start", gap: "var(--spacing-sm)" }}>
                <span style={{ color: "var(--color-secondary)" }}>•</span>
                <span style={{ color: "var(--color-text-muted)" }}>
                  Publicação da tua página
                </span>
              </li>
              <li style={{ display: "flex", alignItems: "start", gap: "var(--spacing-sm)" }}>
                <span style={{ color: "var(--color-secondary)" }}>•</span>
                <span style={{ color: "var(--color-text-muted)" }}>
                  Envio do link final por email
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
