import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";

export default function Home() {
  return (
    <div className="flex flex-col gap-0 bg-white dark:bg-zinc-950 min-h-screen">
      <Hero />
      <Services />
      <Projects />
      <About />
    </div>
  );
}
