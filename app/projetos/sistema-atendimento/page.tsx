"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Server,
  Database,
  Shield,
  Zap,
  Cpu,
  Workflow,
  Layout,
  Lock,
  MessageSquare,
  Activity,
  GitBranch,
  Layers,
  Clock,
  CheckCircle,
} from "lucide-react";
import {
  SiPython,
  SiFastapi,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiReact,
  SiNginx,
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
  { name: "Redis", icon: SiRedis, color: "#DC382D" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
];

const architectureSteps = [
  {
    step: "1",
    title: "Gateway & Rate Limit",
    desc: "NGINX recebe webhooks do WhatsApp (Z-API). Middleware aplica Rate Limiting atômico via Lua Scripts no Redis.",
    icon: SiNginx,
    color: "text-green-500",
  },
  {
    step: "2",
    title: "Bridge Service",
    desc: "Deduplicação de mensagens e roteamento inteligente. Separa mensagens de usuários das de atendentes.",
    icon: GitBranch,
    color: "text-blue-400",
  },
  {
    step: "3",
    title: "Distributed Lock",
    desc: "Redis Lock garante que mensagens simultâneas do mesmo usuário sejam processadas sequencialmente.",
    icon: Lock,
    color: "text-red-500",
  },
  {
    step: "4",
    title: "Bot Core (State Machine)",
    desc: "Pipeline processa a mensagem através de uma Máquina de Estados Finitos, mantendo contexto e sessão.",
    icon: Cpu,
    color: "text-purple-400",
  },
];

const deepDiveCards = [
  {
    title: "Concorrência & Race Conditions",
    icon: Activity,
    problem: "Usuário envia 'Oi' e 'Tudo bem?' em < 100ms. Processamento paralelo causaria respostas duplicadas e estado inconsistente.",
    solution: "Implementação de Distributed Locks no Redis (bot:lock:phone). A segunda mensagem aguarda na fila até a primeira liberar o estado, garantindo consistência ACID na sessão.",
    tech: "Redis Locks",
  },
  {
    title: "Rate Limiting Atômico",
    icon: Shield,
    problem: "Proteger a API contra bursts e DDoS sem adicionar latência significativa de rede.",
    solution: "Middleware customizado executando Scripts Lua diretamente no Redis. Operações de verificação e incremento são atômicas (0.5ms overhead), eliminando race conditions na contagem.",
    tech: "Lua Scripts",
  },
  {
    title: "State Machine Pattern",
    icon: Workflow,
    problem: "Gerenciar fluxos conversacionais complexos com 15+ estados, validações e retornos.",
    solution: "Arquitetura baseada em Máquina de Estados Finitos. Cada estado é isolado, testável e possui transições determinísticas baseadas em regras de validação (Regex/Lógica).",
    tech: "Design Patterns",
  },
  {
    title: "Resiliência & Circuit Breaker",
    icon: Zap,
    problem: "Falhas na API do WhatsApp ou Chatwoot não podem derrubar todo o sistema.",
    solution: "Padrão Circuit Breaker implementado nas integrações externas. Filas de Dead Letter para mensagens falhas e retries exponenciais para instabilidade de rede.",
    tech: "Fault Tolerance",
  },
];

const metrics = [
  { label: "Latência P95", value: "< 500ms", desc: "Tempo de resposta ponta a ponta" },
  { label: "Redução Carga", value: "40%", desc: "Menos atendimentos manuais" },
  { label: "Uptime", value: "99.5%", desc: "Disponibilidade 24/7" },
  { label: "Throughput", value: "5k+", desc: "Mensagens processadas/dia" },
];

export default function SistemaAtendimentoPage() {
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6">
              <Server className="w-3 h-3" />
              Sistemas Distribuídos
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              Sistema de Atendimento Automatizado
            </h1>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl mb-8">
              Como processar milhares de mensagens simultâneas via WhatsApp mantendo o contexto da conversa e garantindo que o usuário nunca receba respostas duplicadas, mesmo em picos de tráfego?
            </p>
            <p className="text-gray-500 text-base max-w-3xl mb-8">
              Uma solução de engenharia robusta utilizando arquitetura de microsserviços, processamento assíncrono e padrões de design avançados para garantir escalabilidade e consistência.
            </p>

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

      {/* Métricas de Impacto */}
      <section className="py-12 border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {metric.value}
                </div>
                <div className="text-primary font-semibold text-sm mb-1">
                  {metric.label}
                </div>
                <div className="text-gray-500 text-xs">
                  {metric.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Arquitetura */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn} className="mb-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
              Arquitetura do Sistema
            </h2>
            <p className="text-gray-400 max-w-2xl">
              Fluxo de dados otimizado para alta performance e desacoplamento de serviços.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-green-500/20 via-primary/20 to-purple-500/20 -translate-y-1/2 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
              {architectureSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="bg-[#161616] border border-white/10 rounded-xl p-6 relative group hover:border-primary/30 transition-colors"
                >
                  <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-sm font-bold text-gray-400 shadow-xl`}>
                    {step.step}
                  </div>
                  
                  <div className="mb-4 bg-white/5 w-12 h-12 rounded-lg flex items-center justify-center">
                    <step.icon className={`w-6 h-6 ${step.color}`} />
                  </div>
                  
                  <h3 className="text-white font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive Técnico */}
      <section className="py-16 bg-white/[0.02] border-t border-white/5">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn} className="mb-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
              Deep Dive Técnico
            </h2>
            <p className="text-gray-400 max-w-2xl">
              Soluções de engenharia para problemas complexos de concorrência e estado.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {deepDiveCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#161616] border border-white/10 rounded-xl p-6 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <card.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{card.title}</h3>
                    <span className="text-xs font-mono text-primary/80 bg-primary/10 px-2 py-0.5 rounded mt-1 inline-block">
                      {card.tech}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-red-500/5 border-l-2 border-red-500/30 p-3 rounded-r">
                    <span className="text-xs font-bold text-red-400 block mb-1">O DESAFIO</span>
                    <p className="text-gray-400 text-sm">{card.problem}</p>
                  </div>
                  
                  <div className="bg-green-500/5 border-l-2 border-green-500/30 p-3 rounded-r">
                    <span className="text-xs font-bold text-green-400 block mb-1">A SOLUÇÃO</span>
                    <p className="text-gray-300 text-sm">{card.solution}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack Detalhada */}
      <section className="py-16 border-t border-white/5">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-8">Stack Tecnológica Completa</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Server className="w-5 h-5 text-blue-400" /> Backend
              </h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" />FastAPI (Async)</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" />SQLAlchemy 2.0</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" />Pydantic v2</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" />Structlog (JSON Logs)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Layout className="w-5 h-5 text-cyan-400" /> Frontend
              </h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />React 18</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />Ant Design</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />Vite</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />Axios + Interceptors</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-orange-400" /> Infra & DevOps
              </h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-400" />Docker Compose</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-400" />NGINX (Reverse Proxy)</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-400" />Redis (Cache/Lock)</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-400" />PostgreSQL</li>
              </ul>
            </div>
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
