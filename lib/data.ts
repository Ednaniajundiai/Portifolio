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
  { Icon: Workflow, label: "N8N", category: "integrations", color: "#FF6584" },
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
  },

];

export const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/ednan", // Placeholder
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/ednan", // Placeholder
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:contato@ednan.dev",
    icon: Mail,
  },
];
