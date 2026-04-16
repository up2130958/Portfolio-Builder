import { useQuery } from "@tanstack/react-query";
import { Github, ExternalLink, Star } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  imageUrl: string | null;
  featured: boolean;
  order: number;
  createdAt: string;
}

function useProjects() {
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Failed to load projects");
      return res.json() as Promise<Project[]>;
    },
  });
}

export default function Projects() {
  const { data: projects, isLoading, error } = useProjects();

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-4xl font-bold text-slate-100 mb-3">Projects</h1>
      <p className="text-slate-400 mb-12 max-w-2xl">
        A selection of things I've built — open-source tools, infrastructure projects, and side experiments.
      </p>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-6 animate-pulse">
              <div className="h-5 bg-slate-700 rounded w-2/3 mb-3" />
              <div className="h-3 bg-slate-800 rounded w-full mb-2" />
              <div className="h-3 bg-slate-800 rounded w-4/5" />
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="bg-red-900/20 border border-red-800 rounded-xl p-6 text-red-400 text-sm">
          Failed to load projects. Please try again later.
        </div>
      )}

      {projects && (
        <>
          {projects.filter((p) => p.featured).length > 0 && (
            <div className="mb-12">
              <h2 className="text-slate-300 font-semibold text-sm uppercase tracking-wide mb-6 flex items-center gap-2">
                <Star size={14} className="text-teal-400" /> Featured
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.filter((p) => p.featured).map((project) => (
                  <ProjectCard key={project.id} project={project} featured />
                ))}
              </div>
            </div>
          )}

          {projects.filter((p) => !p.featured).length > 0 && (
            <div>
              <h2 className="text-slate-300 font-semibold text-sm uppercase tracking-wide mb-6">
                Other projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.filter((p) => !p.featured).map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <div
      className={`bg-slate-900 border rounded-xl p-6 hover:border-teal-800 transition-colors flex flex-col ${
        featured ? "border-slate-700" : "border-slate-800"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className={`font-semibold text-slate-100 ${featured ? "text-lg" : ""}`}>{project.title}</h3>
        <div className="flex gap-2 ml-2 shrink-0">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-teal-400 transition-colors" aria-label="GitHub">
              <Github size={16} />
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-teal-400 transition-colors" aria-label="Live demo">
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
      <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span key={tech} className="text-xs font-mono bg-slate-800 text-teal-400 px-2 py-0.5 rounded">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
