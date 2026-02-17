"use client";

import { motion } from "framer-motion";
import { Workflow, TrendingUp, Brain, Briefcase } from "lucide-react";

const services = [
  {
    title: "Automação de Ponta a Ponta",
    description: "Integração de sistemas que liberam a equipe para o estratégico, reduzindo o custo por operação.",
    icon: Workflow,
  },
  {
    title: "Sistemas de Conversão e Retenção",
    description: "Landing pages e sites institucionais projetados para transformar visitantes em clientes de forma automatizada.",
    icon: TrendingUp,
  },
  {
    title: "Inteligência em Processos",
    description: "Desenvolvimento de ferramentas personalizadas que transformam dados em decisões e ações automatizadas de venda.",
    icon: Brain,
  },
  {
    title: "Abordagem Consultiva",
    description: "Foco em entender o modelo de negócio para aplicar a tecnologia que trará o ROI mais rápido.",
    icon: Briefcase,
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Serviços Estratégicos
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
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
              className="glass-card p-8 rounded-xl hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="mb-6 p-4 bg-primary/10 rounded-lg w-fit group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
