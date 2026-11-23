import React, { useState } from "react";
import { ArrowUpRight, ExternalLink, Github, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { projectsData, projectCategories, Project, ProjectCategory } from "../../data/projects";
import { InteractiveSurface } from "../ui/InteractiveSurface";
import { FoundItPreview } from "./FoundItPreview";
import { OralePreview } from "./OralePreview";

interface ProjectGalleryProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All Projects");

  const filteredProjects = projectsData.filter((project) => {
    if (selectedCategory === "All Projects") return true;
    return (
      project.category === selectedCategory ||
      project.secondaryCategories.includes(selectedCategory)
    );
  });

  return (
    <section id="projects" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#171F19] text-[#DCE8DA]">
      {/* Background radial accent */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#243D30]/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#304A39]/80 pb-8"
        >
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono-tech uppercase tracking-widest text-[#71866A]">
              <span>02</span>
              <span className="text-[#304A39]" aria-hidden="true">/</span>
              <span>Selected Works & Case Studies</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-editorial font-medium tracking-tight text-[#F4F1E8] [text-wrap:balance]">
              Functional systems, <br />
              <span className="italic font-normal text-[#DCE8DA]">engineered with intention.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#A6B59D] leading-relaxed">
              Explore full-stack platforms, hardware-synchronized telemetry systems, and modern web applications built across academic research and client collaborations.
            </p>
          </div>

          <div className="text-xs font-mono-tech text-[#A6B59D] flex items-center gap-2 shrink-0">
            <span>Showing {filteredProjects.length} of {projectsData.length} records</span>
          </div>
        </motion.div>

        {/* Category Filter Bar with Sliding Active Pill */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#243D30]/30 border border-[#304A39] rounded-xl overflow-x-auto no-scrollbar">
          {projectCategories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-3.5 py-2 text-xs font-mono-tech uppercase tracking-wider rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive ? "text-[#171F19] font-medium" : "text-[#A6B59D] hover:text-[#F4F1E8]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="project-filter-pill"
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                    className="absolute inset-0 bg-[#71866A] rounded-lg shadow-sm"
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Project Layouts */}
        <div className="space-y-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <InteractiveSurface
                    tiltStrength={2.2}
                    hoverY={-5}
                    glowColor="rgba(113, 134, 106, 0.16)"
                    className="group bg-[#243D30]/25 border border-[#304A39] rounded-3xl p-6 sm:p-8 lg:p-10 hover:border-[#71866A]/80 transition-colors duration-300 shadow-xl"
                  >
                    <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                      
                      {/* Left Column (or Right on Alternate): Text Content */}
                      <div className={`lg:col-span-6 space-y-6 ${!isEven ? "lg:order-2" : "lg:order-1"}`}>
                        
                        {/* Unboxed Meta strip */}
                        <div className="flex items-center gap-2.5 text-xs font-mono-tech text-[#71866A]">
                          <span>CASE {project.number}</span>
                          <span className="text-[#304A39]">·</span>
                          <span className="text-[#A6B59D]">{project.type}</span>
                          <span className="text-[#304A39]">·</span>
                          <span>{project.year}</span>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-2xl sm:text-4xl font-editorial font-semibold text-[#F4F1E8] group-hover:text-[#DCE8DA] transition-colors leading-tight">
                            {project.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-[#71866A] font-mono-tech">
                            {project.tagline}
                          </p>
                        </div>

                        <p className="text-sm text-[#A6B59D] leading-relaxed">
                          {project.overview}
                        </p>

                        {/* Technology Tags with Subtle Hover Lift */}
                        <div className="space-y-2 pt-1">
                          <span className="text-[11px] font-mono-tech uppercase tracking-widest text-[#71866A] block">
                            Technologies Deployed
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, idx) => (
                              <motion.span
                                key={idx}
                                whileHover={{ y: -2, borderColor: "#71866A" }}
                                transition={{ duration: 0.15 }}
                                className="px-2.5 py-1 text-xs font-mono-tech bg-[#171F19] text-[#DCE8DA] rounded border border-[#304A39]/80 cursor-default"
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </div>

                        {/* Action Bar */}
                        <div className="pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
                          <motion.button
                            onClick={() => onSelectProject(project)}
                            whileHover={{ y: -2, scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            className="group/btn flex items-center gap-2 px-5 py-2.5 text-xs font-mono-tech uppercase tracking-wider text-[#171F19] bg-[#71866A] hover:bg-[#DCE8DA] rounded-xl font-medium transition-colors cursor-pointer"
                          >
                            <span>Explore Case Study</span>
                            <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                          </motion.button>

                          {project.demoUrl && (
                            <motion.a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.97 }}
                              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-mono-tech uppercase tracking-wider text-[#F4F1E8] hover:text-[#171F19] bg-[#304A39]/70 hover:bg-[#DCE8DA] border border-[#71866A] rounded-xl transition-colors"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>{project.demoLabel || "Visit Live Site"}</span>
                            </motion.a>
                          )}

                          {project.githubUrl && (
                            <motion.a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.97 }}
                              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-mono-tech uppercase tracking-wider text-[#DCE8DA] hover:text-[#F4F1E8] bg-[#243D30]/60 hover:bg-[#304A39] border border-[#304A39] hover:border-[#71866A] rounded-xl transition-colors"
                            >
                              <Github className="w-3.5 h-3.5 text-[#71866A]" />
                              <span>Repository</span>
                            </motion.a>
                          )}
                        </div>
                      </div>

                      {/* Right Column: Layered Visual Preview */}
                      <div
                        onClick={() => onSelectProject(project)}
                        className={`lg:col-span-6 cursor-pointer ${!isEven ? "lg:order-1" : "lg:order-2"}`}
                      >
                        {project.previewKind === "dual-node" ? (
                          <div className="rounded-2xl overflow-hidden border border-[#304A39] bg-[#0B100E] group-hover:border-[#71866A] transition-all shadow-xl flex flex-col">
                            {/* Top: Real QuakeEscape Dashboard */}
                            <div className="bg-[#0B100E] border-b border-[#304A39]/70 p-2">
                              <img
                                src={project.screenshots[1]?.imageUrl || "/assets/aistudio/Screenshot__123__8fc972ea.png"}
                                alt="QuakeEscape Resonance Dashboard"
                                loading="lazy"
                                className="w-full h-auto object-contain rounded-lg"
                              />
                            </div>

                            {/* Middle: Real DOST-PHIVOLCS Earthquake Simulator Field Setup */}
                            <div className="bg-white p-2 sm:p-3 flex items-center justify-center">
                              <img
                                src={project.screenshots[0]?.imageUrl || project.image}
                                alt="DOST-PHIVOLCS Earthquake Simulator Dual-Node Setup"
                                loading="lazy"
                                className="w-full max-h-[260px] object-contain group-hover:scale-[1.02] transition-transform duration-500"
                              />
                            </div>

                            {/* Bottom Non-Overlapping Caption Strip */}
                            <div className="flex items-center justify-between text-xs font-mono-tech text-[#F4F1E8] px-4 py-2.5 bg-[#171F19] border-t border-[#304A39]">
                              <span className="truncate">{project.title}</span>
                              <span className="text-[#71866A] shrink-0 flex items-center gap-1 ml-2">
                                Click to expand{" "}
                                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="relative aspect-video sm:aspect-4/3 lg:aspect-video rounded-2xl overflow-hidden border border-[#304A39] bg-[#171F19] group-hover:border-[#71866A] transition-all shadow-xl">
                            {project.previewKind === "foundit" ? (
                              <div className="w-full h-full">
                                <FoundItPreview variant="compact" demoUrl={project.demoUrl} />
                              </div>
                            ) : project.previewKind === "orale" ? (
                              <div className="w-full h-full">
                                <OralePreview variant="compact" demoUrl={project.demoUrl} />
                              </div>
                            ) : project.image ? (
                              <img
                                src={project.image}
                                alt={project.title}
                                loading="lazy"
                                className="w-full h-full object-cover object-center filter saturate-90 group-hover:scale-105 group-hover:saturate-100 transition-all duration-700"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className="w-full h-full p-5 sm:p-6 pb-16 flex flex-col justify-between bg-gradient-to-br from-[#243D30]/55 via-[#171F19] to-[#171F19] bg-forest-noise">
                                <div className="flex items-center justify-between text-[11px] font-mono-tech uppercase tracking-widest text-[#71866A] border-b border-[#304A39]/70 pb-3">
                                  <span className="flex items-center gap-1.5">
                                    <Cpu className="w-3.5 h-3.5 text-[#71866A]" />
                                    <span>System Architecture</span>
                                  </span>
                                  <span className="text-[#A6B59D]">Prototype Concept</span>
                                </div>
                                <div className="space-y-2.5 my-auto py-3">
                                  {(project.architectureNotes && project.architectureNotes.length > 0
                                    ? project.architectureNotes
                                    : project.highlights.slice(0, 3)
                                  ).map((note, noteIdx) => (
                                    <div
                                      key={noteIdx}
                                      className="p-2.5 rounded-xl bg-[#243D30]/35 border border-[#304A39]/80 text-xs font-mono-tech text-[#DCE8DA] leading-relaxed flex items-baseline gap-2"
                                    >
                                      <span className="text-[#71866A] shrink-0">0{noteIdx + 1}.</span>
                                      <span>{note}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#171F19]/85 via-[#171F19]/30 to-transparent pointer-events-none" />

                            {/* Overlay badge with interactive prompt */}
                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono-tech text-[#F4F1E8] px-3 py-2 bg-[#171F19]/85 backdrop-blur rounded-lg border border-[#304A39] group-hover:-translate-y-1 transition-transform duration-300">
                              <span className="truncate">{project.title}</span>
                              <span className="text-[#71866A] shrink-0 flex items-center gap-1">
                                {project.previewKind === "foundit" || project.previewKind === "orale"
                                  ? "Scroll · Click to expand"
                                  : "Click to expand"}{" "}
                                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                  </InteractiveSurface>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
