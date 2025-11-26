/* Criado por Mindframe Media */
"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";

export default function DashboardPage() {
  const [email, setEmail] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Dados de exemplo (em produção viriam do Supabase)
  const mockProjects = [
    {
      id: "1",
      name: "Apresentação Empresa XYZ",
      type: "website",
      status: "published",
      subdomain: "empresa-xyz",
      expiresAt: "2024-02-15",
    },
    {
      id: "2",
      name: "Pitch Deck Startup ABC",
      type: "pitch",
      status: "pending_review",
      subdomain: "startup-abc",
      expiresAt: null,
    },
    {
      id: "3",
      name: "Landing Page Produto",
      type: "onepage",
      status: "draft",
      subdomain: "produto-landing",
      expiresAt: null,
    },
  ];

  const handleSearch = () => {
    if (email) {
      setIsSearching(true);
      // Aqui seria feita a consulta ao Supabase
      setTimeout(() => setIsSearching(false), 500);
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      draft: "Rascunho",
      pending_review: "Em revisão",
      approved: "Aprovado",
      published: "Publicado",
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      draft: "rgba(148,163,184,0.5)",
      pending_review: "rgba(251,191,36,0.8)",
      approved: "rgba(34,197,94,0.8)",
      published: "rgba(59,130,246,0.8)",
    };
    return colors[status] || "rgba(148,163,184,0.5)";
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      website: "Website",
      pitch: "Pitch Deck",
      onepage: "One-page",
    };
    return labels[type] || type;
  };

  return (
    <main>
      <Header />
      
      <section style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "80px 24px 40px",
        minHeight: "100vh",
      }}>
        <h1 style={{
          fontSize: "2.5rem",
          fontWeight: 700,
          marginBottom: "16px",
        }}>
          Os meus projetos
        </h1>
        
        <p style={{
          color: "rgba(255,255,255,0.7)",
          marginBottom: "40px",
        }}>
          Consulta o estado dos teus projetos e acede aos links publicados
        </p>

        {/* Campo de pesquisa por email */}
        <div style={{
          display: "flex",
          gap: "12px",
          marginBottom: "48px",
          maxWidth: "600px",
        }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Introduz o teu email para ver os projetos"
            style={{
              flex: 1,
              padding: "14px 18px",
              borderRadius: "8px",
              border: "1px solid rgba(148,163,184,0.3)",
              backgroundColor: "rgba(15,23,42,0.5)",
              color: "white",
              fontSize: "1rem",
            }}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            disabled={!email || isSearching}
            style={{
              padding: "14px 32px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "rgba(59,130,246,1)",
              color: "white",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: email && !isSearching ? "pointer" : "not-allowed",
              opacity: email && !isSearching ? 1 : 0.5,
            }}
          >
            {isSearching ? "A procurar..." : "Procurar"}
          </button>
        </div>

        {/* Lista de projetos */}
        {email && (
          <div>
            <h2 style={{
              fontSize: "1.5rem",
              fontWeight: 600,
              marginBottom: "24px",
            }}>
              Projetos encontrados ({mockProjects.length})
            </h2>

            <div style={{
              display: "grid",
              gap: "24px",
            }}>
              {mockProjects.map((project) => (
                <div
                  key={project.id}
                  style={{
                    padding: "24px",
                    backgroundColor: "rgba(15,23,42,0.6)",
                    border: "1px solid rgba(148,163,184,0.2)",
                    borderRadius: "12px",
                  }}
                >
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "16px",
                  }}>
                    <div>
                      <h3 style={{
                        fontSize: "1.25rem",
                        fontWeight: 600,
                        marginBottom: "8px",
                      }}>
                        {project.name}
                      </h3>
                      <div style={{
                        display: "flex",
                        gap: "12px",
                        fontSize: "0.9rem",
                        color: "rgba(255,255,255,0.6)",
                      }}>
                        <span>{getTypeLabel(project.type)}</span>
                        <span>•</span>
                        <span>{project.subdomain}.youshouldchoose.me</span>
                      </div>
                    </div>

                    <div
                      style={{
                        padding: "6px 14px",
                        borderRadius: "999px",
                        fontSize: "0.85rem",
                        fontWeight: 500,
                        backgroundColor: getStatusColor(project.status),
                      }}
                    >
                      {getStatusLabel(project.status)}
                    </div>
                  </div>

                  {project.expiresAt && (
                    <p style={{
                      fontSize: "0.9rem",
                      color: "rgba(255,255,255,0.6)",
                      marginBottom: "16px",
                    }}>
                      Expira em: {new Date(project.expiresAt).toLocaleDateString("pt-PT")}
                    </p>
                  )}

                  <div style={{
                    display: "flex",
                    gap: "12px",
                    marginTop: "16px",
                  }}>
                    {project.status === "draft" && (
                      <Link
                        href="/builder"
                        style={{
                          padding: "10px 20px",
                          borderRadius: "8px",
                          backgroundColor: "rgba(59,130,246,1)",
                          color: "white",
                          fontSize: "0.95rem",
                          fontWeight: 500,
                          textDecoration: "none",
                          display: "inline-block",
                        }}
                      >
                        Continuar edição
                      </Link>
                    )}

                    {project.status === "pending_review" && (
                      <div style={{
                        padding: "10px 20px",
                        borderRadius: "8px",
                        backgroundColor: "rgba(251,191,36,0.2)",
                        color: "rgba(251,191,36,1)",
                        fontSize: "0.95rem",
                        fontWeight: 500,
                      }}>
                        A aguardar aprovação da equipa
                      </div>
                    )}

                    {(project.status === "approved" || project.status === "published") && (
                      <a
                        href={`https://${project.subdomain}.youshouldchoose.me`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: "10px 20px",
                          borderRadius: "8px",
                          backgroundColor: "rgba(59,130,246,1)",
                          color: "white",
                          fontSize: "0.95rem",
                          fontWeight: 500,
                          textDecoration: "none",
                          display: "inline-block",
                        }}
                      >
                        Ver página publicada →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Estado vazio */}
        {!email && (
          <div style={{
            textAlign: "center",
            padding: "80px 24px",
            color: "rgba(255,255,255,0.5)",
          }}>
            <p style={{ fontSize: "1.125rem", marginBottom: "16px" }}>
              Introduz o teu email para consultar os teus projetos
            </p>
            <p style={{ fontSize: "0.95rem" }}>
              Usa o mesmo email que forneceste ao criar os projetos
            </p>
          </div>
        )}

        {/* CTA para criar novo projeto */}
        <div style={{
          marginTop: "64px",
          padding: "32px",
          backgroundColor: "rgba(59,130,246,0.1)",
          border: "1px solid rgba(59,130,246,0.3)",
          borderRadius: "12px",
          textAlign: "center",
        }}>
          <h3 style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            marginBottom: "12px",
          }}>
            Criar novo projeto
          </h3>
          <p style={{
            color: "rgba(255,255,255,0.7)",
            marginBottom: "24px",
          }}>
            Tens uma nova ideia? Cria uma página personalizada em minutos
          </p>
          <Link
            href="/builder"
            style={{
              padding: "14px 32px",
              borderRadius: "8px",
              backgroundColor: "rgba(59,130,246,1)",
              color: "white",
              fontSize: "1rem",
              fontWeight: 600,
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Começar novo projeto
          </Link>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
