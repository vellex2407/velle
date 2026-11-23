import React, { useEffect, useRef, useState } from "react";

interface ShineParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
  isStar: boolean;
  rotation: number;
  rotationSpeed: number;
}

interface TrailPoint {
  x: number;
  y: number;
  age: number;
}

const SHINE_COLORS = [
  "244, 241, 232", // Warm Ivory (#F4F1E8)
  "220, 232, 218", // Pale Jade (#DCE8DA)
  "212, 154, 97",  // Soft Amber (#D49A61)
  "113, 134, 106", // Mossy Green (#71866A)
];

export const ShinyCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);

  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const pointerPos = useRef({ x: -200, y: -200 });
  const prevPointerPos = useRef({ x: -200, y: -200 });
  const haloPos = useRef({ x: -200, y: -200 });
  const particlesRef = useRef<ShineParticle[]>([]);
  const trailRef = useRef<TrailPoint[]>([]);
  const visibleRef = useRef(false);
  const interactiveRef = useRef(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateEnabled = () => {
      const active = finePointer.matches && !reducedMotion.matches;
      setEnabled(active);
      if (active) {
        document.documentElement.classList.add("custom-cursor-active");
      } else {
        document.documentElement.classList.remove("custom-cursor-active");
      }
    };

    updateEnabled();
    finePointer.addEventListener("change", updateEnabled);
    reducedMotion.addEventListener("change", updateEnabled);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      finePointer.removeEventListener("change", updateEnabled);
      reducedMotion.removeEventListener("change", updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    let lastIdleSpawn = 0;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const spawnShine = (
      x: number,
      y: number,
      vx: number,
      vy: number,
      options?: { burst?: boolean }
    ) => {
      const isBurst = Boolean(options?.burst);
      const color = SHINE_COLORS[Math.floor(Math.random() * SHINE_COLORS.length)];
      const angle = Math.random() * Math.PI * 2;
      const speed = isBurst ? 1.2 + Math.random() * 2.2 : 0.25 + Math.random() * 0.85;

      particlesRef.current.push({
        x: x + (Math.random() - 0.5) * (isBurst ? 4 : 8),
        y: y + (Math.random() - 0.5) * (isBurst ? 4 : 8),
        vx: vx * 0.14 + Math.cos(angle) * speed,
        vy: vy * 0.14 + Math.sin(angle) * speed - 0.25,
        size: isBurst ? 2.2 + Math.random() * 2.8 : 1.4 + Math.random() * 2.6,
        alpha: isBurst ? 0.95 : 0.72 + Math.random() * 0.25,
        decay: isBurst ? 0.022 + Math.random() * 0.015 : 0.016 + Math.random() * 0.014,
        color,
        isStar: Math.random() < (isBurst ? 0.5 : 0.32),
        rotation: Math.random() * Math.PI,
        rotationSpeed: (Math.random() - 0.5) * 0.08,
      });

      if (particlesRef.current.length > 90) {
        particlesRef.current.splice(0, particlesRef.current.length - 90);
      }
    };

    const isInteractiveElement = (target: EventTarget | null): boolean => {
      if (!(target instanceof Element)) return false;
      return Boolean(
        target.closest(
          'a, button, [role="button"], input, textarea, select, label[for], .cursor-pointer'
        )
      );
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
        prevPointerPos.current = { x: clientX, y: clientY };
        haloPos.current = { x: clientX, y: clientY };
      }

      const dx = clientX - prevPointerPos.current.x;
      const dy = clientY - prevPointerPos.current.y;
      const dist = Math.hypot(dx, dy);

      pointerPos.current = { x: clientX, y: clientY };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }

      // Check interactive hover target
      const hovering = isInteractiveElement(e.target);
      if (hovering !== interactiveRef.current) {
        interactiveRef.current = hovering;
        setIsHoveringInteractive(hovering);
      }

      // Add trail point
      trailRef.current.push({ x: clientX, y: clientY, age: 1 });
      if (trailRef.current.length > 22) {
        trailRef.current.shift();
      }

      // Spawn flowing shines proportional to pointer movement
      if (dist > 3) {
        const count = Math.min(3, Math.max(1, Math.floor(dist / 12)));
        for (let i = 0; i < count; i++) {
          const t = (i + 1) / (count + 1);
          const ix = prevPointerPos.current.x + dx * t;
          const iy = prevPointerPos.current.y + dy * t;
          spawnShine(ix, iy, dx * 0.15, dy * 0.15);
        }
        prevPointerPos.current = { x: clientX, y: clientY };
      }
    };

    const handleMouseDown = () => {
      setIsMouseDown(true);
      const { x, y } = pointerPos.current;
      if (visibleRef.current) {
        for (let i = 0; i < 9; i++) {
          spawnShine(x, y, 0, 0, { burst: true });
        }
      }
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    const handleMouseLeave = () => {
      visibleRef.current = false;
      setVisible(false);
      trailRef.current = [];
    };

    const handleMouseEnter = () => {
      visibleRef.current = true;
      setVisible(true);
    };

    const drawFourPointStar = (
      x: number,
      y: number,
      outerRadius: number,
      rotation: number,
      color: string,
      alpha: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();

      const innerRadius = outerRadius * 0.28;
      for (let i = 0; i < 4; i++) {
        const outerAngle = (i * Math.PI) / 2;
        const innerAngle = outerAngle + Math.PI / 4;
        if (i === 0) {
          ctx.moveTo(Math.cos(outerAngle) * outerRadius, Math.sin(outerAngle) * outerRadius);
        } else {
          ctx.lineTo(Math.cos(outerAngle) * outerRadius, Math.sin(outerAngle) * outerRadius);
        }
        ctx.lineTo(Math.cos(innerAngle) * innerRadius, Math.sin(innerAngle) * innerRadius);
      }
      ctx.closePath();

      ctx.fillStyle = `rgba(${color}, ${alpha})`;
      ctx.shadowColor = `rgba(${color}, ${alpha})`;
      ctx.shadowBlur = outerRadius * 2.5;
      ctx.fill();
      ctx.restore();
    };

    const render = (now: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Smooth spring interpolation for outer halo
      haloPos.current.x += (pointerPos.current.x - haloPos.current.x) * 0.18;
      haloPos.current.y += (pointerPos.current.y - haloPos.current.y) * 0.18;

      if (haloRef.current) {
        haloRef.current.style.transform = `translate3d(${haloPos.current.x}px, ${haloPos.current.y}px, 0)`;
      }

      // Occasional gentle sparkle while resting
      if (visibleRef.current && now - lastIdleSpawn > 240) {
        lastIdleSpawn = now;
        spawnShine(pointerPos.current.x, pointerPos.current.y, 0, -0.4);
      }

      // Draw flowing luminous ribbon trail
      if (trailRef.current.length > 1) {
        ctx.save();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        for (let i = 1; i < trailRef.current.length; i++) {
          const p0 = trailRef.current[i - 1];
          const p1 = trailRef.current[i];
          const progress = i / trailRef.current.length;
          const opacity = Math.min(p0.age, p1.age) * progress * 0.42;

          if (opacity > 0.01) {
            ctx.beginPath();
            ctx.moveTo(p0.x, p0.y);
            ctx.lineTo(p1.x, p1.y);
            ctx.strokeStyle = `rgba(220, 232, 218, ${opacity})`;
            ctx.lineWidth = progress * (interactiveRef.current ? 4.5 : 3);
            ctx.shadowColor = "rgba(212, 154, 97, 0.45)";
            ctx.shadowBlur = 10;
            ctx.stroke();
          }
        }
        ctx.restore();
      }

      // Age and prune trail points
      for (let i = trailRef.current.length - 1; i >= 0; i--) {
        trailRef.current[i].age -= 0.055;
        if (trailRef.current[i].age <= 0) {
          trailRef.current.splice(i, 1);
        }
      }

      // Update and draw flowing shines
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.rotation += p.rotationSpeed;
        p.alpha -= p.decay;

        if (p.alpha <= 0.01) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        if (p.isStar) {
          drawFourPointStar(p.x, p.y, p.size * 1.6, p.rotation, p.color, p.alpha);
        } else {
          ctx.save();
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.6);
          gradient.addColorStop(0, `rgba(${p.color}, ${p.alpha})`);
          gradient.addColorStop(0.45, `rgba(${p.color}, ${p.alpha * 0.45})`);
          gradient.addColorStop(1, `rgba(${p.color}, 0)`);

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.6, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    animationFrameId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Flowing Shines & Luminous Ribbon Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998]"
        aria-hidden="true"
      />

      {/* Spring-Lagging Outer Shimmer Halo */}
      <div
        ref={haloRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[9998] -ml-4 -mt-4 transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ willChange: "transform" }}
      >
        <div
          className={`w-8 h-8 rounded-full border transition-all duration-200 ${
            isMouseDown
              ? "scale-75 border-[#F4F1E8]/80 bg-[#D49A61]/20"
              : isHoveringInteractive
              ? "scale-150 border-[#D49A61]/70 bg-[#DCE8DA]/15 shadow-[0_0_24px_rgba(212,154,97,0.45)]"
              : "scale-100 border-[#DCE8DA]/35 bg-[#71866A]/10 shadow-[0_0_16px_rgba(113,134,106,0.3)]"
          }`}
        />
      </div>

      {/* Crisp Zero-Lag Shiny Core Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[9999] -ml-[5px] -mt-[5px] transition-opacity duration-150 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ willChange: "transform" }}
      >
        <div
          className={`w-[10px] h-[10px] rounded-full transition-transform duration-150 ${
            isMouseDown
              ? "scale-75 bg-[#F4F1E8]"
              : isHoveringInteractive
              ? "scale-125 bg-[#F4F1E8]"
              : "scale-100 bg-[#F4F1E8]"
          }`}
          style={{
            boxShadow: isHoveringInteractive
              ? "0 0 10px #F4F1E8, 0 0 22px rgba(212, 154, 97, 0.9), 0 0 38px rgba(220, 232, 218, 0.65)"
              : "0 0 8px #F4F1E8, 0 0 18px rgba(220, 232, 218, 0.75), 0 0 32px rgba(113, 134, 106, 0.5)",
          }}
        />
      </div>
    </>
  );
};
