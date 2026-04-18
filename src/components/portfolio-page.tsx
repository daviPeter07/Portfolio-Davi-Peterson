'use client';

import { Header } from '@/src/components/header';
import { Footer } from '@/src/components/footer';
import { BackToTopButton } from '@/src/components/back-to-top-button';
import {
  HeroSection,
  AboutSection,
  TechnologiesSection,
  ProjectsSection,
  ExperienceSection,
  ContactSection,
} from '@/src/sections';
import { useReveal } from '@/src/hooks/use-reveal';

export function PortfolioPage() {
  useReveal();

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <TechnologiesSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
      <BackToTopButton threshold={300} />
    </main>
  );
}
