import React, { useRef } from "react";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { journeyData } from "../../data/journey";
import { InteractiveSurface } from "../ui/InteractiveSurface";

export const JourneySection: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 60%"],
  });

  const spineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="journey" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#171F19] text-[#DCE8DA]">
      <div className="relative max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#304A39]/80 pb-8"
        >
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono-tech uppercase tracking-widest text-[#71866A]">
              <span>04</span>
              <span className="text-[#304A39]" aria-hidden="true">/</span>
              <span>Work & OJT Experience</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-editorial font-medium tracking-tight text-[#F4F1E8] [text-wrap:balance]">
              Hands-on practice, <br />
              <span className="italic font-normal text-[#DCE8DA]">work &amp; OJT experience.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#A6B59D] leading-relaxed">
              Industry internship experience contributing to backend data operations, API validation, and responsive frontend workflows.
            </p>
          </div>

          <div className="text-xs font-mono-tech text-[#A6B59D] flex items-center gap-2 shrink-0">
            <span>{journeyData.length} Internship Roles</span>
            <span className="text-[#304A39]" aria-hidden="true">·</span>
            <span className="text-[#71866A]">2024 – 2025</span>
          </div>
        </motion.div>

        {/* Vertical Timeline */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Base Vertical Spine Track */}
          <div
            className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-[1px] bg-[#304A39]/50 sm:-translate-x-1/2"
            aria-hidden="true"
          />
          {/* Scroll-Animated Illuminated Spine */}
          <motion.div
            style={{ scaleY: spineScaleY }}
            className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-[1.5px] bg-gradient-to-b from-[#DCE8DA] via-[#71866A] to-[#D49A61] sm:-translate-x-1/2 origin-top"
            aria-hidden="true"
          />

          <div className="space-y-12">
            {journeyData.map((entry, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex flex-col sm:flex-row items-start group"
                >
                  {/* Timeline Node Marker */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 8 }}
                    className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#171F19] border-2 border-[#71866A] flex items-center justify-center shadow-lg shadow-black/40 z-10 group-hover:scale-110 group-hover:border-[#DCE8DA] transition-all"
                  >
                    <Briefcase className="w-3.5 h-3.5 text-[#DCE8DA]" />
                  </motion.div>

                  {/* Desktop Alternating Layout */}
                  <div className={`pl-12 sm:pl-0 sm:w-1/2 ${isEven ? "sm:pr-12 sm:text-right" : "sm:pl-12 sm:ml-auto"}`}>
                    <InteractiveSurface
                      tiltStrength={2.5}
                      hoverY={-4}
                      glowColor="rgba(113, 134, 106, 0.14)"
                      className="p-6 bg-[#243D30]/25 border border-[#304A39] rounded-2xl group-hover:border-[#71866A]/70 transition-colors space-y-3"
                    >
                      
                      {/* Period & Category Header */}
                      <div className={`flex flex-wrap items-center gap-2 text-xs font-mono-tech ${isEven ? "sm:justify-end" : ""}`}>
                        <span className="text-[#F4F1E8] font-medium flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#71866A]" />
                          {entry.period}
                        </span>
                        <span className="text-[#304A39]">·</span>
                        <span className="text-[#71866A]">OJT / Internship</span>
                      </div>

                      {/* Title & Organization */}
                      <div className="space-y-1">
                        <h3 className="text-xl sm:text-2xl font-editorial font-semibold text-[#F4F1E8] leading-tight">
                          {entry.title}
                        </h3>
                        <div className={`flex items-center gap-1 text-xs text-[#A6B59D] font-mono-tech ${isEven ? "sm:justify-end" : ""}`}>
                          <MapPin className="w-3 h-3 text-[#71866A] shrink-0" />
                          <span>{entry.organization} · {entry.location}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#A6B59D] leading-relaxed">
                        {entry.description}
                      </p>

                      {/* Bullets */}
                      <ul className={`space-y-1.5 text-xs text-[#DCE8DA]/85 pt-1 ${isEven ? "sm:text-right" : "text-left"}`}>
                        {entry.bullets.map((b, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {b}
                          </li>
                        ))}
                      </ul>

                      {/* Skills Deployed */}
                      <div className={`pt-3 border-t border-[#304A39]/60 flex flex-wrap gap-1.5 ${isEven ? "sm:justify-end" : ""}`}>
                        {entry.skills.map((s, idx) => (
                          <motion.span
                            key={idx}
                            whileHover={{ y: -2, borderColor: "#71866A" }}
                            transition={{ duration: 0.15 }}
                            className="px-2 py-0.5 text-[11px] font-mono-tech bg-[#171F19] text-[#DCE8DA] rounded border border-[#304A39]/80 cursor-default"
                          >
                            {s}
                          </motion.span>
                        ))}
                      </div>

                    </InteractiveSurface>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
