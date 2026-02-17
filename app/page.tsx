import { Hero } from "@/components/sections/Hero";
import { TechStack } from "@/components/sections/TechStack";
import { Projects } from "@/components/sections/Projects";

export default function Home() {
  return (
    <div className="flex flex-col gap-0 bg-white dark:bg-zinc-950 min-h-screen">
      <Hero />
      <TechStack />
      <Projects />
    </div>
  );
}
