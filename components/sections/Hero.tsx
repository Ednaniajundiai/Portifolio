"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { techStack } from "@/lib/data";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col lg:flex-row items-center justify-center px-4 md:px-8 max-w-7xl mx-auto gap-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl flex-1"
      >
        <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-mono mb-6 border border-indigo-500/20">
          Desenvolvedor Full Stack
        </span>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
          Ednan Ferreira <br />
          <span className="text-zinc-500"></span>
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

        <div className="mt-8 md:mt-10 flex flex-col gap-3">
          <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
            Tech Stack Principal
          </span>
          <div className="flex flex-wrap items-center gap-3">
            {techStack.map((item) => (
              <div 
                key={item.label} 
                className="group relative p-2 rounded-lg bg-zinc-900/50 border border-zinc-800/50 hover:border-indigo-500/30 hover:bg-indigo-500/10 transition-all duration-300 cursor-help"
              >
                {"imageSrc" in item ? (
                  <div className="relative w-5 h-5">
                    <Image
                      src={item.imageSrc}
                      alt={item.label}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <item.Icon size={20} style={{ color: item.color }} />
                )}
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-zinc-700">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0"
      >
        <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-2xl" />
        <Image
          src="/ednan_ferreira_da_silva.png"
          alt="Foto de Ednan Ferreira "
          fill
          className="object-cover rounded-full border-4 border-zinc-900/50 shadow-2xl"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </motion.div>

      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
    </section>
  );
}
