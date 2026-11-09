'use client';

import { ArrowDown, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { useI18n } from '@/src/components/i18n-provider';
import { Button } from '@/src/components/ui/button';
import { experiences } from '@/src/constants/experiences';
import { sectionIds } from '@/src/constants/section-ids';
import Image from 'next/image';

export function HeroSection() {
  const { dictionary } = useI18n();
  const [currentExperience] = experiences;

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
      className="min-h-svh flex items-center justify-center relative overflow-hidden pt-24 pb-20 short:pb-8"
    >
      <div className="container mx-auto px-4 text-center">
        <div className="hero-enter">
          <div className="size-40 short:size-28 mx-auto mb-6 short:mb-3 rounded-full bg-linear-to-br from-primary to-accent overflow-hidden">
            <Image
              src="/davi-peterson.jpg"
              alt={dictionary.common.siteName}
              className="w-full h-full object-cover"
              width={160}
              height={160}
            />
          </div>

          <p className="text-lg text-muted-foreground mb-1">{dictionary.hero.title}</p>
          <h1 className="text-4xl md:text-6xl short:md:text-5xl font-bold text-primary-text mb-3">
            {dictionary.common.siteName}
          </h1>
          <p className="text-2xl md:text-3xl short:md:text-2xl font-semibold mb-3 short:mb-2">
            {dictionary.hero.role}
          </p>

          {/* <p className="text-lg md:text-xl text-muted-foreground mb-3 short:mb-2 max-w-2xl mx-auto text-balance">
            {dictionary.hero.subtitle}
          </p> */}

          {/* <p className="text-sm text-muted-foreground mb-8 short:mb-4 text-balance">
            <MapPin className="inline h-4 w-4 mr-1.5 align-text-bottom" />
            {dictionary.hero.currentlyAt} {currentExperience.company}
          </p> */}

          <div className="flex flex-col sm:flex-row gap-4 short:gap-3 justify-center items-center mb-6 short:mb-3">
            <Button
              size="lg"
              className="h-11 bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => scrollToSection(sectionIds.projects)}
            >
              {dictionary.hero.primaryCta}
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-11 border-primary dark:border-primary text-primary-text hover:bg-primary hover:text-primary-foreground transition-colors duration-300 bg-transparent"
            >
              <a href="/Davi Peterson.pdf" download>
                {dictionary.hero.secondaryCta}
              </a>
            </Button>
          </div>

          <div className="flex justify-center gap-2">
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
        className="absolute bottom-6 left-1/2 flex short:hidden size-11 transform -translate-x-1/2 items-center justify-center animate-bounce"
      >
        <ArrowDown className="h-6 w-6 text-primary-text" />
      </button>
    </section>
  );
}
