"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

export function About() {
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative">
              <Image
                src="/ednan_ferreira_da_silva.png"
                alt="Ednan Ferreira da Silva"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-background p-4 rounded-xl border border-white/10 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                  10+
                </div>
                <div>
                  <p className="text-white font-bold text-lg">Anos de Experiência</p>
                  <p className="text-gray-400 text-sm">Em Negociação Estratégica</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl md:text-4xl font-heading font-bold text-white mb-6">
              Da Negociação à Engenharia de Software
            </h2>
            
            <p className="text-gray-400 leading-relaxed mb-8">
              Engenheiro Eletricista de formação com mais de 10 anos de experiência liderando processos críticos de negociação e suprimentos em multinacionais. Essa trajetória me permitiu conduzir acordos que geraram milhões em savings, desenvolvendo uma habilidade no desenvolvimento de software: a capacidade de mensurar o impacto financeiro de cada decisão técnica.
            </p>
            
            <p className="text-gray-400 leading-relaxed mb-8">
              Hoje, aplico essa mesma visão analítica ao desenvolvimento de software. Não escrevo 
              apenas linhas de código; construo sistemas que resolvem dores reais de negócio, 
              otimizam processos e geram valor tangível. A tecnologia é o meio, o resultado 
              financeiro é o fim.
            </p>

            <ul className="space-y-4">
              {[
                "Visão de Negócio Orientada a Dados",
                "Desenvolvimento Focado em ROI",
                "Comunicação Clara e Assertiva",
                "Soluções Escaláveis e Robustas"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
