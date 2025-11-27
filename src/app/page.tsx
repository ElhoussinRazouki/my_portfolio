"use client";

import React, { useEffect } from "react";
import PortfolioHero from "@/components/portfolio-hero";
import SkillsSection from "@/components/skills-section";
import ExperienceSection from "@/components/experience-section";
import ProjectsSection from "@/components/projects-section";
import EducationSection from "@/components/education-section";
import ContactSection from "@/components/contact-section";
import { useAnalyticsTracking } from "@/hooks/useAnalyticsTracking";
import { trackSectionView } from "@/lib/analytics";

export default function Home() {
  useAnalyticsTracking("Portfolio Home");

  useEffect(() => {
    // Track initial page view
    trackSectionView("home");
  }, []);

  return (
    <main className="min-h-screen">
      <PortfolioHero />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <EducationSection />
      <ContactSection />
    </main>
  );
}
