/* Criado por Mindframe Media */

export default function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        padding: "24px",
        marginTop: "48px",
        textAlign: "center",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        fontSize: "0.85rem",
        opacity: 0.8,
      }}
    >
      © {new Date().getFullYear()} You Should Choose — Todos os direitos reservados.
    </footer>
  );
}
