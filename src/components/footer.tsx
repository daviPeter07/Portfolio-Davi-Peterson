'use client';

import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { useI18n } from '@/src/components/i18n-provider';
import { sectionIds, type SectionId } from '@/src/constants/section-ids';

export function Footer() {
  const { dictionary } = useI18n();

  const scrollToSection = (sectionId: SectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const mailHref = `mailto:davipetersondev173@gmail.com?subject=${encodeURIComponent(
    dictionary.footer.mailSubject
  )}&body=${encodeURIComponent(dictionary.footer.mailBody)}`;

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center text-center">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">{dictionary.common.siteName}</h3>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              {dictionary.footer.description}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{dictionary.footer.quickLinks}</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection(sectionIds.home)}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {dictionary.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection(sectionIds.about)}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {dictionary.nav.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection(sectionIds.projects)}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {dictionary.nav.projects}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection(sectionIds.contact)}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {dictionary.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{dictionary.footer.social}</h4>
            <div className="flex justify-center space-x-4">
              <a
                href="https://github.com/daviPeter07"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/davipeterson/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={mailHref}
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Rodapé final */}
        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            {dictionary.footer.madeWith} <Heart className="h-4 w-4 text-red-500" />{' '}
            {dictionary.footer.andCoffee} {dictionary.common.siteName} © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
