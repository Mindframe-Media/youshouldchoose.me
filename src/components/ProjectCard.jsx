/* Criado por Mindframe Media */

import Link from "next/link";

const STATUS_LABELS = {
  draft: "Rascunho",
  pending_review: "Em revisão",
  approved: "Aprovado",
  published: "Publicado",
};

const STATUS_COLORS = {
  draft: "#94a3b8",
  pending_review: "#f59e0b",
  approved: "#10b981",
  published: "#2563eb",
};

export default function ProjectCard({ project }) {
  const statusLabel = STATUS_LABELS[project.status] || project.status;
  const statusColor = STATUS_COLORS[project.status] || "#94a3b8";
  
  return (
    <div style={{
      backgroundColor: "var(--color-bg-soft)",
      border: "1px solid var(--color-border)",
      borderRadius: "var(--radius-xl)",
      padding: "var(--spacing-lg)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--spacing-md)",
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "start",
      }}>
        <h3 style={{
          fontSize: "1.25rem",
          fontWeight: 600,
          marginBottom: "var(--spacing-sm)",
        }}>
          {project.title}
        </h3>
        
        <span style={{
          padding: "4px 12px",
          backgroundColor: statusColor,
          color: "white",
          borderRadius: "6px",
          fontSize: "0.75rem",
          fontWeight: 600,
          textTransform: "uppercase",
        }}>
          {statusLabel}
        </span>
      </div>
      
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-sm)",
        fontSize: "0.875rem",
        color: "var(--color-text-muted)",
      }}>
        <div>
          <strong>Tipo:</strong> {project.project_type}
        </div>
        
        {project.ai_request_payload?.subdomain_requested && (
          <div>
            <strong>Subdomínio:</strong> {project.ai_request_payload.subdomain_requested}.youshouldchoose.me
          </div>
        )}
        
        {project.publish_until && (
          <div>
            <strong>Expira em:</strong> {new Date(project.publish_until).toLocaleDateString("pt-PT")}
          </div>
        )}
      </div>
      
      {/* Ações baseadas no status */}
      <div style={{ marginTop: "var(--spacing-sm)" }}>
        {project.status === "draft" && (
          <Link href="/builder" style={{
            display: "block",
            textAlign: "center",
            padding: "12px",
            backgroundColor: "var(--color-primary)",
            color: "white",
            borderRadius: "var(--radius-lg)",
            fontWeight: 600,
          }}>
            Voltar ao builder
          </Link>
        )}
        
        {project.status === "pending_review" && (
          <div style={{
            padding: "12px",
            backgroundColor: "var(--color-bg)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            textAlign: "center",
            color: "var(--color-text-muted)",
          }}>
            A aguardar aprovação manual
          </div>
        )}
        
        {(project.status === "approved" || project.status === "published") && project.subdomain_full && (
          <a
            href={`https://${project.subdomain_full}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              textAlign: "center",
              padding: "12px",
              backgroundColor: "var(--color-primary)",
              color: "white",
              borderRadius: "var(--radius-lg)",
              fontWeight: 600,
            }}
          >
            Ver página publicada
          </a>
        )}
      </div>
    </div>
  );
}
