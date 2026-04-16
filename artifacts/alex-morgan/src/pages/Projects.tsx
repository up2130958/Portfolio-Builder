import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    id: 1,
    num: "01",
    tag: "Infrastructure",
    title: "KubeFlow Core",
    desc: "A declarative infrastructure platform that abstracted Kubernetes complexity for a team of 200+ product engineers, reducing deployment times by 40% and infrastructure-related incidents by half.",
    tags: ["Go", "Kubernetes", "Terraform", "Helm"],
    github: "https://github.com",
    live: null,
    featured: true,
  },
  {
    id: 2,
    num: "02",
    tag: "Data Systems",
    title: "StreamWeaver",
    desc: "An open-source real-time event processing engine built in Rust. Capable of handling millions of events per second with sub-millisecond latency, designed specifically for financial tech applications.",
    tags: ["Rust", "Kafka", "gRPC", "Protocol Buffers"],
    github: "https://github.com",
    live: "https://example.com",
    featured: true,
  },
  {
    id: 3,
    num: "03",
    tag: "Developer Tooling",
    title: "deployctl",
    desc: "A CLI tool for managing multi-cloud deployments. Supports AWS, GCP, and Azure with a unified configuration format. 2,000+ stars on GitHub.",
    tags: ["Go", "AWS SDK", "GCP SDK", "YAML"],
    github: "https://github.com",
    live: null,
    featured: false,
  },
  {
    id: 4,
    num: "04",
    tag: "Open Source",
    title: "pg-migrate-safe",
    desc: "A PostgreSQL migration tool that performs zero-downtime schema changes by automatically detecting and rewriting potentially dangerous migrations.",
    tags: ["Node.js", "TypeScript", "PostgreSQL"],
    github: "https://github.com",
    live: null,
    featured: false,
  },
  {
    id: 5,
    num: "05",
    tag: "Observability",
    title: "TraceForge",
    desc: "Distributed tracing aggregator that correlates spans across polyglot microservices, providing engineers with a single unified view of request flows.",
    tags: ["Go", "OpenTelemetry", "ClickHouse", "React"],
    github: "https://github.com",
    live: "https://example.com",
    featured: false,
  },
  {
    id: 6,
    num: "06",
    tag: "Security",
    title: "SecretScan",
    desc: "Static analysis tool that scans codebases for leaked secrets, API keys, and credentials. Integrates as a pre-commit hook or CI pipeline step.",
    tags: ["Python", "Regex", "Git Hooks", "GitHub Actions"],
    github: "https://github.com",
    live: null,
    featured: false,
  },
];

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto py-20">
      {/* Header */}
      <div className="border-b border-[#2A2A2A]/10 pb-16 mb-16">
        <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#5C5C5C] mb-3">Selected Work</p>
        <div className="w-12 h-px bg-[#722F37] mb-8" />
        <h1 className="text-5xl md:text-7xl font-['Playfair_Display'] font-black leading-tight">
          The <span className="italic font-normal text-[#722F37]">Archive.</span>
        </h1>
        <p className="text-[#5C5C5C] font-['Merriweather'] mt-6 max-w-xl leading-relaxed">
          A collection of systems, tools, and experiments — open-source projects, infrastructure work, and side experiments built over the years.
        </p>
      </div>

      {/* Featured */}
      {featured.length > 0 && (
        <div className="mb-20">
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#5C5C5C] mb-8">Featured</p>
          <div className="divide-y divide-[#2A2A2A]/10">
            {featured.map((p) => <ProjectRow key={p.id} project={p} large />)}
          </div>
        </div>
      )}

      {/* Other */}
      {others.length > 0 && (
        <div>
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#5C5C5C] mb-8">Other Projects</p>
          <div className="divide-y divide-[#2A2A2A]/10">
            {others.map((p) => <ProjectRow key={p.id} project={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectRow({ project, large = false }: { project: (typeof projects)[number]; large?: boolean }) {
  return (
    <div className="group py-8 flex flex-col md:flex-row md:items-start gap-6 hover:bg-[#722F37]/[0.02] transition-colors -mx-4 px-4">
      <div className="md:w-10 shrink-0 mt-1">
        <span className="text-xs font-bold uppercase tracking-widest text-[#722F37]">{project.num}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-1">
          <h3 className={`font-['Playfair_Display'] font-bold ${large ? "text-3xl" : "text-2xl"}`}>
            {project.title}
          </h3>
          <div className="flex gap-3 shrink-0 mt-1">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-[#5C5C5C] hover:text-[#722F37] transition-colors">
                <Github size={16} />
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label="Live" className="text-[#5C5C5C] hover:text-[#722F37] transition-colors">
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
        <p className="text-[#722F37] text-xs font-bold uppercase tracking-widest mb-2">{project.tag}</p>
        <p className="text-[#5C5C5C] text-sm leading-relaxed font-['Merriweather'] mb-4 max-w-2xl">{project.desc}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="text-xs font-bold uppercase tracking-widest border border-[#2A2A2A]/20 text-[#2A2A2A] px-2 py-0.5">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
