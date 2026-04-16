import { Outlet, NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";

const navLinks = [
  { to: "/about", label: "About" },
  { to: "/projects", label: "Work" },
  { to: "/contact", label: "Contact" },
];

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2A2A2A] font-['Lato'] overflow-x-hidden">
      <header className="sticky top-0 z-50 bg-[#FDFBF7]/95 backdrop-blur border-b border-[#2A2A2A]/10">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
          <div className="flex h-16 items-center justify-between">
            <Link
              to="/"
              className="text-xl font-['Playfair_Display'] font-bold tracking-tight text-[#2A2A2A] hover:text-[#722F37] transition-colors"
            >
              AM.
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `text-xs font-bold uppercase tracking-widest transition-colors ${
                      isActive
                        ? "text-[#722F37]"
                        : "text-[#5C5C5C] hover:text-[#2A2A2A]"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
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
            <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-xs font-bold uppercase tracking-widest transition-colors ${
                      isActive ? "text-[#722F37]" : "text-[#5C5C5C] hover:text-[#2A2A2A]"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-[#2A2A2A]/10 mt-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-[#5C5C5C]">
            &copy; {new Date().getFullYear()} Alex Morgan. All rights reserved.
          </p>
          <div className="flex gap-5">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[#5C5C5C] hover:text-[#722F37] transition-colors"><Github size={18} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#5C5C5C] hover:text-[#722F37] transition-colors"><Linkedin size={18} /></a>
            <a href="mailto:alex@example.com" className="text-[#5C5C5C] hover:text-[#722F37] transition-colors"><Mail size={18} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
