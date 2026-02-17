"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import Link from "next/link";
import { projects } from "@/lib/data";

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Projetos de Alto Impacto
            </h2>
            <p className="text-gray-400 max-w-xl">
              Não apenas código, mas soluções de engenharia focadas em ROI e eficiência operacional.
            </p>
          </div>
          <Link 
            href="/projetos" 
            className="text-primary hover:text-primary flex items-center gap-2 font-medium transition-colors"
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
                className="group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300 block"
              >
                <div className="aspect-video w-full bg-gradient-to-br from-gray-800 to-gray-900 group-hover:scale-105 transition-transform duration-500 relative flex items-center justify-center">
                  <FolderGit2 className="w-16 h-16 text-white/10 group-hover:text-primary/20 transition-colors duration-300" />
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                        {project.category}
                      </span>
                      <h3 className="text-xl font-bold text-white mt-1 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors" />
                  </div>

                  <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="bg-primary/20 border border-primary/20 rounded-lg p-4 mb-6">
                    <p className="text-primary text-sm font-medium flex items-start gap-2">
                      <span className="text-primary">*</span>
                      {project.result}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 rounded-full bg-white/5 text-gray-300 border border-white/5"
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
