import { Link } from "wouter";
import { ArrowRight, Cloud, Database, Terminal } from "lucide-react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const expertise = [
  {
    icon: Cloud,
    title: "Cloud-Native",
    desc: "Kubernetes, Terraform, AWS, Docker. Orchestrating chaos into reliable platforms that scale without drama.",
  },
  {
    icon: Database,
    title: "Distributed Data",
    desc: "Kafka, Redis, PostgreSQL. Designing pipelines that handle massive scale without breaking a sweat.",
  },
  {
    icon: Terminal,
    title: "Developer Tooling",
    desc: "Go, Rust, Node.js. Crafting CLIs and internal tools with obsessive attention to developer experience.",
  },
];

const featuredProjects = [
  {
    num: "01",
    tag: "Infrastructure",
    title: "KubeFlow Core",
    desc: "A declarative infrastructure platform that abstracted Kubernetes complexity for 200+ product engineers, reducing deployment times by 40% and infrastructure-related incidents by half.",
    tags: ["Go", "Kubernetes", "Terraform"],
    img: "/alex-morgan/project-cloud.png",
    side: "left",
  },
  {
    num: "02",
    tag: "Data Systems",
    title: "StreamWeaver",
    desc: "An open-source real-time event processing engine built in Rust. Capable of handling millions of events per second with sub-millisecond latency.",
    tags: ["Rust", "Kafka", "gRPC"],
    img: "/alex-morgan/project-data.png",
    side: "right",
  },
];

export default function Home() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto pt-12 md:pt-24 pb-20 md:pb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center border-b border-[#2A2A2A]/10">
        <div className="lg:col-span-7 z-10">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-['Playfair_Display'] font-black leading-[0.9] tracking-tighter mb-8">
            The Art of <br />
            <span className="text-[#722F37] italic font-normal">Scale.</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#5C5C5C] font-['Merriweather'] leading-relaxed max-w-2xl mb-10">
            Alex Morgan is a San Francisco-based software engineer designing the invisible infrastructure that powers modern applications.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={`${BASE}/projects`}
              className="inline-flex items-center gap-2 bg-[#2A2A2A] text-[#FDFBF7] px-7 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-[#722F37] transition-colors duration-300"
            >
              View Work <ArrowRight size={14} />
            </Link>
            <Link
              href={`${BASE}/contact`}
              className="inline-flex items-center gap-2 border border-[#2A2A2A]/30 text-[#2A2A2A] px-7 py-3.5 text-xs font-bold uppercase tracking-widest hover:border-[#722F37] hover:text-[#722F37] transition-colors duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="aspect-[3/4] w-full max-w-md mx-auto relative group">
            <div className="absolute inset-0 bg-[#722F37] translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2 mix-blend-multiply opacity-20" />
            <img
              src="/alex-morgan/alex-portrait.png"
              alt="Alex Morgan"
              className="w-full h-full object-cover relative z-10 grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
            />
          </div>
        </div>
      </section>

      {/* ── Expertise ── */}
      <section className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto py-24 border-b border-[#2A2A2A]/10">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#5C5C5C] mb-3">Areas of Expertise</p>
          <div className="w-12 h-px bg-[#722F37]" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {expertise.map((item) => (
            <div key={item.title} className="border-t border-[#2A2A2A]/20 pt-6">
              <item.icon className="w-6 h-6 text-[#722F37] mb-4" />
              <h3 className="font-['Playfair_Display'] font-bold text-xl mb-2">{item.title}</h3>
              <p className="text-sm text-[#5C5C5C] leading-relaxed font-['Merriweather']">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Work ── */}
      <section className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto py-24 border-b border-[#2A2A2A]/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#5C5C5C] mb-3">Selected Work</p>
            <h2 className="text-5xl md:text-6xl font-['Playfair_Display'] font-bold">The Archive.</h2>
          </div>
          <Link
            href={`${BASE}/projects`}
            className="hidden md:inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#722F37] hover:gap-4 transition-all mt-6 md:mt-0"
          >
            All Projects <ArrowRight size={14} />
          </Link>
        </div>

        <div className="space-y-32">
          {featuredProjects.map((project) => (
            <article
              key={project.title}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group"
            >
              <div
                className={`${
                  project.side === "right"
                    ? "lg:col-span-7 lg:col-start-6 lg:order-2"
                    : "lg:col-span-7"
                } overflow-hidden bg-[#F0EDE8]`}
              >
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full aspect-[16/9] object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div
                className={`${
                  project.side === "right"
                    ? "lg:col-span-4 lg:col-start-1 lg:order-1"
                    : "lg:col-span-4 lg:col-start-9"
                } flex flex-col justify-center`}
              >
                <span className="text-[#722F37] font-bold text-xs tracking-widest uppercase mb-4">
                  {project.num} — {project.tag}
                </span>
                <h3 className="text-4xl font-['Playfair_Display'] font-bold mb-5">{project.title}</h3>
                <p className="text-[#5C5C5C] leading-relaxed mb-8 font-['Merriweather'] text-sm">{project.desc}</p>
                <div className="flex gap-4 text-xs font-bold uppercase tracking-widest text-[#2A2A2A]">
                  {project.tags.map((t) => <span key={t}>{t}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>

        <Link
          href={`${BASE}/projects`}
          className="inline-flex md:hidden items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#722F37] mt-16"
        >
          All Projects <ArrowRight size={14} />
        </Link>
      </section>

      {/* ── Contact CTA ── */}
      <section className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto py-32 text-center">
        <h2 className="text-5xl md:text-7xl font-['Playfair_Display'] font-bold mb-8">
          Let's build something <br className="hidden md:block" />
          <span className="italic text-[#722F37] font-normal">meaningful.</span>
        </h2>
        <p className="text-xl text-[#5C5C5C] font-['Merriweather'] mb-12 max-w-xl mx-auto leading-relaxed">
          Currently accepting new opportunities for Fall 2024. Whether it's a massive system redesign or just grabbing coffee in the Mission, my inbox is open.
        </p>
        <Link
          href={`${BASE}/contact`}
          className="inline-flex items-center gap-3 bg-[#2A2A2A] text-[#FDFBF7] px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#722F37] transition-colors duration-300"
        >
          Get in Touch
        </Link>
      </section>
    </div>
  );
}
