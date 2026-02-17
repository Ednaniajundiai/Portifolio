"use client";

import { projects } from "@/lib/data";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";

export function Projects() {
  return (
    <section id="projects" className="py-24 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">Projetos Selecionados</h2>
          <p className="text-zinc-400 max-w-xl">
            Soluções reais que geraram impacto mensurável.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => {
          // @ts-ignore
          const href = project.externalLink || `/projetos/${project.slug}`;
          // @ts-ignore
          const isExternal = !!project.externalLink;

          return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative flex flex-col bg-zinc-900 border border-white/5 rounded-xl overflow-hidden hover:border-indigo-500/30 transition-colors"
          >
            {/* Project Header/Image Placeholder */}
            <div className="h-48 bg-zinc-800/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent z-10" />
              {/* If we had real images, they would go here. For now, a pattern */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="absolute bottom-4 left-4 z-20">
                <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded border border-indigo-500/20">
                  {project.category}
                </span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-zinc-400 text-sm mb-6 line-clamp-3 flex-1">
                {project.description}
              </p>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 3).map((t, i) => (
                    <span key={i} className="text-xs text-zinc-500 font-mono">
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 pt-4 border-t border-white/5">
                  <Link
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white text-zinc-950 text-sm font-medium hover:bg-zinc-200 transition-colors"
                  >
                    {isExternal ? "Ver Site" : "Ver Detalhes"} <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  {/* @ts-ignore - Propriedade adicionada dinamicamente */}
                  {project.githubUrl && (
                    <Link
                      // @ts-ignore
                      href={project.githubUrl}
                      target="_blank"
                      className="p-2 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                      aria-label="Ver código no GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
          );
        })}
      </div>
    </section>
  );
}
