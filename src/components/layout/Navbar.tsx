import React, { useState, useEffect } from "react";
import { Menu, X, FileText } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  onOpenResume: () => void;
  onOpenConnect: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onOpenConnect }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ["hero", "about", "projects", "skills", "journey", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero", id: "hero" },
    { name: "About", href: "#about", id: "about" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Journey", href: "#journey", id: "journey" },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#171F19]/90 backdrop-blur-md border-b border-[#304A39]/80 py-3.5 shadow-lg shadow-black/20"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8">
            {/* Zone 1: Brand Wordmark Logo */}
            <motion.a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#hero");
              }}
              aria-label="VELLE — Back to top"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center shrink-0 transition-opacity hover:opacity-95"
            >
              <img
                src="/assets/velle-logo.png"
                alt="VELLE"
                className="h-11 sm:h-12 w-auto object-contain select-none drop-shadow-[0_2px_10px_rgba(244,241,232,0.12)]"
              />
            </motion.a>

            {/* Zone 2: Navigation Links with Sliding Active Indicator */}
            <nav className="hidden md:flex items-center gap-7 text-xs font-mono-tech tracking-wider uppercase">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`relative py-1 whitespace-nowrap shrink-0 transition-colors ${
                      isActive
                        ? "text-[#F4F1E8] font-medium"
                        : "text-[#A6B59D] hover:text-[#DCE8DA]"
                    }`}
                  >
                    <motion.span
                      className="inline-block"
                      whileHover={{ y: -1 }}
                      transition={{ duration: 0.15 }}
                    >
                      {link.name}
                    </motion.span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-underline"
                        transition={{ type: "spring", stiffness: 320, damping: 28 }}
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#71866A] rounded-full"
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Zone 3: Actions */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <motion.button
                onClick={onOpenResume}
                whileHover={{ y: -1.5 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono-tech uppercase tracking-wider text-[#DCE8DA] hover:text-[#F4F1E8] bg-[#243D30]/60 hover:bg-[#304A39] border border-[#304A39] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <FileText className="w-3.5 h-3.5 text-[#71866A]" />
                <span>Resume</span>
              </motion.button>

              <motion.button
                onClick={onOpenConnect}
                whileHover={{ y: -1.5 }}
                whileTap={{ scale: 0.97 }}
                className="px-4 py-2 text-xs font-mono-tech uppercase tracking-wider text-[#171F19] bg-[#71866A] hover:bg-[#DCE8DA] rounded-lg font-medium transition-colors shadow-sm shadow-black/20 hover:shadow-[#71866A]/20 cursor-pointer whitespace-nowrap shrink-0"
              >
                Let&apos;s Connect
              </motion.button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#DCE8DA] hover:text-[#F4F1E8] hover:bg-[#304A39]/50 rounded-lg transition-colors cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-30 md:hidden bg-[#171F19]/95 backdrop-blur-xl pt-24 px-6 pb-8 flex flex-col justify-between border-b border-[#304A39]"
          >
            <nav className="flex flex-col space-y-4">
              <span className="text-[11px] font-mono-tech uppercase tracking-widest text-[#71866A] mb-2">
                Navigation
              </span>
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`text-2xl font-editorial tracking-wide transition-colors ${
                      isActive ? "text-[#F4F1E8] font-semibold" : "text-[#A6B59D] hover:text-[#DCE8DA]"
                    }`}
                  >
                    {link.name}
                  </motion.a>
                );
              })}
            </nav>

            <div className="pt-8 border-t border-[#304A39] flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 text-xs font-mono-tech uppercase tracking-wider text-[#DCE8DA] bg-[#243D30] border border-[#304A39] rounded-xl"
              >
                <FileText className="w-4 h-4 text-[#71866A]" />
                <span>View Curriculum Vitae</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConnect();
                }}
                className="w-full py-3 text-xs font-mono-tech uppercase tracking-wider text-[#171F19] bg-[#71866A] rounded-xl font-medium"
              >
                Let&apos;s Connect
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
