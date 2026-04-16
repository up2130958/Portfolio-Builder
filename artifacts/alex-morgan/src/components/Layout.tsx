import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Work" },
  { href: "/contact", label: "Contact" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loc] = useLocation();

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2A2A2A] overflow-x-hidden">
      <header className="sticky top-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-sm border-b border-[#2A2A2A]/10">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
          <div className="flex h-16 items-center justify-between">
            <Link
              href={`${BASE}/`}
              className="text-xl font-['Playfair_Display'] font-bold tracking-tight hover:text-[#722F37] transition-colors"
            >
              AM.
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = loc === link.href || loc.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.href}
                    href={`${BASE}${link.href}`}
                    className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                      isActive ? "text-[#722F37]" : "text-[#5C5C5C] hover:text-[#2A2A2A]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <button
              className="md:hidden text-[#5C5C5C] hover:text-[#2A2A2A] transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-[#2A2A2A]/10 bg-[#FDFBF7]">
            <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col gap-5">
              {navLinks.map((link) => {
                const isActive = loc === link.href;
                return (
                  <Link
                    key={link.href}
                    href={`${BASE}${link.href}`}
                    onClick={() => setMenuOpen(false)}
                    className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                      isActive ? "text-[#722F37]" : "text-[#5C5C5C] hover:text-[#2A2A2A]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      <main>{children}</main>

      <footer className="border-t border-[#2A2A2A]/10 mt-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-[#5C5C5C]">
            &copy; {new Date().getFullYear()} Alex Morgan. All rights reserved.
          </p>
          <div className="flex gap-5 items-center">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-[#5C5C5C] hover:text-[#722F37] transition-colors">
              <Github size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[#5C5C5C] hover:text-[#722F37] transition-colors">
              <Linkedin size={18} />
            </a>
            <a href="mailto:hello@alexmorgan.dev" aria-label="Email" className="text-[#5C5C5C] hover:text-[#722F37] transition-colors">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
