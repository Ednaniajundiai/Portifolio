import Link from "next/link";
import { socialLinks } from "@/lib/data";

export function Footer() {
  return (
    <footer id="contact" className="bg-[#161616] border-t border-white/5 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">
              Vamos construir algo rentável?
            </h3>
            <p className="text-gray-400 max-w-md">
              Entre em contato para discutir como a tecnologia pode alavancar seus resultados.
            </p>
          </div>

          <div className="flex gap-6">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <link.icon className="w-6 h-6" />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Ednan Ferreira . Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
