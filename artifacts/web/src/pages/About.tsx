const experience = [
  {
    role: "Senior Software Engineer",
    company: "Acme Corp",
    period: "2022 — Present",
    description:
      "Lead engineer on the platform team. Redesigned the core data pipeline to handle 5x traffic growth, improved p99 latency by 60%, and mentored a team of 4 engineers.",
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
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold text-slate-100 mb-6">About me</h1>
          <div className="space-y-4 text-slate-400 leading-relaxed">
            <p>
              I'm a software engineer with 6+ years of experience building scalable backend systems,
              cloud infrastructure, and developer tools. I care deeply about code quality,
              operational excellence, and building systems that are maintainable over time.
            </p>
            <p>
              I got started in engineering by contributing to open-source projects during university.
              That experience instilled in me a deep appreciation for clean interfaces, thoughtful
              documentation, and the collaborative nature of software development.
            </p>
            <p>
              Outside of work, I contribute to open-source, write about distributed systems on my blog,
              and occasionally speak at local meetups. When I'm not at a keyboard, you'll find me hiking,
              reading, or experimenting with home coffee roasting.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-slate-100 text-2xl font-bold mb-8">Experience</h2>
            <div className="space-y-8">
              {experience.map((job) => (
                <div key={job.company} className="relative pl-6 border-l border-slate-800">
                  <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-teal-600" />
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-slate-100 font-semibold">{job.role}</h3>
                      <p className="text-teal-400 text-sm">{job.company}</p>
                    </div>
                    <span className="text-slate-500 text-sm font-mono">{job.period}</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-3">{job.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <span key={tag} className="text-xs font-mono bg-slate-800 text-slate-400 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-slate-100 font-semibold mb-4">Education</h3>
            <div>
              <p className="text-slate-300 font-medium">B.S. Computer Science</p>
              <p className="text-teal-400 text-sm">State University</p>
              <p className="text-slate-500 text-sm font-mono">2014 — 2018</p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-slate-100 font-semibold mb-4">Languages & Tools</h3>
            <div className="space-y-3">
              {[
                { cat: "Languages", items: ["Go", "TypeScript", "Python", "Rust"] },
                { cat: "Databases", items: ["PostgreSQL", "Redis", "ClickHouse"] },
                { cat: "Cloud", items: ["AWS", "GCP", "Kubernetes", "Terraform"] },
                { cat: "Other", items: ["Docker", "gRPC", "Kafka", "Git"] },
              ].map((group) => (
                <div key={group.cat}>
                  <p className="text-slate-500 text-xs uppercase tracking-wide mb-1.5">{group.cat}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span key={item} className="text-xs font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-slate-100 font-semibold mb-3">Location</h3>
            <p className="text-slate-400 text-sm">San Francisco, CA</p>
            <p className="text-slate-500 text-xs mt-1">Open to remote work</p>
          </div>
        </div>
      </div>
    </div>
  );
}
