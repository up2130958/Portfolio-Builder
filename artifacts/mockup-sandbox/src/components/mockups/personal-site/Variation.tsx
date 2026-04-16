import React, { useEffect, useState } from "react";
import { ArrowRight, Github, Linkedin, Mail, Twitter, ChevronRight, Terminal, Cloud, Database } from "lucide-react";

export function Variation() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2A2A2A] font-['Lato'] selection:bg-[#722F37] selection:text-white pb-24 overflow-x-hidden">
      {/* Navigation */}
      <nav className="flex justify-between items-center py-8 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="text-xl font-['Playfair_Display'] font-bold tracking-tight">AM.</div>
        <div className="flex gap-6 text-sm uppercase tracking-widest font-semibold text-[#5C5C5C]">
          <a href="#about" className="hover:text-[#722F37] transition-colors">About</a>
          <a href="#work" className="hover:text-[#722F37] transition-colors">Work</a>
          <a href="#contact" className="hover:text-[#722F37] transition-colors">Contact</a>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto pt-12 md:pt-24 pb-20 md:pb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center border-b border-[#2A2A2A]/10">
          <div className="lg:col-span-7 z-10">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-['Playfair_Display'] font-black leading-[0.9] tracking-tighter mb-8">
              The Art of <br />
              <span className="text-[#722F37] italic font-normal">Scale.</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#5C5C5C] font-['Merriweather'] leading-relaxed max-w-2xl">
              Alex Morgan is a San Francisco-based software engineer designing the invisible infrastructure that powers modern applications.
            </p>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="aspect-[3/4] w-full max-w-md mx-auto relative group">
              <div className="absolute inset-0 bg-[#722F37] translate-x-4 translate-y-4 transition-transform group-hover:translate-x-2 group-hover:translate-y-2 mix-blend-multiply opacity-20"></div>
              <img 
                src="/__mockup/images/alex-portrait.png" 
                alt="Alex Morgan Portrait" 
                className="w-full h-full object-cover relative z-10 grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
              />
            </div>
          </div>
        </section>

        {/* The Feature (About & Skills) */}
        <section id="about" className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto py-24 border-b border-[#2A2A2A]/10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-[#5C5C5C] mb-4">The Profile</h2>
              <div className="w-12 h-[1px] bg-[#722F37] mb-8"></div>
              <p className="font-['Playfair_Display'] text-3xl italic leading-snug text-[#722F37]">
                "Engineering isn't just about making things work; it's about making things understandable, resilient, and deeply human."
              </p>
            </div>
            <div className="md:col-span-8 md:pl-12 lg:pl-24">
              <div className="columns-1 md:columns-2 gap-8 text-base md:text-lg leading-relaxed text-[#2A2A2A] font-['Merriweather']">
                <p className="mb-6">
                  <span className="float-left text-7xl leading-none font-['Playfair_Display'] font-bold text-[#722F37] mr-3 mt-1">F</span>or over six years, Alex has been at the bleeding edge of distributed systems. Cutting their teeth at companies like Acme Corp and Widgets Inc., the focus has always been singular: build robust, cloud-native architectures that developers actually want to use.
                </p>
                <p className="mb-6">
                  The complexity of modern Kubernetes clusters or real-time analytics pipelines is staggering. Yet, Alex's philosophy remains rooted in simplicity. A good tool should disappear into the background, empowering the creator rather than fighting them.
                </p>
                <p>
                  When not knee-deep in Go or Rust building the next open-source CLI, Alex is usually exploring the coffee scene in SF or mentoring early-career engineers on the nuances of system design.
                </p>
              </div>

              <div className="mt-20">
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#5C5C5C] mb-8">Areas of Expertise</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  <div className="border-t border-[#2A2A2A]/20 pt-4">
                    <Cloud className="w-6 h-6 text-[#722F37] mb-4" />
                    <h4 className="font-['Playfair_Display'] font-bold text-xl mb-2">Cloud-Native</h4>
                    <p className="text-sm text-[#5C5C5C] leading-relaxed">Kubernetes, Terraform, AWS, Docker. Orchestrating chaos into reliable platforms.</p>
                  </div>
                  <div className="border-t border-[#2A2A2A]/20 pt-4">
                    <Database className="w-6 h-6 text-[#722F37] mb-4" />
                    <h4 className="font-['Playfair_Display'] font-bold text-xl mb-2">Distributed Data</h4>
                    <p className="text-sm text-[#5C5C5C] leading-relaxed">Kafka, Redis, PostgreSQL. Designing pipelines that handle scale without breaking a sweat.</p>
                  </div>
                  <div className="border-t border-[#2A2A2A]/20 pt-4">
                    <Terminal className="w-6 h-6 text-[#722F37] mb-4" />
                    <h4 className="font-['Playfair_Display'] font-bold text-xl mb-2">Developer Tooling</h4>
                    <p className="text-sm text-[#5C5C5C] leading-relaxed">Go, Rust, Node.js. Crafting CLIs and internal tools with obsession for DX.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Selected Work */}
        <section id="work" className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto py-24 border-b border-[#2A2A2A]/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-[#5C5C5C] mb-4">Selected Work</h2>
              <h3 className="text-5xl md:text-6xl font-['Playfair_Display'] font-bold">The Archive.</h3>
            </div>
            <a href="#" className="hidden md:inline-flex items-center gap-2 text-sm uppercase tracking-widest font-bold text-[#722F37] hover:gap-4 transition-all mt-6 md:mt-0">
              View Github <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="space-y-32">
            {/* Project 1 */}
            <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group">
              <div className="lg:col-span-7 overflow-hidden bg-white">
                <img 
                  src="/__mockup/images/project-cloud.png" 
                  alt="KubeSphere Platform" 
                  className="w-full aspect-[16/9] object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="lg:col-span-4 lg:col-start-9 flex flex-col justify-center">
                <span className="text-[#722F37] font-bold text-sm tracking-widest uppercase mb-4">01 — Infrastructure</span>
                <h4 className="text-4xl font-['Playfair_Display'] font-bold mb-6">KubeFlow Core</h4>
                <p className="text-[#5C5C5C] leading-relaxed mb-8 font-['Merriweather']">
                  A declarative infrastructure platform that abstracted Kubernetes complexity for a team of 200+ product engineers, reducing deployment times by 40% and infrastructure-related incidents by half.
                </p>
                <div className="flex gap-4 text-xs font-bold tracking-widest uppercase text-[#2A2A2A]">
                  <span>Go</span>
                  <span>Kubernetes</span>
                  <span>Terraform</span>
                </div>
              </div>
            </article>

            {/* Project 2 */}
            <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group">
              <div className="lg:col-span-7 lg:col-start-6 overflow-hidden bg-white lg:order-2">
                <img 
                  src="/__mockup/images/project-data.png" 
                  alt="Data Pipeline" 
                  className="w-full aspect-[16/9] object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="lg:col-span-4 lg:col-start-1 flex flex-col justify-center lg:order-1">
                <span className="text-[#722F37] font-bold text-sm tracking-widest uppercase mb-4">02 — Data Systems</span>
                <h4 className="text-4xl font-['Playfair_Display'] font-bold mb-6">StreamWeaver</h4>
                <p className="text-[#5C5C5C] leading-relaxed mb-8 font-['Merriweather']">
                  An open-source real-time event processing engine built in Rust. Capable of handling millions of events per second with sub-millisecond latency, designed specifically for financial tech applications.
                </p>
                <div className="flex gap-4 text-xs font-bold tracking-widest uppercase text-[#2A2A2A]">
                  <span>Rust</span>
                  <span>Kafka</span>
                  <span>gRPC</span>
                </div>
              </div>
            </article>
          </div>
          
          <a href="#" className="inline-flex md:hidden items-center gap-2 text-sm uppercase tracking-widest font-bold text-[#722F37] mt-16">
            View Github <ArrowRight className="w-4 h-4" />
          </a>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto py-32 text-center">
          <h2 className="text-5xl md:text-7xl font-['Playfair_Display'] font-bold mb-8">
            Let's build something <br className="hidden md:block"/>
            <span className="italic text-[#722F37] font-normal">meaningful.</span>
          </h2>
          <p className="text-xl text-[#5C5C5C] font-['Merriweather'] mb-12 max-w-xl mx-auto leading-relaxed">
            Currently accepting new opportunities for Fall 2024. Whether it's a massive system redesign or just grabbing coffee in the Mission, my inbox is open.
          </p>
          <a 
            href="mailto:hello@alexmorgan.dev" 
            className="inline-flex items-center gap-3 bg-[#2A2A2A] text-[#FDFBF7] px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-[#722F37] transition-colors duration-300"
          >
            <Mail className="w-4 h-4" /> Get in Touch
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto py-12 border-t border-[#2A2A2A]/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-[#5C5C5C]">
        <p>&copy; {new Date().getFullYear()} Alex Morgan. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#722F37] transition-colors"><Github className="w-5 h-5" /></a>
          <a href="#" className="hover:text-[#722F37] transition-colors"><Linkedin className="w-5 h-5" /></a>
          <a href="#" className="hover:text-[#722F37] transition-colors"><Twitter className="w-5 h-5" /></a>
        </div>
      </footer>
    </div>
  );
}
