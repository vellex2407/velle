import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface InteractiveSurfaceProps {
  children: React.ReactNode;
  className?: string;
  tiltStrength?: number;
  hoverY?: number;
  glowColor?: string;
  onClick?: () => void;
}

export const InteractiveSurface: React.FC<InteractiveSurfaceProps> = ({
  children,
  className = "",
  tiltStrength = 3,
  hoverY = -4,
  glowColor = "rgba(113, 134, 106, 0.16)",
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const smoothX = useSpring(mouseX, { stiffness: 180, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 180, damping: 22 });

  const rotateX = useTransform(smoothY, [0, 1], [tiltStrength, -tiltStrength]);
  const rotateY = useTransform(smoothX, [0, 1], [-tiltStrength, tiltStrength]);
  const glowLeft = useTransform(smoothX, (v) => `${v * 100}%`);
  const glowTop = useTransform(smoothY, (v) => `${v * 100}%`);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      whileHover={{ y: hoverY }}
      whileTap={onClick ? { scale: 0.99 } : undefined}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Dynamic Cursor-Tracking Radial Glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px z-10 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: useTransform(
            [glowLeft, glowTop],
            ([x, y]) =>
              `radial-gradient(420px circle at ${x} ${y}, ${glowColor}, transparent 65%)`
          ),
        }}
      />
      {children}
    </motion.div>
  );
};
