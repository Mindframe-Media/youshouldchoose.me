/* Criado por Mindframe Media */

import Header from "../components/Header";
import Footer from "../components/Footer";
import PricingOptions from "../components/PricingOptions";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "var(--spacing-xl)",
        textAlign: "center",
        paddingTop: "120px",
      }}>
        <h1 style={{
          fontSize: "3.5rem",
          fontWeight: 700,
          marginBottom: "var(--spacing-lg)",
          maxWidth: "900px",
          lineHeight: 1.2,
        }}>
          Gera apresentações e páginas personalizadas com IA
        </h1>
        
        <p style={{
          fontSize: "1.25rem",
          color: "var(--color-text-muted)",
          marginBottom: "var(--spacing-xl)",
          maxWidth: "700px",
        }}>
          Publica em subdomínio de youshouldchoose.me por 10, 20 ou 30 dias. 
          Simples, rápido e profissional.
        </p>
        
        <Link href="/builder" style={{
          padding: "16px 40px",
          fontSize: "1.125rem",
          backgroundColor: "var(--color-primary)",
          color: "white",
          borderRadius: "var(--radius-lg)",
          fontWeight: 600,
          transition: "all 0.2s",
          display: "inline-block",
        }}>
          Começar agora
        </Link>
      </section>
      
      {/* Como Funciona */}
      <section id="como-funciona" style={{
        padding: "var(--spacing-xl)",
        maxWidth: "1200px",
        margin: "0 auto",
      }}>
        <h2 style={{
          fontSize: "2.5rem",
          fontWeight: 700,
          textAlign: "center",
          marginBottom: "var(--spacing-xl)",
        }}>
          Como funciona
        </h2>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "var(--spacing-xl)",
        }}>
          {[
            {
              num: "1",
              title: "Escolhe o tipo",
              desc: "Website de apresentação, pitch deck interativo ou one-page de scroll.",
            },
            {
              num: "2",
              title: "Dá-nos referências",
              desc: "Partilha documentos, URLs e informações sobre o teu projeto.",
            },
            {
              num: "3",
              title: "IA gera a página",
              desc: "O nosso assistente cria uma página personalizada em segundos.",
            },
            {
              num: "4",
              title: "Paga e publica",
              desc: "Escolhe o plano e publicamos no teu subdomínio.",
            },
          ].map((step) => (
            <div key={step.num} style={{
              padding: "var(--spacing-lg)",
              backgroundColor: "var(--color-bg-soft)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-xl)",
            }}>
              <div style={{
                fontSize: "3rem",
                fontWeight: 700,
                color: "var(--color-primary)",
                marginBottom: "var(--spacing-md)",
              }}>
                {step.num}
              </div>
              <h3 style={{
                fontSize: "1.5rem",
                fontWeight: 600,
                marginBottom: "var(--spacing-sm)",
              }}>
                {step.title}
              </h3>
              <p style={{
                color: "var(--color-text-muted)",
                lineHeight: 1.6,
              }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Planos */}
      <section id="planos" style={{
        padding: "var(--spacing-xl)",
        maxWidth: "1200px",
        margin: "0 auto",
      }}>
        <h2 style={{
          fontSize: "2.5rem",
          fontWeight: 700,
          textAlign: "center",
          marginBottom: "var(--spacing-xl)",
        }}>
          Escolhe o teu plano
        </h2>
        
        <PricingOptions />
      </section>
      
      <Footer />
    </main>
  );
}
