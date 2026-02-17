import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"], 
  variable: "--font-mono" 
});

export const metadata: Metadata = {
  title: "Ednan Ferreira da Silva | Desenvolvedor Full Stack & Estrategista",
  description: "Portfólio de Ednan Ferreira da Silva. Desenvolvimento de ativos digitais focados em reduzir custos e maximizar lucros.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-zinc-950 text-zinc-50 antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Mobile Header */}
          <div className="md:hidden">
            <Header />
          </div>
          
          {/* Desktop Sidebar */}
          <Sidebar />

          {/* Main Content Wrapper */}
          <main className="min-h-screen md:pl-64 transition-all duration-300 selection:bg-indigo-500/30 selection:text-indigo-200">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
