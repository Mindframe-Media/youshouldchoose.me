/* Criado por Mindframe Media */

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

export default function TermsPage() {
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
          Termos e Condições
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
              1. Aceitação dos Termos
            </h2>
            <p style={{ color: "var(--color-text-muted)" }}>
              Ao utilizar o serviço You Should Choose, você concorda com estes termos e condições. 
              Se não concordar com qualquer parte destes termos, não utilize o serviço.
            </p>
          </section>
          
          <section style={{ marginBottom: "var(--spacing-xl)" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "var(--spacing-md)" }}>
              2. Descrição do Serviço
            </h2>
            <p style={{ color: "var(--color-text-muted)" }}>
              You Should Choose é um serviço de criação de páginas e apresentações temporárias 
              com assistência de inteligência artificial. As páginas são publicadas em subdomínios 
              de youshouldchoose.me por períodos de 10, 20 ou 30 dias, conforme o plano escolhido.
            </p>
          </section>
          
          <section style={{ marginBottom: "var(--spacing-xl)" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "var(--spacing-md)" }}>
              3. Responsabilidade do Conteúdo
            </h2>
            <p style={{ color: "var(--color-text-muted)" }}>
              O utilizador é totalmente responsável pelo conteúdo fornecido ao serviço, incluindo 
              textos, imagens e documentos. O utilizador garante que possui todos os direitos 
              necessários sobre o conteúdo fornecido e que este não viola direitos de terceiros.
            </p>
          </section>
          
          <section style={{ marginBottom: "var(--spacing-xl)" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "var(--spacing-md)" }}>
              4. Duração e Renovação
            </h2>
            <p style={{ color: "var(--color-text-muted)" }}>
              As páginas são publicadas pelos períodos contratados (10, 20 ou 30 dias). 
              Após o término do período, a página será removida automaticamente. 
              Não há renovação automática dos planos.
            </p>
          </section>
          
          <section style={{ marginBottom: "var(--spacing-xl)" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "var(--spacing-md)" }}>
              5. Processo de Aprovação
            </h2>
            <p style={{ color: "var(--color-text-muted)" }}>
              Todos os projetos passam por um processo de revisão manual antes da publicação. 
              Reservamo-nos o direito de recusar a publicação de conteúdo que viole estes termos 
              ou que seja considerado inadequado.
            </p>
          </section>
          
          <section style={{ marginBottom: "var(--spacing-xl)" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "var(--spacing-md)" }}>
              6. Pagamentos e Reembolsos
            </h2>
            <p style={{ color: "var(--color-text-muted)" }}>
              Os pagamentos são processados através do Stripe. Os valores pagos não são reembolsáveis, 
              exceto em casos de falha técnica comprovada da nossa parte.
            </p>
          </section>
          
          <section style={{ marginBottom: "var(--spacing-xl)" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "var(--spacing-md)" }}>
              7. Limitação de Responsabilidade
            </h2>
            <p style={{ color: "var(--color-text-muted)" }}>
              O serviço é fornecido "como está". Não garantimos disponibilidade ininterrupta 
              ou ausência de erros. Não nos responsabilizamos por danos indiretos resultantes 
              do uso ou impossibilidade de uso do serviço.
            </p>
          </section>
          
          <section>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "var(--spacing-md)" }}>
              8. Alterações aos Termos
            </h2>
            <p style={{ color: "var(--color-text-muted)" }}>
              Reservamo-nos o direito de modificar estes termos a qualquer momento. 
              As alterações entrarão em vigor imediatamente após a publicação.
            </p>
          </section>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
