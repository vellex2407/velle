import React, { useState } from "react";
import { Code2, Globe, Database, Network, Cpu, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { skillCategories, SkillItem } from "../../data/skills";

export const SkillsSection: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("programming");
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(
    skillCategories[0].skills[0]
  );

  const activeCategory = skillCategories.find((c) => c.id === selectedCategoryId) || skillCategories[0];

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "programming":
        return <Code2 className="w-4 h-4" />;
      case "web-development":
        return <Globe className="w-4 h-4" />;
      case "database-backend":
        return <Database className="w-4 h-4" />;
      case "networking-systems":
        return <Network className="w-4 h-4" />;
      case "hardware-iot":
        return <Cpu className="w-4 h-4" />;
      default:
        return <Code2 className="w-4 h-4" />;
    }
  };

  return (
    <section id="skills" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#171F19] text-[#DCE8DA]">
      <div className="relative max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl space-y-4"
        >
          <div className="flex items-center gap-2 text-xs font-mono-tech uppercase tracking-widest text-[#71866A]">
            <span>03</span>
            <span className="text-[#304A39]" aria-hidden="true">/</span>
            <span>Technical Capabilities</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-editorial font-medium tracking-tight text-[#F4F1E8] [text-wrap:balance]">
            Cross-disciplinary depth, <br />
            <span className="italic font-normal text-[#DCE8DA]">from silicon to viewport.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#A6B59D] leading-relaxed">
            Organized across five primary engineering pillars—spanning low-level systems programming, full-stack web platforms, database design, telecommunications, and physical hardware computing.
          </p>
        </motion.div>

        {/* Category Navigation Strip with Hover Lift & Sliding Selection Border */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {skillCategories.map((cat) => {
            const isSelected = cat.id === selectedCategoryId;
            return (
              <motion.button
                key={cat.id}
                onClick={() => {
                  setSelectedCategoryId(cat.id);
                  setSelectedSkill(cat.skills[0]);
                }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className={`relative p-4 rounded-xl border text-left transition-colors cursor-pointer space-y-2 ${
                  isSelected
                    ? "bg-[#243D30] border-[#71866A] shadow-md shadow-black/30"
                    : "bg-[#243D30]/20 border-[#304A39] hover:border-[#71866A]/60 hover:bg-[#243D30]/40"
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="skill-category-glow"
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    className="absolute inset-0 rounded-xl border border-[#DCE8DA]/40 pointer-events-none"
                  />
                )}
                <div className="flex items-center justify-between text-xs font-mono-tech">
                  <span className={isSelected ? "text-[#DCE8DA]" : "text-[#71866A]"}>
                    {cat.number}
                  </span>
                  <span className={isSelected ? "text-[#F4F1E8]" : "text-[#A6B59D]"}>
                    {getCategoryIcon(cat.id)}
                  </span>
                </div>
                <h3 className="font-editorial text-base sm:text-lg font-medium text-[#F4F1E8] leading-tight">
                  {cat.name}
                </h3>
                <span className="text-[11px] font-mono-tech text-[#A6B59D] block">
                  {cat.skills.length} core competencies
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Selected Category Skill Matrix Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-[#243D30]/20 border border-[#304A39] rounded-3xl p-6 sm:p-10">
          
          {/* Left Column: Skills Grid */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono-tech uppercase text-[#71866A]">
                <span>{activeCategory.number}</span>
                <span>·</span>
                <span>{activeCategory.name}</span>
              </div>
              <p className="text-sm text-[#A6B59D]">
                {activeCategory.description}
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2"
              >
                {activeCategory.skills.map((skill, idx) => {
                  const isActiveSkill = selectedSkill?.name === skill.name;
                  return (
                    <motion.button
                      type="button"
                      key={skill.name}
                      onClick={() => setSelectedSkill(skill)}
                      onMouseEnter={() => setSelectedSkill(skill)}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: idx * 0.03 }}
                      whileHover={{ x: 4, y: -2 }}
                      whileTap={{ scale: 0.99 }}
                      className={`p-4 rounded-xl border transition-colors cursor-pointer text-left space-y-2 ${
                        isActiveSkill
                          ? "bg-[#304A39]/80 border-[#71866A] text-[#F4F1E8] shadow-sm"
                          : "bg-[#171F19]/80 border-[#304A39]/70 hover:border-[#71866A]/60 text-[#DCE8DA]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm text-[#F4F1E8]">
                          {skill.name}
                        </h4>
                        <ChevronRight
                          className={`w-3.5 h-3.5 transition-transform ${
                            isActiveSkill ? "text-[#DCE8DA] translate-x-0.5" : "text-[#304A39]"
                          }`}
                        />
                      </div>
                      <p className="text-xs text-[#A6B59D] leading-relaxed line-clamp-2">
                        {skill.summary}
                      </p>
                    </motion.button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Deep-Dive Practical Application Detail Card */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-[#171F19] border border-[#304A39] rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#304A39] pb-4">
              <span className="text-xs font-mono-tech uppercase tracking-widest text-[#71866A]">
                Practical Application
              </span>
              <span className="text-xs font-mono-tech text-[#A6B59D]">
                {selectedSkill?.category}
              </span>
            </div>

            <AnimatePresence mode="wait">
              {selectedSkill ? (
                <motion.div
                  key={selectedSkill.name}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="text-2xl font-editorial font-semibold text-[#F4F1E8]">
                      {selectedSkill.name}
                    </h3>
                    <p className="text-xs font-mono-tech text-[#71866A] mt-1">
                      Engineering Context & Tooling
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-mono-tech uppercase tracking-wider text-[#A6B59D] block">
                      Technical Scope
                    </span>
                    <p className="text-xs text-[#DCE8DA] leading-relaxed">
                      {selectedSkill.summary}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[#304A39]/60">
                    <span className="text-[11px] font-mono-tech uppercase tracking-wider text-[#71866A] block">
                      Real-World Implementation
                    </span>
                    <p className="text-xs sm:text-sm text-[#A6B59D] leading-relaxed italic bg-[#243D30]/30 p-3.5 rounded-lg border border-[#304A39]/40">
                      &ldquo;{selectedSkill.application}&rdquo;
                    </p>
                  </div>
                </motion.div>
              ) : (
                <p className="text-xs text-[#A6B59D]">Select a skill to inspect implementation details.</p>
              )}
            </AnimatePresence>

            <div className="pt-4 border-t border-[#304A39] text-[11px] font-mono-tech text-[#A6B59D]">
              <span>Hover or select any skill to inspect its engineering context</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
