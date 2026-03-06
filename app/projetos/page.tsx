"use client";

import { projects } from "@/lib/data";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-zinc-900 dark:text-white mb-6">
            Projetos
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl text-lg">
            Uma coleção de soluções desenvolvidas com foco em performance, escalabilidade e retorno sobre investimento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            // @ts-ignore
            const href = project.externalLink || `/projetos/${project.slug}`;
            // @ts-ignore
            const isExternal = !!project.externalLink;
            
            return (
            <Link
              key={index}
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
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
            );
          })}
        </div>
      </div>
    </div>
  );
}
