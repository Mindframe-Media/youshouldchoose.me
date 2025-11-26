/* Criado por Mindframe Media */

export default function Stepper({ currentStep, totalSteps }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "var(--spacing-md)",
      marginBottom: "var(--spacing-xl)",
    }}>
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div key={step} style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)" }}>
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: step <= currentStep ? "var(--color-primary)" : "var(--color-bg-soft)",
            border: step <= currentStep ? "none" : "2px solid var(--color-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 600,
            color: step <= currentStep ? "white" : "var(--color-text-muted)",
          }}>
            {step}
          </div>
          {step < totalSteps && (
            <div style={{
              width: "60px",
              height: "2px",
              backgroundColor: step < currentStep ? "var(--color-primary)" : "var(--color-border)",
            }} />
          )}
        </div>
      ))}
    </div>
  );
}
