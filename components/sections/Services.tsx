"use client";

import { motion } from "framer-motion";
import { Workflow, TrendingUp, Brain, Briefcase } from "lucide-react";

const services = [
  {
    title: "Desenvolvimento Backend High-Performance",
    description: "Criação de APIs RESTful escaláveis utilizando Python (FastAPI) e SQLAlchemy, focadas em performance e segurança.",
    icon: Workflow,
  },
  {
    title: "Aplicações Web Modernas",
    description: "Interfaces reativas e otimizadas (SEO) construídas com Next.js e Tailwind CSS, garantindo a melhor experiência do usuário.",
    icon: TrendingUp,
  },
  {
    title: "Automação e Integrações (RPA)",
    description: "Conexão entre sistemas heterogêneos (ERPs, CRMs, Z-API) para automatizar fluxos de trabalho e reduzir tarefas manuais.",
    icon: Brain,
  },
  {
    title: "Arquitetura de Software",
    description: "Consultoria para definição de arquitetura limpa (Clean Architecture) e princípios SOLID, visando manutenibilidade a longo prazo.",
    icon: Briefcase,
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-white dark:bg-zinc-950 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-zinc-900 dark:text-white mb-4">
            Serviços Estratégicos
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Soluções desenhadas para gerar impacto financeiro real.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-xl hover:bg-zinc-50 dark:hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="mb-6 p-4 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg w-fit group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/20 transition-colors">
                <service.icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">{service.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
