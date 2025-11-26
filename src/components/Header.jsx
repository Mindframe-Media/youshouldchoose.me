/* Criado por Mindframe Media */
"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header
      style={{
        width: "100%",
        padding: "16px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "rgba(15,23,42,0.95)",
        backdropFilter: "blur(10px)",
        zIndex: 1000,
      }}
    >
      <Link 
        href="/"
        style={{ 
          fontWeight: 600, 
          fontSize: "1.25rem",
          textDecoration: "none",
          color: "white",
        }}
      >
        YouShouldChoose<span style={{
          color: "#3b82f6",
          textShadow: "0 0 20px rgba(59,130,246,0.8), 0 0 40px rgba(59,130,246,0.5)",
          fontWeight: 700,
        }}>.Me</span>
      </Link>
      <nav style={{ display: "flex", gap: "24px", fontSize: "0.95rem" }}>
        <Link 
          href="/"
          style={{
            textDecoration: "none",
            color: "rgba(255,255,255,0.8)",
            transition: "color 0.2s",
          }}
        >
          Início
        </Link>
        <Link 
          href="/builder"
          style={{
            textDecoration: "none",
            color: "rgba(255,255,255,0.8)",
            transition: "color 0.2s",
          }}
        >
          Criar Página
        </Link>
        <Link 
          href="/dashboard"
          style={{
            textDecoration: "none",
            color: "rgba(255,255,255,0.8)",
            transition: "color 0.2s",
          }}
        >
          Projetos
        </Link>
      </nav>
    </header>
  );
}
