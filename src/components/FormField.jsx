/* Criado por Mindframe Media */

export default function FormField({ label, type = "text", value, onChange, placeholder, required, error, helpText, as = "input" }) {
  const Component = as;
  
  return (
    <div style={{ marginBottom: "var(--spacing-lg)" }}>
      <label style={{
        display: "block",
        marginBottom: "var(--spacing-sm)",
        fontWeight: 600,
        color: "var(--color-text)",
      }}>
        {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
      </label>
      
      <Component
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{
          width: "100%",
          padding: "12px 16px",
          backgroundColor: "var(--color-bg-soft)",
          border: `1px solid ${error ? "#ef4444" : "var(--color-border)"}`,
          borderRadius: "var(--radius-lg)",
          color: "var(--color-text)",
          fontSize: "1rem",
          minHeight: as === "textarea" ? "120px" : "44px",
          resize: as === "textarea" ? "vertical" : "none",
        }}
      />
      
      {helpText && (
        <p style={{
          marginTop: "var(--spacing-sm)",
          fontSize: "0.875rem",
          color: "var(--color-text-muted)",
        }}>
          {helpText}
        </p>
      )}
      
      {error && (
        <p style={{
          marginTop: "var(--spacing-sm)",
          fontSize: "0.875rem",
          color: "#ef4444",
        }}>
          {error}
        </p>
      )}
    </div>
  );
}
