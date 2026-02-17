"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Server,
  Database,
  Shield,
  Zap,
  FileText,
  Mail,
  Workflow,
  Layout,
  Lock,
  CheckCircle,
  FileSpreadsheet,
  QrCode,
  Smartphone,
  RefreshCw,
  Unplug,
} from "lucide-react";
import {
  SiPython,
  SiFastapi,
  SiPostgresql,
  SiSqlite,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiGooglesheets,
  SiDocker,
  SiPydantic,
  SiN8N,
  SiReact,
  SiVite,
  SiAxios,
} from "react-icons/si";
import type { IconType } from "react-icons";
import Link from "next/link";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const heroTechs: { name: string; icon: IconType; color: string }[] = [
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "FastAPI", icon: SiFastapi, color: "#009688" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Vite", icon: SiVite, color: "#646CFF" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
];

const techStack = {
  backend: [
    { name: "FastAPI", version: "0.109+", desc: "Framework moderno e de alta performance para construção de APIs com Python" },
    { name: "HTTPX", version: "Async", desc: "Cliente HTTP assíncrono para comunicação não-bloqueante com a Z-API" },
    { name: "Pydantic", version: "v2", desc: "Validação de dados e serialização robusta" },
    { name: "Uvicorn", desc: "Servidor ASGI de alta performance" },
  ],
  frontend: [
    { name: "React", desc: "Biblioteca JavaScript para construção de interfaces de usuário" },
    { name: "Vite", desc: "Build tool de próxima geração para desenvolvimento frontend rápido" },
    { name: "Axios", desc: "Cliente HTTP baseado em promessas para o navegador" },
  ],
  infra: [
    { name: "Docker", desc: "Containerização para garantir consistência entre ambientes" },
    { name: "Z-API", desc: "Gateway de integração com WhatsApp" },
  ],
};

const highlights = [
  {
    title: "Proxy Inteligente Z-API",
    icon: Server,
    problem: "Gerenciar tokens e endpoints da Z-API diretamente em múltiplos serviços gera acoplamento e complexidade.",
    solution:
      "Backend atua como um wrapper centralizado, gerenciando autenticação e expondo endpoints simplificados e padronizados para os clientes internos.",
    lines: "Centralização de lógica e segurança",
  },
  {
    title: "Pareamento em Tempo Real",
    icon: QrCode,
    problem: "Necessidade de uma interface simples para conectar novas instâncias do WhatsApp sem intervenção técnica.",
    solution:
      "Frontend React consome endpoint de QRCode em Base64 e atualiza status de conexão em tempo real, permitindo pareamento imediato pelo usuário final.",
    lines: "UX simplificada para operação técnica",
  },
  {
    title: "Conexão via Código Telefônico",
    icon: Smartphone,
    problem: "Limitações de câmera ou preferência por pareamento via código numérico.",
    solution:
      "Implementação de fluxo alternativo de conexão utilizando código de pareamento via número de telefone, aumentando a flexibilidade de uso.",
    lines: "Acessibilidade e redundância de conexão",
  },
  {
    title: "Gestão de Ciclo de Vida",
    icon: RefreshCw,
    problem: "Instâncias travadas ou desconectadas exigiam reinicialização manual complexa.",
    solution:
      "Endpoints dedicados para Restart e Disconnect, permitindo recuperação rápida de falhas de conexão diretamente pela interface.",
    lines: "Resiliência e auto-recuperação",
  },
];

const concepts = [
  { concept: "Clean Code", where: "Estrutura modular e legível em todo o backend" },
  { concept: "Type Hints", where: "Uso estrito de tipagem no Python para segurança" },
  { concept: "Async/Await", where: "Comunicação não-bloqueante com APIs externas" },
  { concept: "Separation of Concerns", where: "Divisão clara entre Services e Controllers" },
  { concept: "Environment Config", where: "Gerenciamento seguro via variáveis de ambiente (.env)" },
  { concept: "Component-Based UI", where: "Interface React modular e reutilizável" },
];

export default function ZapiIntegrationPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header com botao voltar */}
      <section className="pt-8 pb-4">
        <div className="container mx-auto px-4">
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Portfólio
          </Link>
        </div>
      </section>

      {/* Hero do Projeto */}
      <section className="pt-4 pb-10 md:pt-6 md:pb-16">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn} className="max-w-4xl">
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mt-2 mb-4">
              Z-API Integration Service
            </h1>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl mb-6">
              Serviço de integração robusto para automação de WhatsApp utilizando a Z-API. 
              Atua como um middleware inteligente que gerencia autenticação, sessões e expõe 
              uma API simplificada para outros serviços.
            </p>

            <div className="max-w-3xl mb-6">
              <h3 className="text-white font-semibold text-lg mb-4">O projeto implementa:</h3>
              <ul className="space-y-2">
                {[
                  {
                    label: "Proxy/Wrapper para Z-API",
                    desc: "Camada de abstração que simplifica o consumo da API oficial",
                  },
                  {
                    label: "Visualização de QRCode",
                    desc: "Interface gráfica para leitura e pareamento rápido de instâncias",
                  },
                  {
                    label: "Pareamento via Telefone",
                    desc: "Alternativa de conexão via código numérico para maior compatibilidade",
                  },
                  {
                    label: "Gestão de Instância",
                    desc: "Controle total sobre reinicialização e desconexão de sessões",
                  },
                  {
                    label: "Arquitetura Modular",
                    desc: "Backend Python estruturado com foco em manutenibilidade e escalabilidade",
                  },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <div>
                      <span className="text-white font-medium text-sm">{item.label}</span>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-6">
              {heroTechs.map((tech) => (
                <div
                  key={tech.name}
                  className="flex flex-col items-center gap-2 group"
                >
                  <tech.icon
                    className="w-8 h-8 group-hover:scale-110 transition-transform"
                    style={{ color: tech.color }}
                  />
                  <span className="text-xs text-gray-400 group-hover:text-white transition-colors">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problema e Solução */}
      <section className="py-12 border-t border-white/5">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn}>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-8">
              Problema e Solução
            </h2>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Problema */}
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
                <h3 className="text-lg font-bold text-red-400 mb-4">Problema</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Gerenciar conexões de WhatsApp em escala apresenta desafios:
                </p>
                <ul className="space-y-3">
                  {[
                    "Complexidade de autenticação com múltiplos tokens",
                    "Dificuldade em monitorar status de conexão em tempo real",
                    "Falta de interface visual para pareamento de novas sessões",
                    "Processos manuais para reiniciar instâncias travadas",
                    "Acoplamento direto com a API de terceiros em vários serviços",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solução */}
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                <h3 className="text-lg font-bold text-primary mb-4">Solução</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Um middleware dedicado e interface de gestão:
                </p>
                <ul className="space-y-3">
                  {[
                    "API Gateway centralizado para todas as operações de WhatsApp",
                    "Dashboard React para visualização de status e QRCode",
                    "Endpoints padronizados e documentados (Swagger UI)",
                    "Tratamento automático de erros e reconexão",
                    "Abstração completa da complexidade da Z-API",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resultados */}
              <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-6">
                <h3 className="text-lg font-bold text-green-400 mb-4">Benefícios</h3>
                <ul className="space-y-4">
                  {[
                    {
                      label: "Estabilidade",
                      desc: "Redução drástica de quedas de conexão e timeouts",
                    },
                    {
                      label: "Manutenibilidade",
                      desc: "Código limpo e modular facilitando evoluções futuras",
                    },
                    {
                      label: "Operação Simplificada",
                      desc: "Qualquer usuário pode parear uma instância via QR Code",
                    },
                    {
                      label: "Segurança",
                      desc: "Tokens sensíveis isolados no backend via variáveis de ambiente",
                    },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                      <div>
                        <span className="text-white font-medium text-sm">{item.label}</span>
                        <p className="text-gray-400 text-xs mt-0.5">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Destaques Técnicos */}
      <section className="py-12 border-t border-white/5">
        <div className="container mx-auto px-4">
          <motion.h2
            {...fadeIn}
            className="text-2xl md:text-3xl font-heading font-bold text-white mb-10"
          >
            Destaques Técnicos
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-white font-bold">{item.title}</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-semibold text-red-400 uppercase">Desafio</span>
                    <p className="text-gray-400 text-sm mt-1">{item.problem}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-primary uppercase">Solução</span>
                    <p className="text-gray-400 text-sm mt-1">{item.solution}</p>
                  </div>
                  <p className="text-xs text-gray-500 italic">{item.lines}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack Tecnológica */}
      <section className="py-12 border-t border-white/5">
        <div className="container mx-auto px-4">
          <motion.h2
            {...fadeIn}
            className="text-2xl md:text-3xl font-heading font-bold text-white mb-10"
          >
            Stack Tecnológica
          </motion.h2>

          <div className="space-y-10">
            {/* Backend */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Server className="w-5 h-5 text-primary" />
                Backend - Python (FastAPI)
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {techStack.backend.map((tech, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="bg-white/5 border border-white/10 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-semibold text-sm">{tech.name}</span>
                      {tech.version && <span className="text-xs text-gray-500 font-mono">{tech.version}</span>}
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">{tech.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Frontend */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Layout className="w-5 h-5 text-primary" />
                Frontend - React
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {techStack.frontend.map((tech, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="bg-white/5 border border-white/10 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-semibold text-sm">{tech.name}</span>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">{tech.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Infraestrutura */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                Infraestrutura
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {techStack.infra.map((tech, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="bg-white/5 border border-white/10 rounded-lg p-4"
                  >
                    <span className="text-white font-semibold text-sm">{tech.name}</span>
                    <p className="text-gray-400 text-xs leading-relaxed mt-1">{tech.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fluxos de Dados */}
      <section className="py-12 border-t border-white/5">
        <div className="container mx-auto px-4">
          <motion.h2
            {...fadeIn}
            className="text-2xl md:text-3xl font-heading font-bold text-white mb-10"
          >
            Fluxo de Operação
          </motion.h2>

          <div className="space-y-6">
            <motion.div
              {...fadeIn}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4">
                Ciclo de Conexão e Gerenciamento
              </h3>
              <div className="space-y-3">
                {[
                  "Frontend solicita status da conexão ao Backend",
                  "Backend consulta Z-API e retorna estado (Conectado/Desconectado)",
                  "Se desconectado, Frontend solicita QRCode em Base64",
                  "Usuário lê o QRCode com o WhatsApp no celular",
                  "Z-API confirma conexão via Webhook ou Polling",
                  "Backend atualiza status e libera uso da API para envio de mensagens",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-primary font-mono text-sm font-bold min-w-[24px]">
                      {i + 1}.
                    </span>
                    <p className="text-gray-400 text-sm">{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Conceitos Avançados */}
      <section className="py-12 border-t border-white/5">
        <div className="container mx-auto px-4">
          <motion.h2
            {...fadeIn}
            className="text-2xl md:text-3xl font-heading font-bold text-white mb-10"
          >
            Conceitos Aplicados
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-4">
            {concepts.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-lg p-4"
              >
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <span className="text-white font-semibold text-sm">{item.concept}</span>
                  <p className="text-gray-400 text-xs mt-1">{item.where}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Voltar */}
      <section className="py-16 border-t border-white/5">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...fadeIn}>
            <Link
              href="/#portfolio"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Portfólio
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
