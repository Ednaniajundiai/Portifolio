"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl"
      >
        <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-mono mb-6 border border-indigo-500/20">
          Desenvolvedor Full Stack
        </span>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
          Ednan Ferreira <br />
          <span className="text-zinc-500">da Silva</span>
        </h1>
        
        <p className="text-xl text-zinc-400 mb-8 max-w-2xl leading-relaxed">
          Desenvolvo ativos digitais de alta performance focados em redução de custos operacionais e maximização de lucros. Engenharia de software com visão estratégica de negócios.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link 
            href="#projects"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all flex items-center gap-2"
          >
            Ver Projetos <ArrowRight className="w-4 h-4" />
          </Link>
          
          <Link 
            href="#contact"
            className="px-6 py-3 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 rounded-lg font-medium transition-all"
          >
            Entrar em Contato
          </Link>
        </div>
      </motion.div>
      
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
    </section>
  );
}
