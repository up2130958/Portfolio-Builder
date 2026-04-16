import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function NotFound() {
  return (
    <div className="px-6 max-w-7xl mx-auto py-40 text-center">
      <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#5C5C5C] mb-4">404</p>
      <div className="w-12 h-px bg-[#722F37] mx-auto mb-8" />
      <h1 className="text-5xl md:text-7xl font-['Playfair_Display'] font-black mb-6">
        Page not <span className="italic font-normal text-[#722F37]">found.</span>
      </h1>
      <p className="text-[#5C5C5C] font-['Merriweather'] mb-10">
        This page doesn't exist or has been moved.
      </p>
      <Link
        href={`${BASE}/`}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#722F37] hover:gap-4 transition-all"
      >
        <ArrowLeft size={14} /> Back to Home
      </Link>
    </div>
  );
}
