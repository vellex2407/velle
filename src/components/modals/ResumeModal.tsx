import React, { useEffect } from "react";
import { X, Download, Printer, ExternalLink, Mail, Phone, MapPin, GraduationCap, Briefcase, Code, Award, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { profileData } from "../../data/profile";
import { journeyData } from "../../data/journey";
import { projectsData } from "../../data/projects";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#171F19] border border-[#304A39] rounded-2xl shadow-2xl overflow-hidden text-[#DCE8DA]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-title"
          >
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#304A39] bg-[#243D30]/60 backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-[#71866A] font-mono-tech">
              Curriculum Vitae
            </span>
            <span className="text-[#A6B59D]/40" aria-hidden="true">/</span>
            <span className="text-sm font-medium text-[#F4F1E8]">
              {profileData.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-tech uppercase text-[#DCE8DA] hover:text-[#F4F1E8] bg-[#304A39]/60 hover:bg-[#304A39] border border-[#304A39] rounded-lg transition-colors cursor-pointer"
              title="Print Resume"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / Save as PDF</span>
            </button>
            <a
              href={`mailto:${profileData.email}?subject=Requesting%20Official%20PDF%20Resume`}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-tech uppercase text-[#171F19] bg-[#71866A] hover:bg-[#DCE8DA] rounded-lg transition-colors cursor-pointer font-medium"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Contact for Copy</span>
            </a>
            <button
              onClick={onClose}
              className="p-1.5 text-[#A6B59D] hover:text-[#F4F1E8] hover:bg-[#304A39]/60 rounded-lg transition-colors cursor-pointer ml-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-[#171F19] text-[#DCE8DA] print:bg-white print:text-black">
          {/* Header Resume Info */}
          <div className="border-b border-[#304A39] pb-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
              <div>
                <h2 id="resume-title" className="text-3xl sm:text-4xl font-editorial font-semibold text-[#F4F1E8] tracking-tight">
                  {profileData.name}
                </h2>
                <p className="text-xs sm:text-sm text-[#71866A] font-mono-tech mt-1 uppercase tracking-wider">
                  {profileData.title}
                </p>
              </div>
              <div className="text-xs text-[#A6B59D] space-y-1.5 sm:text-right font-mono-tech">
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#71866A]" />
                  <a href={`mailto:${profileData.email}`} className="hover:text-[#F4F1E8] underline decoration-[#304A39]">
                    {profileData.email}
                  </a>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#71866A]" />
                  <a href={`tel:${profileData.phone.replace(/\s+/g, '')}`} className="hover:text-[#F4F1E8]">
                    {profileData.phone}
                  </a>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#71866A]" />
                  <span>{profileData.location}</span>
                </div>
                <div className="flex items-center sm:justify-end gap-2 text-[11px] pt-1">
                  <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#F4F1E8] flex items-center gap-1">
                    LinkedIn <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                  <span>·</span>
                  <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#F4F1E8] flex items-center gap-1">
                    GitHub <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Resume Summary */}
            <div className="pt-2">
              <span className="text-[11px] font-mono-tech uppercase tracking-widest text-[#71866A] block mb-1">
                Professional Summary
              </span>
              <p className="text-xs sm:text-sm text-[#A6B59D] leading-relaxed max-w-3xl">
                {profileData.bio}
              </p>
            </div>
          </div>

          {/* Work Experience */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase font-mono-tech tracking-wider text-[#71866A]">
              <Briefcase className="w-4 h-4" />
              <span>Work Experience</span>
            </div>
            <div className="space-y-4">
              {journeyData
                .filter(item => item.type === "Experience")
                .map(item => (
                  <div key={item.id} className="p-4 sm:p-5 bg-[#243D30]/25 border border-[#304A39]/60 rounded-xl space-y-2.5">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h4 className="font-semibold text-sm sm:text-base text-[#F4F1E8]">
                        {item.title} <span className="font-normal text-[#A6B59D]">| {item.organization}</span>
                      </h4>
                      <span className="text-xs font-mono-tech text-[#71866A] shrink-0">{item.period}</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1.5 text-xs text-[#DCE8DA]/90 pl-1">
                      {item.bullets.map((bullet, idx) => (
                        <li key={idx} className="leading-relaxed">{bullet}</li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-mono-tech text-[#71866A]">
                      {item.skills.map((s, idx) => (
                        <span key={idx} className="bg-[#171F19] px-2 py-0.5 rounded border border-[#304A39]/60">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </section>

          {/* Key Projects */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase font-mono-tech tracking-wider text-[#71866A]">
              <Code className="w-4 h-4" />
              <span>Key Projects</span>
            </div>
            <div className="space-y-4">
              {projectsData.slice(0, 4).map(proj => (
                <div key={proj.id} className="p-4 sm:p-5 bg-[#243D30]/25 border border-[#304A39]/60 rounded-xl space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h4 className="font-semibold text-sm text-[#F4F1E8]">
                      {proj.title} <span className="font-normal text-[#71866A]">({proj.type})</span>
                    </h4>
                    <span className="text-xs font-mono-tech text-[#A6B59D] shrink-0">{proj.year}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-[#DCE8DA]/85 pl-1">
                    {proj.features.slice(0, 4).map((f, idx) => (
                      <li key={idx} className="leading-relaxed">{f}</li>
                    ))}
                  </ul>
                  <p className="text-xs text-[#A6B59D] pt-1">
                    <strong className="text-[#F4F1E8] font-medium font-mono-tech text-[11px]">Technologies:</strong>{" "}
                    <span className="font-mono-tech text-[11px] text-[#71866A]">{proj.technologies.join(" · ")}</span>
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase font-mono-tech tracking-wider text-[#71866A]">
              <GraduationCap className="w-4 h-4" />
              <span>Education</span>
            </div>
            <div className="space-y-3">
              <div className="p-4 bg-[#243D30]/30 border border-[#304A39]/60 rounded-xl space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <h3 className="font-semibold text-sm sm:text-base text-[#F4F1E8]">
                    Bachelor of Science in Computer Engineering
                  </h3>
                  <span className="text-xs font-mono-tech text-[#71866A]">2022 – 2026</span>
                </div>
                <p className="text-xs text-[#A6B59D]">
                  Polytechnic University of the Philippines, Sta. Mesa, Manila
                </p>
              </div>

              <div className="p-4 bg-[#243D30]/20 border border-[#304A39]/50 rounded-xl space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm text-[#F4F1E8]">
                      Accountancy, Business and Management (ABM)
                    </h3>
                    <span className="text-[11px] font-mono-tech text-[#A85F3C] font-medium">
                      With High Honors
                    </span>
                  </div>
                  <span className="text-xs font-mono-tech text-[#71866A]">2020 – 2022</span>
                </div>
                <p className="text-xs text-[#A6B59D]">
                  Baliwag Polytechnic College, Baliwag, Bulacan
                </p>
              </div>
            </div>
          </section>

          {/* Technical Skills Categorized from Resume */}
          <section className="space-y-3 pt-2">
            <div className="flex items-center gap-2 text-xs uppercase font-mono-tech tracking-wider text-[#71866A]">
              <Award className="w-4 h-4" />
              <span>Technical & Tooling Competencies</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 bg-[#243D30]/20 border border-[#304A39]/40 rounded-lg space-y-1">
                <span className="font-semibold text-[#F4F1E8] block font-mono-tech text-[11px] text-[#71866A] uppercase">
                  Programming
                </span>
                <p className="text-[#DCE8DA] font-mono-tech text-[11px] leading-relaxed">
                  Python, C, C++
                </p>
              </div>

              <div className="p-3.5 bg-[#243D30]/20 border border-[#304A39]/40 rounded-lg space-y-1">
                <span className="font-semibold text-[#F4F1E8] block font-mono-tech text-[11px] text-[#71866A] uppercase">
                  Frontend Development
                </span>
                <p className="text-[#DCE8DA] font-mono-tech text-[11px] leading-relaxed">
                  HTML, CSS, JavaScript, React, TypeScript, Tailwind CSS, Laravel Blade
                </p>
              </div>

              <div className="p-3.5 bg-[#243D30]/20 border border-[#304A39]/40 rounded-lg space-y-1">
                <span className="font-semibold text-[#F4F1E8] block font-mono-tech text-[11px] text-[#71866A] uppercase">
                  Backend & APIs
                </span>
                <p className="text-[#DCE8DA] font-mono-tech text-[11px] leading-relaxed">
                  MySQL, SQL queries, relational database design, CRUD operations, Node.js, Express, REST APIs
                </p>
              </div>

              <div className="p-3.5 bg-[#243D30]/20 border border-[#304A39]/40 rounded-lg space-y-1">
                <span className="font-semibold text-[#F4F1E8] block font-mono-tech text-[11px] text-[#71866A] uppercase">
                  Development Tools
                </span>
                <p className="text-[#DCE8DA] font-mono-tech text-[11px] leading-relaxed">
                  Git, Figma, Canva, Visual Studio Code, Vite, WAMP, Postman, Microsoft Office, Google Workspace, WordPress
                </p>
              </div>

              <div className="p-3.5 bg-[#243D30]/20 border border-[#304A39]/40 rounded-lg space-y-1 sm:col-span-2 lg:col-span-2">
                <span className="font-semibold text-[#F4F1E8] block font-mono-tech text-[11px] text-[#71866A] uppercase">
                  Hardware & Networking
                </span>
                <p className="text-[#DCE8DA] font-mono-tech text-[11px] leading-relaxed">
                  Arduino, Microcontroller programming, circuit design, sensor/actuator integration, Cisco Packet Tracer, Raspberry Pi
                </p>
              </div>
            </div>
          </section>

          {/* Soft Skills */}
          <section className="space-y-2 pt-1 border-t border-[#304A39]/60">
            <span className="text-[11px] font-mono-tech uppercase tracking-widest text-[#71866A] block">
              Professional & Soft Skills
            </span>
            <div className="flex flex-wrap gap-2 text-xs font-mono-tech text-[#DCE8DA]">
              {profileData.softSkills.map((skill, idx) => (
                <span key={idx} className="bg-[#243D30]/40 px-2.5 py-1 rounded border border-[#304A39]/60 flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-[#71866A]" />
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-[#304A39] bg-[#243D30]/40 text-xs text-[#A6B59D] font-mono-tech">
          <span>{profileData.name} · Official Curriculum Vitae</span>
          <button
            onClick={onClose}
            className="text-[#DCE8DA] hover:text-[#F4F1E8] underline decoration-[#71866A] cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
