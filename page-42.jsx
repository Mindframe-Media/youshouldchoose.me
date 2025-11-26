/* Criado por Mindframe Media */

"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProjectCard from "../../components/ProjectCard";
import { getSupabaseBrowserClient } from "../../lib/supabaseClient";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email");
  
  const [email, setEmail] = useState(emailParam || "");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  
  useEffect(() => {
    if (emailParam) {
      loadProjects(emailParam);
    }
  }, [emailParam]);
  
  const loadProjects = async (userEmail) => {
    setLoading(true);
    setSearched(true);
    
    try {
      const supabase = getSupabaseBrowserClient();
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("user_email", userEmail)
        .order("created_at", { ascending: false });
      
      if (!error && data) {
        setProjects(data);
      }
    } catch (error) {
      console.error("Erro ao carregar projetos:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (email) {
      loadProjects(email);
    }
  };
  
  return (
    <main>
      <Header />
      
      <div style={{
        minHeight: "100vh",
        padding: "120px var(--spacing-lg) var(--spacing-xl)",
        maxWidth: "1200px",
        margin: "0 auto",
      }}>
        <h1 style={{
          fontSize: "2.5rem",
          fontWeight: 700,
          textAlign: "center",
          marginBottom: "var(--spacing-xl)",
        }}>
          Os meus projetos
        </h1>
        
        {/* Formulário de pesquisa */}
        <form onSubmit={handleSearch} style={{
          maxWidth: "600px",
          margin: "0 auto var(--spacing-xl)",
          display: "flex",
          gap: "var(--spacing-md)",
        }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Insere o teu email"
            required
            style={{
              flex: 1,
              padding: "14px 16px",
              backgroundColor: "var(--color-bg-soft)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
              color: "var(--color-text)",
              fontSize: "1rem",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "14px 32px",
              backgroundColor: "var(--color-primary)",
              color: "white",
              borderRadius: "var(--radius-lg)",
              fontWeight: 600,
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "A procurar..." : "Procurar"}
          </button>
        </form>
        
        {/* Lista de projetos */}
        {searched && (
          <div>
            {projects.length === 0 ? (
              <div style={{
                textAlign: "center",
                padding: "var(--spacing-xl)",
                backgroundColor: "var(--color-bg-soft)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-xl)",
              }}>
                <p style={{ color: "var(--color-text-muted)", fontSize: "1.125rem" }}>
                  Nenhum projeto encontrado para este email.
                </p>
                <Link href="/builder" style={{
                  display: "inline-block",
                  marginTop: "var(--spacing-lg)",
                  padding: "12px 24px",
                  backgroundColor: "var(--color-primary)",
                  color: "white",
                  borderRadius: "var(--radius-lg)",
                  fontWeight: 600,
                }}>
                  Criar novo projeto
                </Link>
              </div>
            ) : (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
                gap: "var(--spacing-lg)",
              }}>
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      
      <Footer />
    </main>
  );
}
