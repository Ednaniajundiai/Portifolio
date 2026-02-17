import { Workflow, Github, Linkedin, Mail } from "lucide-react";
import {
  SiPython,
  SiReact,
  SiTypescript,
  SiPostgresql,
  SiRedis,
  SiDocker,
} from "react-icons/si";

export const techStack = [
  { Icon: SiPython, label: "Python", category: "backend", color: "#3776AB" },
  { Icon: SiReact, label: "React 18", category: "frontend", color: "#61DAFB" },
  { Icon: SiTypescript, label: "TypeScript", category: "frontend", color: "#3178C6" },
  { Icon: SiPostgresql, label: "PostgreSQL", category: "data", color: "#4169E1" },
  { Icon: SiRedis, label: "Redis", category: "data", color: "#DC382D" },
  { Icon: SiDocker, label: "Docker", category: "infra", color: "#2496ED" },
  { Icon: Workflow, label: "N8N", category: "integrations", color: "#FF6584", imageSrc: "/n8n_icon-logo_brandlogos.net_3mw34.png" },
] as const;

export const projects = [
  {
    title: "Sistema de Atendimento Automatizado",
    slug: "sistema-atendimento",
    category: "Microsserviços & Automação",
    description:
      "Orquestração de microsserviços assíncronos para atendimento massivo. Utiliza Redis Distributed Locks para consistência de estado em alta concorrência, Lua Scripts para Rate Limiting atômico e arquitetura orientada a eventos.",
    result:
      "Redução de 40% na carga de atendimento manual, resposta em menos de 500ms e 99,5% de uptime.",
    tech: ["FastAPI", "React", "PostgreSQL", "Redis", "Docker"],
    image: "/placeholder-1.jpg",
    githubUrl: "https://github.com/Ednaniajundiai/atendimento-zapi-chatwoot", // Adicione o link do repositório
    demoUrl: "https://demo.com", // Adicione o link da demo (opcional)
  },
  {
    title: "CT Alpha - Gestão de Consentimentos",
    slug: "Parq",
    category: "SaaS & Compliance",
    description:
      "Sistema web para gestão de termos de consentimento e questionário PAR-Q com geração de PDF e integração N8N.",
    result: "Eliminação de papel, conformidade LGPD e automação de 100% do fluxo de admissão.",
    tech: ["FastAPI", "Python", "N8N", "Docker", "PostgreSQL"],
    image: "/placeholder-parq.jpg",
    githubUrl: "https://github.com/Ednaniajundiai/sistema-parq-academias", // Adicione o link do repositório
    // demoUrl: "https://demo.com",
  },
  {
    title: "Site Psicóloga Beatriz",
    slug: "site-psicologa-beatriz",
    category: "Landing Page & SPA",
    description:
      "Website profissional para psicóloga com foco em Terapia Cognitivo-Comportamental. Design limpo e acessível para facilitar o contato com pacientes.",
    result: "Presença digital profissional e facilidade de agendamento.",
    tech: ["HTML5", "Tailwind CSS", "JavaScript", "GitHub Pages"],
    image: "/placeholder-beatriz.jpg",
    githubUrl: "https://github.com/Ednaniajundiai/site-psicologa-beatriz",
    externalLink: "https://ednaniajundiai.github.io/site-psicologa-beatriz/",
  },
  {
    title: "Site Psicólogo Ricardo",
    slug: "site-psicologo-ricardo",
    category: "Site Institucional",
    description:
      "Website profissional para psicólogo clínico com abordagem Junguiana. Interface moderna com animações fluidas e foco na experiência do usuário.",
    result: "Plataforma moderna para divulgação de serviços e agendamento.",
    tech: ["Next.js", "Tailwind CSS", "TypeScript", "Framer Motion"],
    image: "/placeholder-ricardo.jpg",
    githubUrl: "https://github.com/Ednaniajundiai/site-psicologo-ricardo",
    externalLink: "http://ricardomontanaripsicologia.live/",
  },
  {
    title: "Z-API Integration Service",
    slug: "zapi-integration",
    category: "Integração & Automação",
    description:
      "Middleware de integração com WhatsApp via Z-API. Arquitetura cliente-servidor com Backend FastAPI para gerenciamento de instâncias e Frontend React para pareamento via QRCode.",
    result: "Interface unificada para gestão de conexões WhatsApp e exposição de endpoints simplificados.",
    tech: ["FastAPI", "React", "Python", "Vite", "HTTPX"],
    image: "/placeholder-zapi.jpg",
    githubUrl: "https://github.com/Ednaniajundiai/Qrcode_zapi",
  },

];

export const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/Ednaniajundiai", // Placeholder
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/ednan-ferreira", // Placeholder
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:ednan.iajundiai@gmail.com",
    icon: Mail,
  },
];
