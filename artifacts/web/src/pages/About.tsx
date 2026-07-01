const experience = [
  {
    role: "AI Systems Analyst",
    company: "Bell-Integration",
    period: "2024 — Present",
    description:
      "Platform support engineer on the AI and Data team. Redesigned the core data pipeline to handle 5x traffic growth, improved p99 latency by 60%, and mentored a team of 4 engineers.",
    tags: ["Go", "Kubernetes", "PostgreSQL", "Redis"],
  },
  {
    role: "Software Engineer",
    company: "Widgets Inc",
    period: "2020 — 2022",
    description:
      "Built and shipped real-time features for a SaaS analytics product used by 10k+ businesses. Led the migration from a monolith to microservices.",
    tags: ["Node.js", "TypeScript", "React", "AWS"],
  },
  {
    role: "Junior Software Engineer",
    company: "StartupXYZ",
    period: "2018 — 2020",
    description:
      "Full-stack development for an early-stage fintech startup. Implemented payment processing integrations and built out the customer-facing dashboard.",
    tags: ["Python", "Django", "React", "PostgreSQL"],
  },
];

export default function About() {
  return (
    <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto py-20">
      {/* Header */}
      <div className="border-b border-[#2A2A2A]/10 pb-16 mb-16">
        <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#5C5C5C] mb-4">The Profile</p>
        <div className="w-12 h-px bg-[#722F37] mb-10" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <h1 className="text-5xl md:text-7xl font-['Playfair_Display'] font-black leading-tight mb-6">
              About <span className="italic font-normal text-[#722F37]">Alex.</span>
            </h1>
            <p className="font-['Playfair_Display'] text-2xl italic leading-snug text-[#722F37] border-l-2 border-[#722F37] pl-5">
              "Engineering isn't just about making things work — it's about making things understandable, resilient, and deeply human."
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="space-y-5 text-base md:text-lg leading-relaxed text-[#2A2A2A] font-['Merriweather']">
              <p>
                <span className="float-left text-6xl leading-none font-['Playfair_Display'] font-bold text-[#722F37] mr-3 mt-1">F</span>or over six years, I've been at the bleeding edge of distributed systems. Cutting my teeth at companies like Acme Corp and Widgets Inc., the focus has always been singular: build robust, cloud-native architectures that developers actually want to use.
              </p>
              <p>
                The complexity of modern Kubernetes clusters or real-time analytics pipelines is staggering. Yet my philosophy remains rooted in simplicity — a good tool should disappear into the background, empowering the creator rather than fighting them.
              </p>
              <p>
                When not knee-deep in Go or Rust building the next open-source CLI, I'm usually exploring the coffee scene in SF or mentoring early-career engineers on the nuances of system design.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Experience */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#5C5C5C] mb-8">Experience</p>
          <div className="space-y-10">
            {experience.map((job) => (
              <div key={job.company} className="relative pl-5 border-l border-[#722F37]/30">
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-[#722F37]" />
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-['Playfair_Display'] font-bold text-xl text-[#2A2A2A]">{job.role}</h3>
                    <p className="text-[#722F37] font-bold text-sm">{job.company}</p>
                  </div>
                  <span className="text-[#5C5C5C] text-xs font-bold uppercase tracking-widest">{job.period}</span>
                </div>
                <p className="text-[#5C5C5C] text-sm leading-relaxed mb-3 font-['Merriweather']">{job.description}</p>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <span key={tag} className="text-xs font-bold uppercase tracking-widest text-[#2A2A2A] border border-[#2A2A2A]/20 px-2 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="border-t border-[#2A2A2A]/20 pt-6">
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#5C5C5C] mb-4">Education</p>
            <h3 className="font-['Playfair_Display'] font-bold text-lg text-[#2A2A2A] mb-1">B.S. Computer Science</h3>
            <p className="text-[#722F37] font-bold text-sm">State University</p>
            <p className="text-[#5C5C5C] text-xs uppercase tracking-widest font-bold mt-1">2014 — 2018</p>
          </div>

          <div className="border-t border-[#2A2A2A]/20 pt-6">
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#5C5C5C] mb-5">Core Technologies</p>
            {[
              { cat: "Languages", items: ["Go", "TypeScript", "Python", "Rust"] },
              { cat: "Databases", items: ["PostgreSQL", "Redis", "ClickHouse"] },
              { cat: "Cloud", items: ["AWS", "GCP", "Kubernetes", "Terraform"] },
              { cat: "Tools", items: ["Docker", "gRPC", "Kafka", "Git"] },
            ].map((group) => (
              <div key={group.cat} className="mb-4">
                <p className="text-[#5C5C5C] text-xs uppercase tracking-widest font-bold mb-2">{group.cat}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="text-xs font-bold uppercase tracking-widest border border-[#2A2A2A]/20 px-2 py-0.5 text-[#2A2A2A]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-[#2A2A2A]/20 pt-6">
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#5C5C5C] mb-2">Location</p>
            <p className="text-[#2A2A2A] font-['Playfair_Display'] font-bold text-lg">San Francisco, CA</p>
            <p className="text-[#5C5C5C] text-xs mt-1">Open to remote opportunities</p>
          </div>
        </div>
      </div>
    </div>
  );
}
