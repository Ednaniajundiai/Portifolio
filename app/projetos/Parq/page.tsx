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
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "SQLite", icon: SiSqlite, color: "#003B57" },
  { name: "N8N", icon: SiN8N, color: "#FF6584" },
  { name: "Google Sheets", icon: SiGooglesheets, color: "#34A853" },
];

const techStack = {
  backend: [
    { name: "FastAPI", version: "0.109", desc: "API assíncrona de alta performance com validação Pydantic e OpenAPI automático" },
    { name: "SQLAlchemy", version: "2.0 (Async)", desc: "ORM moderno com suporte a operações assíncronas e migrations via Alembic" },
    { name: "Pydantic", version: "v2", desc: "Validação robusta de dados e configurações com tipagem forte" },
    { name: "aiosmtplib", desc: "Envio de e-mails assíncrono para não bloquear o event loop" },
    { name: "xhtml2pdf", desc: "Geração de PDFs compatíveis a partir de templates HTML/CSS" },
  ],
  frontend: [
    { name: "HTML5 & CSS3", desc: "Estrutura semântica e estilização responsiva sem frameworks pesados" },
    { name: "JavaScript Vanilla", desc: "Lógica de formulário leve, máscaras e validações no cliente" },
  ],
  infra: [
    { name: "Docker", desc: "Containerização para consistência entre ambientes de desenvolvimento e produção" },
    { name: "N8N", desc: "Automação de fluxo de trabalho para upload de arquivos e integrações externas" },
    { name: "PostgreSQL/SQLite", desc: "Banco de dados relacional (SQLite em dev, Postgres em prod)" },
    { name: "Google Sheets API", desc: "Integração via Service Account para registro auditável em planilhas" },
  ],
};

const highlights = [
  {
    title: "Orquestração e Integração N8N",
    icon: Workflow,
    problem: "Necessidade de armazenar PDFs externamente e integrar múltiplos serviços sem acoplar tudo ao backend.",
    solution:
      "Webhook N8N recebe payload com PDF em base64 e metadados. O fluxo N8N gerencia o upload para o Google Drive e outras automações, desacoplando o storage do núcleo da aplicação.",
    lines: "Desacoplamento de storage e automação low-code",
  },
  {
    title: "Questionário PAR-Q Consolidado",
    icon: FileText,
    problem: "Gerar documentos consistentes (PDF e E-mail) a partir de um questionário de saúde complexo.",
    solution:
      "Schema único 'QuestionnaireConsentData' valida e formata as respostas. O mesmo texto formatado alimenta tanto o gerador de PDF (xhtml2pdf) quanto o template de e-mail, garantindo consistência total.",
    lines: "Reutilização de lógica de apresentação",
  },
  {
    title: "Auditoria em Planilhas e Logs LGPD",
    icon: FileSpreadsheet,
    problem: "Manter registro acessível para administração e logs seguros conforme a LGPD.",
    solution:
      "Atualização em tempo real no Google Sheets via API. Sistema de logging com mascaramento automático de dados sensíveis (CPF, e-mail, telefone) para conformidade e segurança.",
    lines: "Compliance e visibilidade operacional",
  },
  {
    title: "Arquitetura Limpa (Clean Architecture)",
    icon: Layout,
    problem: "Manter o código organizado e testável com regras de negócio complexas de consentimento.",
    solution:
      "Separação estrita em camadas: Domain (regras), Application (casos de uso), Infrastructure (banco, e-mail, PDF) e Interfaces (API). Dependências injetadas para facilitar testes e manutenção.",
    lines: "Código modular e independente de framework",
  },
];

const concepts = [
  { concept: "Clean Architecture", where: "Estrutura do projeto (Domain, App, Infra, Interfaces)" },
  { concept: "Async/Await", where: "Todo o fluxo de I/O (Banco, E-mail, Webhooks)" },
  { concept: "Validação de Dados", where: "Pydantic Schemas para Requests e Configurações" },
  { concept: "Integração Low-Code", where: "Webhook N8N para orquestração de arquivos" },
  { concept: "Geração de Documentos", where: "HTML/CSS para PDF com xhtml2pdf" },
  { concept: "Segurança e LGPD", where: "Logs mascarados e consentimento explícito" },
  { concept: "Design Patterns", where: "Repository, Use Case, Service Layer" },
];

export default function ParqPage() {
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
              CT Alpha - Sistema de Gestão de Consentimentos
            </h1>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl mb-6">
              Sistema web para registro, gestão e auditoria de termos de consentimento de saúde (PAR-Q) 
              e LGPD para academias de artes marciais, com foco em conformidade e automação.
            </p>

            <div className="max-w-3xl mb-6">
              <h3 className="text-white font-semibold text-lg mb-4">O projeto implementa:</h3>
              <ul className="space-y-2">
                {[
                  {
                    label: "Gestão de Consentimentos LGPD",
                    desc: "Coleta e armazenamento seguro de termos de uso de imagem e dados de saúde",
                  },
                  {
                    label: "Questionário PAR-Q Digital",
                    desc: "Formulário de prontidão para atividade física com validação e geração de PDF",
                  },
                  {
                    label: "Automação de Documentos",
                    desc: "Geração automática de comprovantes em PDF e envio por e-mail para o aluno",
                  },
                  {
                    label: "Integração com Google Sheets",
                    desc: "Sincronização em tempo real para controle administrativo facilitado",
                  },
                  {
                    label: "Upload via N8N",
                    desc: "Pipeline automatizado para armazenamento de arquivos no Google Drive",
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
                  Academias precisavam de um controle rigoroso de saúde e dados:
                </p>
                <ul className="space-y-3">
                  {[
                    "Gestão manual de papéis e formulários físicos",
                    "Dificuldade em manter conformidade com a LGPD",
                    "Risco de perda de documentos importantes",
                    "Falta de backups digitais organizados",
                    "Processo lento de admissão de novos alunos",
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
                  Sistema digital centralizado e automatizado:
                </p>
                <ul className="space-y-3">
                  {[
                    "Formulário online multi-step intuitivo",
                    "Assinatura e aceite digital de termos",
                    "Geração instantânea de cópia em PDF",
                    "Envio automático de comprovantes por e-mail",
                    "Painel de controle via Google Sheets",
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
                      label: "Conformidade Legal",
                      desc: "Registro auditável de consentimento e dados de saúde",
                    },
                    {
                      label: "Eficiência Operacional",
                      desc: "Eliminação total do fluxo de papel na admissão",
                    },
                    {
                      label: "Segurança de Dados",
                      desc: "Armazenamento seguro e logs com mascaramento de dados",
                    },
                    {
                      label: "Experiência do Aluno",
                      desc: "Processo rápido, moderno e transparente",
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

      {/* Integrações */}
      <section className="py-12 border-t border-white/5">
        <div className="container mx-auto px-4">
          <motion.h2
            {...fadeIn}
            className="text-2xl md:text-3xl font-heading font-bold text-white mb-10"
          >
            Integrações e Fluxos
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              {...fadeIn}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                <Workflow className="w-5 h-5 text-primary" />
                N8N & Google Drive
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                O backend envia o PDF gerado em base64 para um webhook do N8N. 
                O fluxo N8N converte o arquivo e realiza o upload organizado no Google Drive, 
                retornando o link ou status, mantendo o backend leve e sem dependências diretas de storage.
              </p>
            </motion.div>
            <motion.div
              {...fadeIn}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-green-500" />
                Google Sheets API
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Para facilitar a gestão pelos administradores da academia, cada novo registro 
                ou atualização de status (revogação/expiração) é refletido instantaneamente 
                em uma planilha de controle via API.
              </p>
            </motion.div>
          </div>
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
                Backend - Python
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
                Frontend
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
                Infraestrutura & Integrações
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
            Fluxo de Registro
          </motion.h2>

          <div className="space-y-6">
            <motion.div
              {...fadeIn}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4">
                Do Formulário à Confirmação
              </h3>
              <div className="space-y-3">
                {[
                  "Aluno preenche dados e questionário PAR-Q no frontend",
                  "API recebe POST, valida dados com Pydantic e verifica duplicidade",
                  "Use Case cria registros no banco e gera PDF do termo com xhtml2pdf",
                  "Sistema envia e-mail com PDF anexo para o aluno (aiosmtplib)",
                  "Webhook N8N é acionado para upload do PDF no Google Drive",
                  "Planilha Google Sheets é atualizada com novo registro",
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
