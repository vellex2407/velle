import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useScroll } from "motion/react";

interface Particle {
  id: number;
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
  opacity: number;
  tone: string;
}

const FOREST_PARTICLES: Particle[] = [
  { id: 1, left: "8%", top: "14%", size: 4, duration: 16, delay: 0, driftX: 28, driftY: -42, opacity: 0.35, tone: "#DCE8DA" },
  { id: 2, left: "18%", top: "68%", size: 3, duration: 21, delay: 2, driftX: -22, driftY: -55, opacity: 0.25, tone: "#D49A61" },
  { id: 3, left: "31%", top: "28%", size: 5, duration: 19, delay: 1, driftX: 34, driftY: -36, opacity: 0.28, tone: "#71866A" },
  { id: 4, left: "44%", top: "82%", size: 3, duration: 23, delay: 4, driftX: -18, driftY: -48, opacity: 0.3, tone: "#DCE8DA" },
  { id: 5, left: "58%", top: "20%", size: 4, duration: 18, delay: 3, driftX: 26, driftY: -50, opacity: 0.26, tone: "#D49A61" },
  { id: 6, left: "72%", top: "54%", size: 5, duration: 22, delay: 0.5, driftX: -30, driftY: -40, opacity: 0.32, tone: "#71866A" },
  { id: 7, left: "86%", top: "32%", size: 3, duration: 17, delay: 2.5, driftX: -24, driftY: -44, opacity: 0.35, tone: "#DCE8DA" },
  { id: 8, left: "92%", top: "76%", size: 4, duration: 20, delay: 1.5, driftX: 20, driftY: -52, opacity: 0.25, tone: "#D49A61" },
  { id: 9, left: "24%", top: "45%", size: 2.5, duration: 24, delay: 3.5, driftX: 16, driftY: -34, opacity: 0.28, tone: "#DCE8DA" },
  { id: 10, left: "65%", top: "88%", size: 3.5, duration: 19, delay: 2, driftX: -26, driftY: -38, opacity: 0.3, tone: "#71866A" },
  { id: 11, left: "48%", top: "48%", size: 3, duration: 25, delay: 0.8, driftX: 22, driftY: -46, opacity: 0.22, tone: "#DCE8DA" },
  { id: 12, left: "79%", top: "14%", size: 4, duration: 20, delay: 4.2, driftX: -18, driftY: -42, opacity: 0.26, tone: "#D49A61" },
];

export const ForestAtmosphere: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);
  const smoothX = useSpring(mouseX, { stiffness: 90, damping: 24 });
  const smoothY = useSpring(mouseY, { stiffness: 90, damping: 24 });
  const [hasPointer, setHasPointer] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setHasPointer(mediaQuery.matches);
    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Top Scroll Progress Line */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#71866A] via-[#DCE8DA] to-[#D49A61] origin-left z-50 pointer-events-none"
        aria-hidden="true"
      />

      {/* Ambient Floating Forest Light Motes */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden z-[1]"
        aria-hidden="true"
      >
        {FOREST_PARTICLES.map((p) => (
          <motion.span
            key={p.id}
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              backgroundColor: p.tone,
              boxShadow: `0 0 ${p.size * 3}px ${p.tone}`,
            }}
            className="absolute rounded-full"
            initial={{ opacity: 0, x: 0, y: 0, scale: 0.8 }}
            animate={{
              opacity: [0, p.opacity, p.opacity * 0.6, p.opacity, 0],
              x: [0, p.driftX * 0.5, p.driftX, p.driftX * 0.4, 0],
              y: [0, p.driftY * 0.4, p.driftY, p.driftY * 0.7, 0],
              scale: [0.8, 1.15, 0.95, 1.1, 0.8],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Soft Mouse-Tracking Canopy Sunlight Glow */}
        {hasPointer && (
          <motion.div
            style={{
              x: smoothX,
              y: smoothY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            className="w-[460px] h-[460px] rounded-full bg-[radial-gradient(circle,rgba(113,134,106,0.11)_0%,rgba(212,154,97,0.04)_38%,transparent_70%)] blur-2xl"
          />
        )}
      </div>
    </>
  );
};
