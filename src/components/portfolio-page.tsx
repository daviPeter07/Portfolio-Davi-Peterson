'use client';

import { Header } from '@/src/components/header';
import { Footer } from '@/src/components/footer';
import { AiAssistant } from '@/src/components/ai-assistant';
import {
  HeroSection,
  AboutSection,
  TechnologiesSection,
  ProjectsSection,
  ExperienceSection,
  ContactSection,
} from '@/src/sections';
import { useReveal } from '@/src/hooks/use-reveal';
import type { GithubRepo } from '@/src/lib/github-repos';

type PortfolioPageProps = {
  repos: GithubRepo[];
};

export function PortfolioPage({ repos }: PortfolioPageProps) {
  useReveal();

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <TechnologiesSection />
      <ExperienceSection />
      <ProjectsSection repos={repos} />
      <ContactSection />
      <Footer />
      <AiAssistant repos={repos} />
    </main>
  );
}
