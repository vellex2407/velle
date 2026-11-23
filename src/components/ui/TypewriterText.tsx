import React, { useEffect, useState } from "react";

interface TypewriterTextProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  phrases,
  typingSpeed = 42,
  deletingSpeed = 24,
  pauseDuration = 2800,
  className = "",
}) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || phrases.length === 0) return;

    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting && charIndex === currentPhrase.length) {
      const pauseTimer = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [
    charIndex,
    isDeleting,
    phraseIndex,
    phrases,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    prefersReducedMotion,
  ]);

  if (phrases.length === 0) return null;

  const displayedText = prefersReducedMotion
    ? phrases[0]
    : phrases[phraseIndex].slice(0, charIndex);

  return (
    <span className={`inline ${className}`} aria-live="polite">
      <span>{displayedText}</span>
      {!prefersReducedMotion && (
        <span
          className="inline-block w-[2px] h-[0.82em] ml-1.5 bg-[#71866A] animate-pulse align-baseline translate-y-[0.06em]"
          aria-hidden="true"
        />
      )}
    </span>
  );
};
