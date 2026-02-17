"use client";

import { motion } from "framer-motion";
import { TrendingUp, Code2, GraduationCap, BrainCircuit } from "lucide-react";

export function About() {
  const highlights = [
    {
      icon: TrendingUp,
      title: "Visão de Negócio",
      description: "10 anos em Supply Chain liderando negociações milionárias. Foco em ROI e eficiência."
    },
    {
      icon: Code2,
      title: "Engenharia de Software",
      description: "Desenvolvimento Full Stack com Python (FastAPI) e React (Next.js). Arquitetura limpa e escalável."
    },
    {
      icon: BrainCircuit,
      title: "Automação Inteligente",
      description: "Especialista em n8n e integração de IAs para eliminar processos manuais e repetitivos."
    },
    {
      icon: GraduationCap,
      title: "Formação Sólida",
      description: "Engenheiro Eletricista, MBA em Supply Chain e MBA em Engenharia de Software (USP/ESALQ)."
    }
  ];

  return (
    <section id="about" className="py-20 bg-zinc-950/50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Coluna de Texto */}
          <div className="space-y-6">
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-mono border border-indigo-500/20">
              Sobre Mim
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Engenharia e Negócios: <br />
              <span className="text-zinc-500">Uma combinação poderosa.</span>
            </h2>
            
            <div className="text-zinc-400 space-y-4 leading-relaxed">
              <p>
                Minha trajetória não é linear, e isso é minha maior vantagem. Sou <strong>Engenheiro Eletricista</strong> por formação e construí uma carreira sólida de 10 anos em Supply Chain, liderando negociações estratégicas em multinacionais como Klabin e Food Brands.
              </p>
              <p>
                Essa vivência me ensinou a identificar gargalos e entender o valor do dinheiro. Hoje, como Engenheiro de Software, não escrevo apenas código; construo ferramentas que resolvem dores reais de negócio.
              </p>
              <p>
                Meu objetivo é entregar software que se pague através da eficiência que gera, unindo automação, inteligência artificial e desenvolvimento robusto.
              </p>
            </div>
          </div>

          {/* Coluna de Cards/Destaques */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4 text-indigo-400 group-hover:scale-110 transition-transform">
                  <item.icon size={20} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
