/* Criado por Mindframe Media */

import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--color-border)",
      padding: "var(--spacing-xl) var(--spacing-lg)",
      marginTop: "var(--spacing-xl)",
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "var(--spacing-md)",
      }}>
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
          © {new Date().getFullYear()} You Should Choose. Todos os direitos reservados.
        </p>
        
        <div style={{ display: "flex", gap: "var(--spacing-lg)" }}>
          <Link href="/legal/terms" style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
            Termos e Condições
          </Link>
          <Link href="/legal/privacy" style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
            Política de Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
