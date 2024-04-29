import i18nConfig from '@/i18nConfig';
import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { dir } from 'i18next';
import Header from '@/components/Header/Header';
import TranslationsProvider from '@/components/TranslationsProvider/TranslationProvider';
import initTranslations from '../i18n';
import Footer from '@/components/Footer/Footer';

const i18nNamespaces = ['home'];

export const metadata: Metadata = {
  title: `Let's Talk About IT`,
  description: "Landing page for Let's Talk About IT project",
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <html lang={locale} dir={dir(locale)}>
      <body className="overflow-x-hidden">
        <TranslationsProvider
          namespaces={i18nNamespaces}
          locale={locale}
          resources={resources}
        >
          <Header />
          {children}
          <Footer />
        </TranslationsProvider>
      </body>
    </html>
  );
}