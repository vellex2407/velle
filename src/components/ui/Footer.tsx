import React from "react";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { profileData } from "../../data/profile";

interface FooterProps {
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[#304A39]/80 bg-[#171F19] text-[#A6B59D] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#304A39]/50">
          
          {/* Brand & Creative Statement */}
          <div className="space-y-2">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              aria-label="VELLE — Back to top"
              className="inline-block transition-transform hover:scale-[1.03]"
            >
              <img
                src="/assets/velle-logo.png"
                alt="VELLE"
                className="h-16 sm:h-20 w-auto object-contain select-none"
              />
            </a>
            <p className="text-xs text-[#A6B59D] font-mono-tech">
              &ldquo;Rooted in curiosity. Built with purpose.&rdquo;
            </p>
          </div>

          {/* Quick Nav Links */}
          <nav className="flex flex-wrap items-center gap-6 text-xs font-mono-tech uppercase">
            <a href="#about" className="hover:text-[#F4F1E8] transition-colors">
              About
            </a>
            <a href="#projects" className="hover:text-[#F4F1E8] transition-colors">
              Projects
            </a>
            <a href="#skills" className="hover:text-[#F4F1E8] transition-colors">
              Skills
            </a>
            <a href="#journey" className="hover:text-[#F4F1E8] transition-colors">
              Journey
            </a>
            <button
              onClick={onOpenResume}
              className="hover:text-[#F4F1E8] transition-colors cursor-pointer text-left"
            >
              Resume
            </button>
          </nav>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 self-start md:self-auto text-xs font-mono-tech uppercase text-[#DCE8DA] hover:text-[#F4F1E8] p-2 rounded-lg bg-[#243D30]/40 hover:bg-[#304A39] border border-[#304A39] transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#71866A]" />
          </button>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech">
          <div>
            <span>{profileData.name} · {profileData.degree}</span>
            <span className="mx-2 text-[#304A39]">/</span>
            <span>{profileData.university}</span>
          </div>

          <div className="flex items-center gap-4 text-[#A6B59D]">
            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F4F1E8] transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F4F1E8] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${profileData.email}`}
              className="hover:text-[#F4F1E8] transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
