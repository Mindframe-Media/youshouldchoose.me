/* Criado por Mindframe Media */

import "./globals.css";

export const metadata = {
  title: "You Should Choose",
  description: "Gera apresentações e páginas em subdomínios temporários.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>
        {children}
      </body>
    </html>
  );
}
