import { Link } from "react-router-dom";
import { ArrowRight, Code2, Server, Cpu, ExternalLink } from "lucide-react";

const skills = [
  { icon: <Server size={20} />, title: "Backend Engineering", items: ["Go", "Node.js", "Python", "PostgreSQL", "Redis"] },
  { icon: <Code2 size={20} />, title: "Frontend Development", items: ["React", "TypeScript", "Vite", "Tailwind CSS"] },
  { icon: <Cpu size={20} />, title: "Infrastructure", items: ["Kubernetes", "Docker", "Terraform", "AWS", "CI/CD"] },
];

export default function Home() {
  return (
    <div>
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="max-w-3xl">
          <p className="font-mono text-teal-400 text-sm mb-4 tracking-wide">Hi, my name is</p>
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-100 mb-3 leading-tight">
            Alex Morgan.
          </h1>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-400 mb-6 leading-tight">
            I build things for the internet.
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mb-10">
            Software engineer specializing in distributed systems, cloud-native architecture,
            and developer tooling. I enjoy solving hard infrastructure problems and shipping
            software that scales to millions of users.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              View my work <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-teal-600 text-teal-400 hover:bg-teal-600/10 font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800 bg-slate-900/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-slate-300 text-2xl font-bold mb-10">Technical expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <div key={skill.title} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-teal-800 transition-colors">
                <div className="text-teal-400 mb-3">{skill.icon}</div>
                <h3 className="text-slate-100 font-semibold mb-3">{skill.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span key={item} className="text-xs font-mono bg-slate-800 text-slate-400 px-2 py-1 rounded">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-slate-300 text-2xl font-bold">Featured work</h2>
          <Link to="/projects" className="inline-flex items-center gap-1 text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors">
            All projects <ExternalLink size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Cloud-Native Microservices",
              desc: "Production-grade microservices on Kubernetes handling 10M+ daily requests.",
              tags: ["Go", "Kubernetes", "PostgreSQL"],
            },
            {
              title: "Real-Time Analytics",
              desc: "Data pipeline ingesting 500k events/min from IoT devices with sub-second latency.",
              tags: ["Kafka", "ClickHouse", "React"],
            },
          ].map((p) => (
            <div key={p.title} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-teal-800 transition-colors">
              <h3 className="text-slate-100 font-semibold text-lg mb-2">{p.title}</h3>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">{p.desc}</p>
              <div className="flex gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs font-mono bg-slate-800 text-teal-400 px-2 py-1 rounded">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
