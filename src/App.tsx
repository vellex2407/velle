/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { MotionConfig } from "motion/react";
import { Navbar } from "./components/layout/Navbar";
import { HeroSection } from "./components/hero/HeroSection";
import { AboutSection } from "./components/about/AboutSection";
import { ProjectGallery } from "./components/projects/ProjectGallery";
import { SkillsSection } from "./components/skills/SkillsSection";
import { JourneySection } from "./components/journey/JourneySection";
import { ContactSection } from "./components/contact/ContactSection";
import { Footer } from "./components/ui/Footer";
import { ForestAtmosphere } from "./components/ui/ForestAtmosphere";
import { ShinyCursor } from "./components/ui/ShinyCursor";
import { ProjectDetailModal } from "./components/projects/ProjectDetailModal";
import { ResumeModal } from "./components/modals/ResumeModal";
import { projectsData, Project } from "./data/projects";

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  const handleScrollTo = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-[#171F19] text-[#DCE8DA] selection:bg-[#71866A]/30 selection:text-[#F4F1E8]">
        {/* Custom Shiny Dot Cursor & Flowing Shines */}
        <ShinyCursor />

        {/* Ambient Forest Light Motes, Cursor Glow & Scroll Progress */}
        <ForestAtmosphere />

        {/* Top Sticky Navigation */}
        <Navbar
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenConnect={() => handleScrollTo("contact")}
        />

        {/* Main Content Sections */}
        <main className="relative z-[2]">
          {/* 01. Hero Section */}
          <HeroSection
            onExploreWork={() => handleScrollTo("projects")}
            onConnect={() => handleScrollTo("contact")}
          />

          {/* 02. About Me Section */}
          <AboutSection />

          {/* 03. Featured Projects Gallery */}
          <ProjectGallery
            onSelectProject={(project) => setSelectedProject(project)}
          />

          {/* 04. Technical Skills Section */}
          <SkillsSection />

          {/* 05. Milestones & Trajectory (Journey) */}
          <JourneySection />

          {/* 06. Contact & Call to Action */}
          <ContactSection
            onOpenResume={() => setIsResumeOpen(true)}
          />
        </main>

        {/* Footer */}
        <div className="relative z-[2]">
          <Footer
            onOpenResume={() => setIsResumeOpen(true)}
          />
        </div>

        {/* Interactive Project Detail Modal */}
        <ProjectDetailModal
          project={selectedProject}
          isOpen={Boolean(selectedProject)}
          onClose={() => setSelectedProject(null)}
          onSelectProject={(proj) => setSelectedProject(proj)}
          allProjects={projectsData}
        />

        {/* Interactive Curriculum Vitae Modal */}
        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />
      </div>
    </MotionConfig>
  );
}
