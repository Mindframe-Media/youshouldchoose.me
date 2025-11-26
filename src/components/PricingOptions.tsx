/* Criado por Mindframe Media */
"use client";

import Link from "next/link";

type PricingPlan = {
  days: number;
  price: string;
  recommended?: boolean;
};

type PricingOptionsProps = {
  selectedDays?: number;
  onSelect?: (days: number) => void;
};

const PLANS: PricingPlan[] = [
  { days: 10, price: "14,99€" },
  { days: 20, price: "19,99€", recommended: true },
  { days: 30, price: "24,99€" },
];

export default function PricingOptions({
  selectedDays,
  onSelect,
}: PricingOptionsProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "24px",
        marginTop: "24px",
      }}
    >
      {PLANS.map((plan) => {
        const isSelected = selectedDays === plan.days;
        const isRecommended = plan.recommended;

        return (
          <div
            key={plan.days}
            onClick={() => onSelect && onSelect(plan.days)}
            style={{
              position: "relative",
              cursor: onSelect ? "pointer" : "default",
              borderRadius: "16px",
              padding: "24px",
              border: isSelected || isRecommended
                ? "2px solid rgba(59,130,246,0.9)"
                : "1px solid rgba(148,163,184,0.35)",
              background: isRecommended
                ? "linear-gradient(135deg, rgba(37,99,235,0.16), rgba(15,23,42,0.95))"
                : "rgba(15,23,42,0.9)",
              boxShadow: isSelected || isRecommended
                ? "0 18px 45px rgba(15,23,42,0.9)"
                : "0 10px 25px rgba(15,23,42,0.6)",
              transition: "transform 0.16s ease, box-shadow 0.16s ease, border-color 0.16s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
            }}
          >
            {isRecommended && (
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "16px",
                  fontSize: "0.75rem",
                  padding: "4px 10px",
                  borderRadius: "999px",
                  background: "rgba(56,189,248,0.15)",
                  border: "1px solid rgba(56,189,248,0.6)",
                }}
              >
                Mais escolhido
              </div>
            )}

            <h3
              style={{
                fontSize: "1.25rem",
                marginBottom: "8px",
                fontWeight: 600,
              }}
            >
              {plan.days} dias
            </h3>

            <p
              style={{
                fontSize: "2rem",
                margin: "4px 0 8px",
                fontWeight: 700,
              }}
            >
              {plan.price}
            </p>

            <p
              style={{
                fontSize: "0.9rem",
                opacity: 0.85,
                marginBottom: "16px",
              }}
            >
              Publica a tua página durante {plan.days} dias num subdomínio dedicado.
            </p>

            {onSelect ? (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onSelect(plan.days);
                }}
                style={{
                  marginTop: "8px",
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "999px",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  background: isSelected || isRecommended
                    ? "rgba(37,99,235,1)"
                    : "rgba(37,99,235,0.9)",
                  color: "#ffffff",
                  cursor: "pointer",
                }}
              >
                Escolher plano
              </button>
            ) : (
              <Link
                href="/builder"
                style={{
                  marginTop: "8px",
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "999px",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  background: isSelected || isRecommended
                    ? "rgba(37,99,235,1)"
                    : "rgba(37,99,235,0.9)",
                  color: "#ffffff",
                  textDecoration: "none",
                  display: "block",
                  textAlign: "center",
                }}
              >
                Escolher plano
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
