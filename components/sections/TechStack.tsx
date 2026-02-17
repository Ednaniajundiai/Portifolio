"use client";

import { BentoGrid, BentoGridItem } from "../ui/BentoGrid";
import { techStack } from "@/lib/data";
import { motion } from "framer-motion";
import { Code2, Database, LayoutTemplate, Server, Settings } from "lucide-react";

export function TechStack() {
  // Group tech stack by category
  const categories = {
    Frontend: techStack.filter(t => t.category === "frontend"),
    Backend: techStack.filter(t => t.category === "backend"),
    Data: techStack.filter(t => t.category === "data"),
    Infra: techStack.filter(t => t.category === "infra" || t.category === "integrations"),
  };

  const items = [
    {
      title: "Frontend Engineering",
      description: "Interfaces reativas e performáticas com foco em UX.",
      header: <CategoryList items={categories.Frontend} />,
      icon: <LayoutTemplate className="h-4 w-4 text-indigo-500" />,
      className: "md:col-span-2",
    },
    {
      title: "Backend & API",
      description: "Sistemas robustos e escaláveis.",
      header: <CategoryList items={categories.Backend} />,
      icon: <Server className="h-4 w-4 text-emerald-500" />,
      className: "md:col-span-1",
    },
    {
      title: "Data & Storage",
      description: "Gerenciamento eficiente de dados.",
      header: <CategoryList items={categories.Data} />,
      icon: <Database className="h-4 w-4 text-blue-500" />,
      className: "md:col-span-1",
    },
    {
      title: "Infra & DevOps",
      description: "Deploy, containerização e automação.",
      header: <CategoryList items={categories.Infra} />,
      icon: <Settings className="h-4 w-4 text-orange-500" />,
      className: "md:col-span-2",
    },
  ];

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Tech Stack</h2>
        <p className="text-zinc-400">Tecnologias que domino para entregar valor.</p>
      </div>
      
      <BentoGrid className="max-w-7xl mx-auto">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            icon={item.icon}
            className={item.className}
          />
        ))}
      </BentoGrid>
    </section>
  );
}

const CategoryList = ({ items }: { items: typeof techStack[number][] }) => (
  <div className="flex flex-wrap gap-2 min-h-[6rem] content-start">
    {items.map((tech) => (
      <div 
        key={tech.label}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-zinc-800/50 border border-zinc-700/50 text-xs font-mono text-zinc-300 hover:bg-zinc-800 transition-colors"
      >
        <tech.Icon className="w-3 h-3" style={{ color: tech.color }} />
        {tech.label}
      </div>
    ))}
  </div>
);
