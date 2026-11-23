import React, { useEffect, useState } from "react";
import { X, Github, ArrowLeft, ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "../../data/projects";
import { FoundItPreview } from "./FoundItPreview";
import { OralePreview } from "./OralePreview";

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  allProjects: Project[];
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose,
  onSelectProject,
  allProjects,
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "features" | "architecture">("overview");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (!project) return;
      const currentIndex = allProjects.findIndex((p) => p.id === project.id);
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        onSelectProject(allProjects[currentIndex - 1]);
      } else if (e.key === "ArrowRight" && currentIndex < allProjects.length - 1) {
        onSelectProject(allProjects[currentIndex + 1]);
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, project, allProjects, onSelectProject]);

  const currentIndex = project ? allProjects.findIndex((p) => p.id === project.id) : -1;
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex >= 0 && currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  const modalTabs: { id: "overview" | "features" | "architecture"; label: string }[] = [
    { id: "overview", label: "Overview & Scope" },
    { id: "features", label: "Key Features" },
    { id: "architecture", label: "Engineering Highlights" },
  ];

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#171F19] border border-[#304A39] rounded-2xl shadow-2xl overflow-hidden text-[#DCE8DA]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#304A39] bg-[#243D30]/60 backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono-tech uppercase tracking-widest text-[#71866A]">
                  Case Study {project.number}
                </span>
                <span className="text-[#304A39]" aria-hidden="true">/</span>
                <span className="text-xs font-mono-tech text-[#A6B59D]">
                  {project.type}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Prev/Next Navigation Controls */}
                <div className="hidden sm:flex items-center gap-1 border-r border-[#304A39] pr-3 mr-1">
                  <button
                    disabled={!prevProject}
                    onClick={() => prevProject && onSelectProject(prevProject)}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      prevProject
                        ? "text-[#DCE8DA] hover:text-[#F4F1E8] hover:bg-[#304A39]/60"
                        : "text-[#304A39] cursor-not-allowed"
                    }`}
                    title="Previous Case Study"
                    aria-label="Previous project"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    disabled={!nextProject}
                    onClick={() => nextProject && onSelectProject(nextProject)}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      nextProject
                        ? "text-[#DCE8DA] hover:text-[#F4F1E8] hover:bg-[#304A39]/60"
                        : "text-[#304A39] cursor-not-allowed"
                    }`}
                    title="Next Case Study"
                    aria-label="Next project"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={onClose}
                  className="p-1.5 text-[#A6B59D] hover:text-[#F4F1E8] hover:bg-[#304A39]/60 rounded-lg transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-[#171F19]">
              
              {/* Main Title & Kicker */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono-tech text-[#71866A]">
                  <span>{project.category}</span>
                  <span className="text-[#304A39]">·</span>
                  <span>Conducted {project.year}</span>
                  <span className="text-[#304A39]">·</span>
                  <span className="text-[#A6B59D]">{project.type}</span>
                </div>

                <h2 id="modal-project-title" className="text-3xl sm:text-5xl font-editorial font-medium text-[#F4F1E8] tracking-tight leading-tight [text-wrap:balance]">
                  {project.title}
                </h2>

                <p className="text-base text-[#DCE8DA] leading-relaxed max-w-3xl">
                  {project.tagline}
                </p>
              </div>

              {/* Project Media Showcase Banner */}
              <div className="relative rounded-2xl overflow-hidden border border-[#304A39] bg-[#243D30]/40 shadow-inner group">
                {project.previewKind === "foundit" ? (
                  <FoundItPreview variant="modal" demoUrl={project.demoUrl} />
                ) : project.previewKind === "orale" ? (
                  <OralePreview variant="modal" demoUrl={project.demoUrl} />
                ) : project.previewKind === "dual-node" ? (
                  <div className="bg-[#0B100E] flex flex-col">
                    <div className="p-3 sm:p-4 border-b border-[#304A39]/70 space-y-2">
                      <span className="text-[11px] font-mono-tech uppercase tracking-widest text-[#71866A] block">
                        01 · QuakeEscape Resonance Dashboard
                      </span>
                      <img
                        src={project.screenshots[1]?.imageUrl || "/assets/aistudio/Screenshot__123__8fc972ea.png"}
                        alt="QuakeEscape Resonance Dashboard"
                        className="w-full h-auto object-contain rounded-xl border border-[#304A39]/60"
                      />
                    </div>
                    <div className="bg-white p-3 sm:p-5 flex flex-col items-center gap-2">
                      <span className="text-[11px] font-mono-tech uppercase tracking-widest text-[#243D30] self-start font-medium">
                        02 · DOST-PHIVOLCS Earthquake Simulator Field Deployment
                      </span>
                      <img
                        src={project.screenshots[0]?.imageUrl || project.image}
                        alt="DOST-PHIVOLCS Earthquake Simulator Dual-Node Setup"
                        className="w-full max-h-[380px] object-contain"
                      />
                    </div>
                  </div>
                ) : project.image ? (
                  <div className="aspect-video w-full max-h-[460px] overflow-hidden bg-black/40">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : null}
                <div className={`p-4 bg-[#243D30]/90 ${(project.previewKind === "foundit" || project.previewKind === "orale" || project.previewKind === "dual-node" || project.image) ? "border-t border-[#304A39]" : ""} flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs`}>
                  <span className="text-[#A6B59D] font-mono-tech">
                    {project.screenshots[0]?.caption || project.tagline}
                  </span>
                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-tech uppercase text-[#171F19] bg-[#71866A] hover:bg-[#DCE8DA] rounded-lg font-medium transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>{project.demoLabel || "Visit Live Site"}</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-tech uppercase text-[#DCE8DA] hover:text-[#F4F1E8] bg-[#304A39]/60 hover:bg-[#304A39] rounded-lg border border-[#304A39] transition-colors"
                      >
                        <Github className="w-3.5 h-3.5 text-[#71866A]" />
                        <span>View Repository</span>
                      </a>
                    )}
                    {!project.demoUrl && project.demoLabel && (
                      <span className="text-xs font-mono-tech text-[#71866A]">
                        {project.demoLabel}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Tab Navigation for Case Study Sections */}
              <div className="flex items-center gap-1.5 p-1.5 bg-[#243D30]/30 border border-[#304A39] rounded-xl max-w-md">
                {modalTabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative flex-1 py-2 text-xs font-mono-tech uppercase tracking-wider rounded-lg transition-colors cursor-pointer text-center ${
                        isActive ? "text-[#171F19] font-medium" : "text-[#A6B59D] hover:text-[#F4F1E8]"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="modal-case-study-tab"
                          transition={{ type: "spring", stiffness: 320, damping: 28 }}
                          className="absolute inset-0 bg-[#71866A] rounded-lg"
                        />
                      )}
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                {/* Tab Content 1: Overview & Scope */}
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                  >
                    <div className="lg:col-span-8 space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-xl font-editorial font-semibold text-[#F4F1E8]">
                          The Challenge & Objective
                        </h3>
                        <p className="text-sm text-[#A6B59D] leading-relaxed">
                          {project.problem}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xl font-editorial font-semibold text-[#F4F1E8]">
                          My Contribution
                        </h3>
                        <p className="text-sm text-[#A6B59D] leading-relaxed">
                          {project.contribution}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xl font-editorial font-semibold text-[#F4F1E8]">
                          System Scope
                        </h3>
                        <p className="text-sm text-[#A6B59D] leading-relaxed">
                          {project.overview}
                        </p>
                      </div>
                    </div>

                    {/* Technologies & Metadata Sidebar */}
                    <div className="lg:col-span-4 p-5 bg-[#243D30]/20 border border-[#304A39] rounded-2xl space-y-6">
                      <div>
                        <span className="text-xs font-mono-tech uppercase tracking-widest text-[#71866A] block mb-2">
                          Technologies Stack
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 text-xs font-mono-tech bg-[#243D30] text-[#DCE8DA] rounded border border-[#304A39]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#304A39] space-y-3 text-xs font-mono-tech">
                        <div>
                          <span className="text-[#71866A] block">PRIMARY CATEGORY</span>
                          <span className="text-[#F4F1E8] font-medium">{project.category}</span>
                        </div>
                        <div>
                          <span className="text-[#71866A] block">DELIVERY TIMELINE</span>
                          <span className="text-[#F4F1E8] font-medium">{project.year}</span>
                        </div>
                        <div>
                          <span className="text-[#71866A] block">SOURCE STATUS</span>
                          <span className="text-[#DCE8DA]">Maintained on GitHub</span>
                        </div>
                        {project.demoUrl && (
                          <div>
                            <span className="text-[#71866A] block">LIVE DEPLOYMENT</span>
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[#F4F1E8] hover:text-[#71866A] underline decoration-[#304A39] transition-colors break-all"
                            >
                              <span>{project.demoUrl.replace(/^https?:\/\//, "")}</span>
                              <ExternalLink className="w-3 h-3 shrink-0" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Tab Content 2: Key Features */}
                {activeTab === "features" && (
                  <motion.div
                    key="features"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                    className="space-y-4"
                  >
                    <h3 className="text-2xl font-editorial font-semibold text-[#F4F1E8]">
                      Core Functional Modules
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-[#243D30]/20 border border-[#304A39] rounded-xl flex items-start gap-3"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#71866A] shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-[#DCE8DA] leading-relaxed">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Tab Content 3: Engineering Highlights & Architecture */}
                {activeTab === "architecture" && (
                  <motion.div
                    key="architecture"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                    className="space-y-6"
                  >
                    <div className="space-y-3">
                      <h3 className="text-2xl font-editorial font-semibold text-[#F4F1E8]">
                        Engineering Decisions & Technical Highlights
                      </h3>
                      <div className="space-y-3">
                        {project.highlights.map((highlight, idx) => (
                          <div
                            key={idx}
                            className="p-4 bg-[#243D30]/30 border border-[#304A39] rounded-xl flex items-start gap-3"
                          >
                            <span className="text-xs font-mono-tech text-[#71866A] shrink-0 mt-0.5">
                              0{idx + 1}.
                            </span>
                            <p className="text-xs sm:text-sm text-[#A6B59D] leading-relaxed">
                              {highlight}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {project.architectureNotes && (
                      <div className="p-5 bg-[#171F19] border border-[#304A39] rounded-2xl space-y-3">
                        <span className="text-xs font-mono-tech uppercase tracking-widest text-[#71866A] block">
                          Architecture Breakdown
                        </span>
                        <ul className="space-y-2 text-xs font-mono-tech text-[#DCE8DA]">
                          {project.architectureNotes.map((note, idx) => (
                            <li key={idx} className="flex items-baseline gap-2">
                              <span className="text-[#71866A]">→</span>
                              <span>{note}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Modal Footer Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-[#304A39] bg-[#243D30]/40 text-xs font-mono-tech">
              <div className="flex items-center gap-3 text-[#A6B59D]">
                <span>VELLE Archive</span>
                <span>·</span>
                <span>Use Left/Right arrow keys to cycle projects</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-mono-tech uppercase text-[#DCE8DA] hover:text-[#F4F1E8] bg-[#304A39]/60 hover:bg-[#304A39] rounded-lg transition-colors cursor-pointer"
                >
                  Close Case Study
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
