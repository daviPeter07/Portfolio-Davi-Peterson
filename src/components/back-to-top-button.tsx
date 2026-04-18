'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { useI18n } from '@/src/components/i18n-provider';

type BackToTopButtonProps = {
  threshold?: number;
};

export function BackToTopButton({ threshold = 300 }: BackToTopButtonProps) {
  const [visible, setVisible] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const { dictionary } = useI18n();

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      setVisible(y > threshold);
      if (scrolling && y <= 0) {
        setScrolling(false);
        document.body.classList.remove('scrolling-smooth');
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const scrollTop = () => {
    setScrolling(true);
    document.body.classList.add('scrolling-smooth');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const tick = () => {
      if (window.scrollY > 0) {
        requestAnimationFrame(tick);
      } else {
        setScrolling(false);
        document.body.classList.remove('scrolling-smooth');
      }
    };
    requestAnimationFrame(tick);
  };

  return (
    <Button
      size="icon"
      aria-label={dictionary.common.backToTop}
      onClick={scrollTop}
      className={`fixed bottom-6 right-6 z-50 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      } size-16 ${scrolling ? 'ring-2 ring-primary/30 animate-spin [animation-duration:1s]' : ''}`}
    >
      <ArrowUp className="h-6 w-6" />
    </Button>
  );
}
