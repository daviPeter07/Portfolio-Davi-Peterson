import type React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from '@/src/components/theme-provider';
import { I18nProvider } from '@/src/components/i18n-provider';
import {
  defaultLocale,
  getDictionary,
  hasLocale,
  localeToHtmlLang,
  localeToOpenGraph,
  locales,
  type Locale,
} from '@/src/lib/i18n';
import '../globals.css';

const siteUrl = 'https://davi-peterson.vercel.app';
const ogImage =
  'https://opengraph.b-cdn.net/production/images/45e1268b-86cd-49db-8d44-b2d2246f74a4.jpg?token=zBXpmuoggtRcZn5tWqDYOY5iKnD-XB7wnOGGJ6sEuMg&height=299&width=1200&expires=33291618338';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(locale)) {
    return {};
  }

  const dictionary = await getDictionary(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    keywords: dictionary.metadata.keywords,
    icons: {
      icon: '/meProfessional.jpg',
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        pt: '/pt',
        en: '/en',
        es: '/es',
        'x-default': `/${defaultLocale}`,
      },
    },
    openGraph: {
      title: dictionary.metadata.title,
      description: dictionary.metadata.description,
      url: `/${locale}`,
      type: 'website',
      locale: localeToOpenGraph[locale],
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: dictionary.metadata.title,
      description: dictionary.metadata.description,
      images: [ogImage],
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Davi Peterson',
    url: `${siteUrl}/${locale}`,
    image: '/meProfessional.jpg',
    email: 'mailto:davipetersondev173@gmail.com',
    sameAs: ['https://www.linkedin.com/in/davipeterson/', 'https://github.com/daviPeter07'],
    jobTitle: dictionary.metadata.jobTitle,
  };

  return (
    <html lang={localeToHtmlLang[locale]} suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <I18nProvider dictionary={dictionary} locale={locale as Locale}>
            {children}
          </I18nProvider>
          <Analytics />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
