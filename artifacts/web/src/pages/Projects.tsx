import { useQuery } from "@tanstack/react-query";
import { Github, ExternalLink } from "lucide-react";

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
    <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto py-20">
      {/* Header */}
      <div className="border-b border-[#2A2A2A]/10 pb-16 mb-16">
        <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#5C5C5C] mb-3">Selected Work</p>
        <div className="w-12 h-px bg-[#722F37] mb-8" />
        <h1 className="text-5xl md:text-7xl font-['Playfair_Display'] font-black leading-tight">
          The <span className="italic font-normal text-[#722F37]">Archive.</span>
        </h1>
        <p className="text-[#5C5C5C] font-['Merriweather'] mt-6 max-w-xl leading-relaxed">
          A collection of systems, tools, and experiments — open-source projects, infrastructure work, and side experiments.
        </p>
      </div>

      {isLoading && (
        <div className="space-y-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border-t border-[#2A2A2A]/10 pt-8 animate-pulse">
              <div className="h-4 bg-[#2A2A2A]/10 rounded w-1/4 mb-4" />
              <div className="h-8 bg-[#2A2A2A]/10 rounded w-1/2 mb-3" />
              <div className="h-3 bg-[#2A2A2A]/8 rounded w-3/4" />
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="border border-[#722F37]/30 bg-[#722F37]/5 p-6 text-[#722F37] text-sm font-['Merriweather']">
          Failed to load projects. Please try again later.
        </div>
      )}

      {projects && (
        <div>
          {projects.filter((p) => p.featured).length > 0 && (
            <div className="mb-20">
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#5C5C5C] mb-8">Featured</p>
              <div className="divide-y divide-[#2A2A2A]/10">
                {projects.filter((p) => p.featured).map((project, idx) => (
                  <ProjectRow key={project.id} project={project} index={idx + 1} large />
                ))}
              </div>
            </div>
          )}

          {projects.filter((p) => !p.featured).length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#5C5C5C] mb-8">Other Projects</p>
              <div className="divide-y divide-[#2A2A2A]/10">
                {projects.filter((p) => !p.featured).map((project, idx) => (
                  <ProjectRow key={project.id} project={project} index={idx + 1} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ProjectRow({ project, index, large = false }: { project: Project; index: number; large?: boolean }) {
  return (
    <div className={`group py-8 flex flex-col md:flex-row md:items-start gap-6 hover:bg-[#722F37]/3 transition-colors -mx-6 px-6`}>
      <div className="md:w-12 shrink-0">
        <span className="text-xs font-bold uppercase tracking-widest text-[#722F37]">
          {String(index).padStart(2, "0")}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className={`font-['Playfair_Display'] font-bold text-[#2A2A2A] ${large ? "text-3xl" : "text-2xl"}`}>
            {project.title}
          </h3>
          <div className="flex gap-3 shrink-0 mt-1">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[#5C5C5C] hover:text-[#722F37] transition-colors" aria-label="GitHub">
                <Github size={16} />
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[#5C5C5C] hover:text-[#722F37] transition-colors" aria-label="Live demo">
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
        <p className="text-[#5C5C5C] text-sm leading-relaxed font-['Merriweather'] mb-4 max-w-2xl">{project.description}</p>
        <div className="flex flex-wrap gap-3">
          {project.techStack.map((tech) => (
            <span key={tech} className="text-xs font-bold uppercase tracking-widest border border-[#2A2A2A]/20 text-[#2A2A2A] px-2 py-0.5">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
