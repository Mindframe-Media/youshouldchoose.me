/* Criado por Mindframe Media */

export default function TemplateCard({ type, label, description, icon }) {
  return (
    <div style={{
      padding: "var(--spacing-xl)",
      backgroundColor: "var(--color-bg-soft)",
      border: "1px solid var(--color-border)",
      borderRadius: "var(--radius-xl)",
      textAlign: "center",
      transition: "all 0.3s",
      cursor: "pointer",
    }}>
      <div style={{
        fontSize: "4rem",
        fontWeight: 700,
        color: "var(--color-primary)",
        marginBottom: "var(--spacing-md)",
      }}>
        {icon || type.charAt(0).toUpperCase()}
      </div>
      
      <h3 style={{
        fontSize: "1.5rem",
        fontWeight: 600,
        marginBottom: "var(--spacing-sm)",
      }}>
        {label}
      </h3>
      
      <p style={{
        color: "var(--color-text-muted)",
        lineHeight: 1.6,
      }}>
        {description}
      </p>
    </div>
  );
}
