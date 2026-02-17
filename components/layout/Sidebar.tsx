"use client";

import { 
  Home, 
  Briefcase, 
  User, 
  Mail
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "../ui/ThemeToggle";
import { socialLinks } from "@/lib/data";

const navLinks = [
  { name: "Início", href: "#", icon: Home },
  { name: "Projetos", href: "#projects", icon: Briefcase },
  { name: "Sobre", href: "#about", icon: User },
  { name: "Contato", href: "#contact", icon: Mail },
];

export function Sidebar() {
  const [active, setActive] = useState("Início");

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-white/5 flex flex-col justify-between p-6 z-50 hidden md:flex">
      {/* Logo Area */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-xl font-bold font-mono tracking-tighter text-zinc-900 dark:text-white">
          EDNAN<span className="text-indigo-500">.DEV</span>
        </h1>
        <ThemeToggle />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-2">
        {navLinks.map((link) => {
          const isActive = active === link.name;
          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setActive(link.name)}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 group ${
                isActive 
                  ? "bg-indigo-50 dark:bg-white/5 text-indigo-600 dark:text-indigo-400 font-medium" 
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5"
              }`}
            >
              <link.icon className={`w-5 h-5 ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white"}`} />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Social Links */}
      <div className="pt-6 border-t border-zinc-200 dark:border-white/5">
        <div className="flex justify-center gap-4">
          {socialLinks.map((social, index) => (
            <Link
              key={index}
              href={social.href}
              target="_blank"
              className="p-2 bg-zinc-100 dark:bg-white/5 rounded-full text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-white hover:bg-indigo-50 dark:hover:bg-indigo-500/20 transition-all duration-300"
            >
              <social.icon className="w-4 h-4" />
            </Link>
          ))}
        </div>
        <div className="mt-4 text-center">
          <p className="text-xs text-zinc-400">© 2026 Ednan.dev</p>
        </div>
      </div>
    </aside>
  );
}
