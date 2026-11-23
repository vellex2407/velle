import React, { useState } from "react";
import { Layers, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { profileData } from "../../data/profile";
import { InteractiveSurface } from "../ui/InteractiveSurface";

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"narrative" | "interests" | "philosophy">("narrative");

  const tabs: { id: "narrative" | "interests" | "philosophy"; label: string }[] = [
    { id: "narrative", label: "Biography & Background" },
    { id: "interests", label: "Core Disciplines" },
    { id: "philosophy", label: "Design Principles" },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#171F19] text-[#DCE8DA]">
      {/* Subtle organic background lines */}
      <div className="absolute inset-0 bg-forest-noise pointer-events-none opacity-40" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Editorial Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16 space-y-4"
        >
          <div className="flex items-center gap-2 text-xs font-mono-tech uppercase tracking-widest text-[#71866A]">
            <span>01</span>
            <span className="text-[#304A39]" aria-hidden="true">/</span>
            <span>The Person Behind the Code</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-editorial font-medium tracking-tight text-[#F4F1E8] [text-wrap:balance]">
            Engineering foundations, <br />
            <span className="italic font-normal text-[#DCE8DA]">cultivated with craft.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#A6B59D] leading-relaxed">
            Bridging low-level computer architecture with modern web ecosystems to create digital environments that are dependable, performant, and human.
          </p>
        </motion.div>

        {/* Interactive Tab Controls with Sliding Active Pill */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#243D30]/40 border border-[#304A39] rounded-xl mb-12 max-w-xl">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2 text-xs font-mono-tech uppercase tracking-wider rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive ? "text-[#171F19] font-medium" : "text-[#A6B59D] hover:text-[#F4F1E8]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="about-tab-pill"
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                    className="absolute inset-0 bg-[#71866A] rounded-lg shadow-sm"
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {/* Tab 1: Narrative & Academic Highlight */}
          {activeTab === "narrative" && (
            <motion.div
              key="narrative"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Main Long Biography */}
              <div className="lg:col-span-7 space-y-6 text-[#A6B59D] leading-relaxed text-base sm:text-lg">
                {profileData.longBio.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}

                {/* Unboxed Metadata Callouts */}
                <div className="pt-6 border-t border-[#304A39] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono-tech text-[#A6B59D]">
                  <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.15 }}>
                    <span className="text-[#71866A] uppercase tracking-wider block mb-1">Alma Mater</span>
                    <span className="text-[#F4F1E8] font-medium block">{profileData.university}</span>
                    <span className="text-[#71866A] text-[11px]">{profileData.universityTimeline}</span>
                  </motion.div>
                  <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.15 }}>
                    <span className="text-[#71866A] uppercase tracking-wider block mb-1">Degree Conferred</span>
                    <span className="text-[#F4F1E8] font-medium block">{profileData.degree}</span>
                    <span className="text-[#A6B59D] text-[11px]">Computer Engineering Graduate</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.15 }}
                    className="sm:col-span-2 pt-2 border-t border-[#304A39]/50"
                  >
                    <span className="text-[#71866A] uppercase tracking-wider block mb-1">Preparatory Education</span>
                    <span className="text-[#F4F1E8] font-medium block">{profileData.highSchool}</span>
                    <span className="text-[#A85F3C] text-[11px] font-medium">{profileData.highSchoolHonors} ({profileData.highSchoolTimeline})</span>
                  </motion.div>
                </div>
              </div>

              {/* Warm Ivory Interactive Feature Card */}
              <div className="lg:col-span-5">
                <InteractiveSurface
                  tiltStrength={3.5}
                  hoverY={-5}
                  glowColor="rgba(168, 95, 60, 0.14)"
                  className="bg-[#F4F1E8] text-[#171F19] p-6 sm:p-8 rounded-2xl shadow-xl space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-[#171F19]/10 pb-4">
                    <span className="text-xs font-mono-tech uppercase tracking-wider text-[#71866A] font-semibold">
                      Technical Foundation
                    </span>
                    <span className="text-xs font-mono-tech text-[#171F19]/60">
                      {profileData.location}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-editorial font-semibold text-[#171F19] leading-tight">
                      Computer Engineering & Web Development
                    </h3>
                    <p className="text-xs text-[#171F19]/75 leading-relaxed">
                      Hands-on experience spanning backend application support, database CRUD operations, API validation in Postman, and responsive user interface implementation in React and TypeScript.
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <span className="text-[11px] font-mono-tech uppercase tracking-widest text-[#71866A] block">
                      Industry & Academic Milestones
                    </span>
                    <div className="space-y-2 text-xs text-[#171F19]/80">
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A85F3C] mt-1.5 shrink-0" />
                        <span><strong>8Box Solutions Inc.</strong> — Backend Development Intern (SQL, Postman, WAMP)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A85F3C] mt-1.5 shrink-0" />
                        <span><strong>Unified Internship Program, Inc.</strong> — Frontend Development Intern (UIP Attendance Tracker)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A85F3C] mt-1.5 shrink-0" />
                        <span><strong>Dual-Node Thesis</strong> — Raspberry Pi, Python signal processing, Wi-Fi TCP/UDP</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#171F19]/10 text-xs font-mono-tech text-[#171F19]/70 italic">
                    &ldquo;Rooted in curiosity. Built with purpose.&rdquo;
                  </div>
                </InteractiveSurface>
              </div>
            </motion.div>
          )}

          {/* Tab 2: Core Disciplines */}
          {activeTab === "interests" && (
            <motion.div
              key="interests"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {profileData.interests.map((interest, idx) => (
                <InteractiveSurface
                  key={idx}
                  tiltStrength={3}
                  hoverY={-5}
                  glowColor="rgba(113, 134, 106, 0.16)"
                  className="p-6 bg-[#243D30]/30 border border-[#304A39] rounded-2xl hover:border-[#71866A] transition-colors space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono-tech text-[#71866A]">
                      0{idx + 1}
                    </span>
                    <Layers className="w-4 h-4 text-[#71866A]" />
                  </div>
                  <h3 className="text-xl font-editorial font-semibold text-[#F4F1E8]">
                    {interest.title}
                  </h3>
                  <p className="text-xs text-[#A6B59D] leading-relaxed">
                    {interest.description}
                  </p>
                </InteractiveSurface>
              ))}
            </motion.div>
          )}

          {/* Tab 3: Design Principles & Philosophies */}
          {activeTab === "philosophy" && (
            <motion.div
              key="philosophy"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {profileData.philosophies.map((item, idx) => (
                  <InteractiveSurface
                    key={idx}
                    tiltStrength={3}
                    hoverY={-5}
                    glowColor="rgba(113, 134, 106, 0.15)"
                    className="p-6 sm:p-8 bg-[#243D30]/20 border border-[#304A39] hover:border-[#71866A] rounded-2xl space-y-4 transition-colors"
                  >
                    <span className="text-xs font-mono-tech uppercase tracking-widest text-[#71866A]">
                      Principle 0{idx + 1}
                    </span>
                    <h3 className="text-2xl font-editorial font-medium text-[#F4F1E8]">
                      {item.title}
                    </h3>
                    <blockquote className="text-sm italic font-editorial text-[#DCE8DA] border-l-2 border-[#71866A] pl-3 py-1">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                    <p className="text-xs text-[#A6B59D] leading-relaxed">
                      {item.description}
                    </p>
                  </InteractiveSurface>
                ))}
              </div>

              {/* Soft Skills Highlight Bar */}
              <div className="p-6 bg-[#243D30]/30 border border-[#304A39] rounded-2xl space-y-3">
                <span className="text-xs font-mono-tech uppercase tracking-widest text-[#71866A] block">
                  Professional Strengths & Collaboration Skills
                </span>
                <div className="flex flex-wrap gap-2 text-xs font-mono-tech text-[#DCE8DA]">
                  {profileData.softSkills.map((s, idx) => (
                    <motion.span
                      key={idx}
                      whileHover={{ y: -2, borderColor: "#71866A" }}
                      transition={{ duration: 0.15 }}
                      className="bg-[#171F19] px-3 py-1.5 rounded-lg border border-[#304A39] flex items-center gap-1.5 cursor-default"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-[#71866A]" />
                      <span>{s}</span>
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
