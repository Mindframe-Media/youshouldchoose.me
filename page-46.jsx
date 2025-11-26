/* Criado por Mindframe Media */

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

export default function PrivacyPage() {
  return (
    <main>
      <Header />
      
      <div style={{
        minHeight: "100vh",
        padding: "120px var(--spacing-lg) var(--spacing-xl)",
        maxWidth: "900px",
        margin: "0 auto",
      }}>
        <h1 style={{
          fontSize: "2.5rem",
          fontWeight: 700,
          marginBottom: "var(--spacing-xl)",
        }}>
          Política de Privacidade
        </h1>
        
        <div style={{
          backgroundColor: "var(--color-bg-soft)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-xl)",
          padding: "var(--spacing-xl)",
          lineHeight: 1.8,
        }}>
          <section style={{ marginBottom: "var(--spacing-xl)" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "var(--spacing-md)" }}>
              1. Informações que Recolhemos
            </h2>
            <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--spacing-md)" }}>
              Recolhemos as seguintes informações quando utiliza o nosso serviço:
            </p>
            <ul style={{
              listStyle: "disc",
              paddingLeft: "var(--spacing-lg)",
              color: "var(--color-text-muted)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-sm)",
            }}>
              <li>Endereço de email</li>
              <li>Conteúdo das apresentações e páginas criadas</li>
              <li>Ficheiros e documentos enviados</li>
              <li>Informações de pagamento (processadas pelo Stripe)</li>
              <li>Dados de utilização do serviço</li>
            </ul>
          </section>
          
          <section style={{ marginBottom: "var(--spacing-xl)" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "var(--spacing-md)" }}>
              2. Como Utilizamos as Informações
            </h2>
            <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--spacing-md)" }}>
              Utilizamos as informações recolhidas para:
            </p>
            <ul style={{
              listStyle: "disc",
              paddingLeft: "var(--spacing-lg)",
              color: "var(--color-text-muted)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-sm)",
            }}>
              <li>Prestar o serviço de criação e publicação de páginas</li>
              <li>Processar pagamentos e emitir faturas</li>
              <li>Comunicar sobre o estado dos projetos</li>
              <li>Melhorar e otimizar o serviço</li>
              <li>Cumprir obrigações legais</li>
            </ul>
          </section>
          
          <section style={{ marginBottom: "var(--spacing-xl)" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "var(--spacing-md)" }}>
              3. Partilha de Informações
            </h2>
            <p style={{ color: "var(--color-text-muted)" }}>
              Não vendemos, alugamos ou partilhamos as suas informações pessoais com terceiros, 
              exceto quando necessário para a prestação do serviço (como processamento de pagamentos 
              através do Stripe) ou quando exigido por lei.
            </p>
          </section>
          
          <section style={{ marginBottom: "var(--spacing-xl)" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "var(--spacing-md)" }}>
              4. Armazenamento e Segurança
            </h2>
            <p style={{ color: "var(--color-text-muted)" }}>
              Os seus dados são armazenados em servidores seguros fornecidos pelo Supabase. 
              Implementamos medidas de segurança técnicas e organizacionais para proteger 
              as suas informações contra acesso não autorizado, alteração ou destruição.
            </p>
          </section>
          
          <section style={{ marginBottom: "var(--spacing-xl)" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "var(--spacing-md)" }}>
              5. Retenção de Dados
            </h2>
            <p style={{ color: "var(--color-text-muted)" }}>
              Mantemos os seus dados pelo período necessário para prestar o serviço e cumprir 
              obrigações legais. Os conteúdos das páginas são removidos automaticamente após 
              o término do período contratado.
            </p>
          </section>
          
          <section style={{ marginBottom: "var(--spacing-xl)" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "var(--spacing-md)" }}>
              6. Os Seus Direitos
            </h2>
            <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--spacing-md)" }}>
              Você tem o direito de:
            </p>
            <ul style={{
              listStyle: "disc",
              paddingLeft: "var(--spacing-lg)",
              color: "var(--color-text-muted)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-sm)",
            }}>
              <li>Aceder aos seus dados pessoais</li>
              <li>Corrigir dados incorretos</li>
              <li>Solicitar a eliminação dos seus dados</li>
              <li>Opor-se ao processamento dos seus dados</li>
              <li>Solicitar a portabilidade dos dados</li>
            </ul>
          </section>
          
          <section style={{ marginBottom: "var(--spacing-xl)" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "var(--spacing-md)" }}>
              7. Cookies e Tecnologias Similares
            </h2>
            <p style={{ color: "var(--color-text-muted)" }}>
              Utilizamos cookies essenciais para o funcionamento do serviço. 
              Não utilizamos cookies de rastreamento ou publicidade.
            </p>
          </section>
          
          <section>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "var(--spacing-md)" }}>
              8. Alterações à Política
            </h2>
            <p style={{ color: "var(--color-text-muted)" }}>
              Podemos atualizar esta política de privacidade periodicamente. 
              Notificaremos sobre alterações significativas através do email fornecido.
            </p>
          </section>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
