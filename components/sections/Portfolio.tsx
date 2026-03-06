"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import Link from "next/link";
import { projects } from "@/lib/data";

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-zinc-50 dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-zinc-900 dark:text-white mb-4">
              Projetos de Alto Impacto
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-xl">
              Não apenas código, mas soluções de engenharia focadas em ROI e eficiência operacional.
            </p>
          </div>
          <Link 
            href="/projetos" 
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-2 font-medium transition-colors"
          >
            Ver todos os projetos <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/projetos/${project.slug}`}
                className="group relative overflow-hidden rounded-xl bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:border-indigo-500/50 transition-all duration-300 block shadow-sm dark:shadow-none"
              >
                <div className="aspect-video w-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 group-hover:scale-105 transition-transform duration-500 relative flex items-center justify-center">
                  <FolderGit2 className="w-16 h-16 text-zinc-300 dark:text-white/10 group-hover:text-indigo-500/20 transition-colors duration-300" />
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                        {project.category}
                      </span>
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-zinc-400 dark:text-zinc-600 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                  </div>

                  <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="bg-indigo-50 dark:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-500/20 rounded-lg p-4 mb-6">
                    <p className="text-indigo-700 dark:text-indigo-400 text-sm font-medium flex items-start gap-2">
                      <span className="text-indigo-600 dark:text-indigo-400">*</span>
                      {project.result}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 rounded-full bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
