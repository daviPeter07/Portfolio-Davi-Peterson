'use client';

import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { useI18n } from '@/src/components/i18n-provider';
import { Button } from '@/src/components/ui/button';
import { sectionIds } from '@/src/constants/section-ids';

export function HeroSection() {
  const { dictionary } = useI18n();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const mailHref = `mailto:davipetersondev173@gmail.com?subject=${encodeURIComponent(
    dictionary.hero.mailSubject
  )}&body=${encodeURIComponent(dictionary.hero.mailBody)}`;

  return (
    <section
      id={sectionIds.home}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="container mx-auto px-4 text-center">
        <div
          data-reveal
          className="transition-all duration-1000 opacity-0 translate-y-10 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0"
        >
          <div className="mb-8">
            <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-linear-to-br from-primary to-accent overflow-hidden">
              <img
                src="/meProfessional.jpg"
                alt={dictionary.common.siteName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {dictionary.hero.title}{' '}
            <span className="text-primary-text">{dictionary.common.siteName}</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {dictionary.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => scrollToSection(sectionIds.projects)}
            >
              {dictionary.hero.primaryCta}
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary dark:border-primary text-primary-text hover:bg-primary hover:text-primary-foreground transition-colors duration-300 bg-transparent"
            >
              <a href="/Davi Peterson.pdf" download>
                {dictionary.hero.secondaryCta}
              </a>
            </Button>
          </div>

          <div className="flex justify-center gap-2 mb-12">
            <a
              href="https://github.com/daviPeter07"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={dictionary.common.github}
              className="inline-flex size-11 items-center justify-center text-muted-foreground hover:text-primary-text transition-colors"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/davipeterson/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex size-11 items-center justify-center text-muted-foreground hover:text-primary-text transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href={mailHref}
              aria-label={dictionary.common.sendEmail}
              className="inline-flex size-11 items-center justify-center text-muted-foreground hover:text-primary-text transition-colors"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollToSection(sectionIds.about)}
        aria-label={dictionary.common.scrollDown}
        className="absolute bottom-6 left-1/2 flex size-11 transform -translate-x-1/2 items-center justify-center animate-bounce"
      >
        <ArrowDown className="h-6 w-6 text-primary-text" />
      </button>
    </section>
  );
}
