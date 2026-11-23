import React, { useRef } from "react";
import { ArrowDown, Github, Linkedin, Mail, MapPin, Terminal } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { profileData } from "../../data/profile";
import { TypewriterText } from "../ui/TypewriterText";
import { InteractiveSurface } from "../ui/InteractiveSurface";

interface HeroSectionProps {
  onExploreWork: () => void;
  onConnect: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreWork, onConnect }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Forest Canopy with Gentle Scroll Parallax & Atmospheric Vignette */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          style={{ y: bgY, scale: bgScale }}
          src={profileData.heroBackground}
          alt="Atmospheric forest canopy with sunlight filtering through mist"
          className="w-full h-full object-cover object-center brightness-75 contrast-105 will-change-transform"
          referrerPolicy="no-referrer"
        />
        {/* Deep Forest Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#171F19]/80 via-[#171F19]/85 to-[#171F19]" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#171F19]/60 to-[#171F19]" />

        {/* Ambient Drifting Canopy Glows */}
        <motion.div
          animate={{
            x: [0, 35, -15, 0],
            y: [0, -25, 18, 0],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/3 -translate-x-1/2 w-96 h-96 bg-[#304A39]/35 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <motion.div
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 22, -28, 0],
            scale: [1, 0.94, 1.06, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#71866A]/20 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typographic Hierarchy */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 sm:space-y-8"
          >
            
            {/* Eyebrow Label */}
            <div className="flex items-center gap-2.5 text-xs font-mono-tech uppercase tracking-widest text-[#71866A]">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="inline-block w-4 h-[1px] bg-[#71866A] origin-left"
                aria-hidden="true"
              />
              <span>{profileData.eyebrow}</span>
            </div>

            {/* Main Editorial Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-editorial font-medium tracking-tight text-[#F4F1E8] leading-[1.08] [text-wrap:balance]">
                Rooted in curiosity. <br />
                <span className="italic font-normal text-[#DCE8DA] inline-block min-h-[1.08em]">
                  <TypewriterText
                    phrases={["Built with purpose."]}
                    typingSpeed={65}
                    deletingSpeed={35}
                    pauseDuration={4200}
                  />
                </span>
              </h1>
              <p className="text-sm sm:text-base text-[#71866A] font-mono-tech pt-1">
                {profileData.subTagline}
              </p>
            </div>

            {/* Narrative Description */}
            <p className="text-base sm:text-lg text-[#A6B59D] leading-relaxed max-w-2xl">
              {profileData.bio}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <motion.button
                onClick={onExploreWork}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 360, damping: 22 }}
                className="group flex items-center gap-2.5 px-6 py-3.5 text-xs font-mono-tech uppercase tracking-wider text-[#171F19] bg-[#71866A] hover:bg-[#DCE8DA] rounded-xl font-medium transition-colors shadow-md shadow-black/30 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Explore Featured Work</span>
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </motion.button>

              <motion.button
                onClick={onConnect}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 360, damping: 22 }}
                className="flex items-center gap-2 px-5 py-3.5 text-xs font-mono-tech uppercase tracking-wider text-[#DCE8DA] hover:text-[#F4F1E8] bg-[#243D30]/60 hover:bg-[#304A39] border border-[#304A39] hover:border-[#71866A] rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Let&apos;s Connect</span>
              </motion.button>
            </div>

            {/* Clean Unboxed Metadata Strip */}
            <div className="pt-4 flex flex-wrap items-center gap-3 text-xs text-[#A6B59D] font-mono-tech border-t border-[#304A39]/60">
              <span className="text-[#F4F1E8]">{profileData.name}</span>
              <span className="text-[#304A39]" aria-hidden="true">·</span>
              <span>{profileData.degree}</span>
              <span className="text-[#304A39]" aria-hidden="true">·</span>
              <span className="text-[#71866A]">{profileData.university}</span>
            </div>
          </motion.div>

          {/* Right Column: Interactive Portrait Frame & Floating Technical Info Panel */}
          <motion.div
            style={{ y: portraitY }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center lg:items-end"
          >
            <div className="relative w-full max-w-[400px]">
              
              {/* Interactive 3D Tilt & Spotlight Outer Framing */}
              <InteractiveSurface
                tiltStrength={4}
                hoverY={-6}
                glowColor="rgba(113, 134, 106, 0.22)"
                className="p-2.5 sm:p-3 bg-[#243D30]/40 backdrop-blur-md border border-[#304A39] hover:border-[#71866A]/70 rounded-2xl shadow-2xl transition-colors"
              >
                
                {/* Image Container with Natural Tonal Grading */}
                <div className="group/photo relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-[#171F19]">
                  <img
                    src={profileData.avatarImage}
                    alt={`${profileData.name} - Computer Engineering Graduate`}
                    className="w-full h-full object-cover object-center filter saturate-95 contrast-105 group-hover/photo:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171F19]/70 via-transparent to-transparent pointer-events-none" />

                  {/* Corner Accent Marks that expand slightly on hover */}
                  <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#71866A]/70 group-hover/photo:w-4 group-hover/photo:h-4 transition-all duration-300 pointer-events-none" />
                  <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#71866A]/70 group-hover/photo:w-4 group-hover/photo:h-4 transition-all duration-300 pointer-events-none" />
                  <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#71866A]/70 group-hover/photo:w-4 group-hover/photo:h-4 transition-all duration-300 pointer-events-none" />
                  <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#71866A]/70 group-hover/photo:w-4 group-hover/photo:h-4 transition-all duration-300 pointer-events-none" />
                  
                  {/* Photo Title Overlay in Lower Corner */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono-tech text-[#F4F1E8] px-2 py-1 bg-[#171F19]/80 backdrop-blur rounded border border-[#304A39]/60">
                    <span className="truncate">{profileData.name}</span>
                    <span className="text-[#71866A] shrink-0">B.S. CpE</span>
                  </div>
                </div>

                {/* Floating Technical Information Panel */}
                <div className="relative z-20 mt-3 p-4 bg-[#171F19]/90 border border-[#304A39] rounded-xl text-xs space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-[#71866A] font-mono-tech text-[11px] shrink-0">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>ENGINEERING STATUS</span>
                    </div>
                    <span className="text-[11px] font-mono-tech text-[#DCE8DA] truncate text-right">
                      {profileData.availability}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-[#304A39]/50">
                    <div className="flex items-center gap-1.5 text-[#A6B59D]">
                      <MapPin className="w-3.5 h-3.5 text-[#71866A]" />
                      <span>{profileData.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#A6B59D]">
                      <motion.a
                        href={profileData.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -2, scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-1 hover:text-[#F4F1E8] hover:bg-[#304A39]/50 rounded transition-colors"
                        aria-label="GitHub profile"
                      >
                        <Github className="w-4 h-4" />
                      </motion.a>
                      <motion.a
                        href={profileData.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -2, scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-1 hover:text-[#F4F1E8] hover:bg-[#304A39]/50 rounded transition-colors"
                        aria-label="LinkedIn profile"
                      >
                        <Linkedin className="w-4 h-4" />
                      </motion.a>
                      <motion.a
                        href={`mailto:${profileData.email}`}
                        whileHover={{ y: -2, scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-1 hover:text-[#F4F1E8] hover:bg-[#304A39]/50 rounded transition-colors"
                        aria-label="Email directly"
                      >
                        <Mail className="w-4 h-4" />
                      </motion.a>
                    </div>
                  </div>
                </div>

              </InteractiveSurface>

            </div>
          </motion.div>

        </div>

        {/* Bottom Scroll Prompt with Gentle Floating Motion */}
        <div className="pt-16 sm:pt-20 flex justify-center">
          <motion.button
            onClick={onExploreWork}
            whileHover={{ y: 2 }}
            className="group flex flex-col items-center gap-2 text-xs font-mono-tech uppercase tracking-widest text-[#A6B59D] hover:text-[#DCE8DA] transition-colors cursor-pointer"
            aria-label="Scroll to featured projects"
          >
            <span>Scroll to Discover</span>
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="w-4 h-4 text-[#71866A]" />
            </motion.span>
          </motion.button>
        </div>

      </div>
    </section>
  );
};
