'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export default function Header({ lang }: { lang: string }) {
  const t = useTranslations('nav');
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const switchLang = (newLang: string) => {
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
    router.push(newPath);
  };

  const navLinks = [
    { href: `/${lang}`, label: t('home') },
    { href: `/${lang}/configurator`, label: t('configurator') },
    { href: `/${lang}/over-ons`, label: t('about') },
    { href: `/${lang}/faq`, label: t('faq') },
    { href: `/${lang}/contact`, label: t('contact') },
  ];

  return (
    <header className="bg-carpetz-dark sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <span className="text-white font-semibold text-lg tracking-wide">Carpetz</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/80 hover:text-white text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Language switcher */}
          <div className="flex items-center gap-1 bg-white/10 rounded-lg p-1">
            {['nl', 'fr'].map((l) => (
              <button
                key={l}
                onClick={() => switchLang(l)}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  lang === l ? 'bg-white text-carpetz-dark' : 'text-white/80 hover:text-white'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* CTA */}
          <Link
            href={`/${lang}/configurator`}
            className="hidden md:block bg-white text-carpetz-primary px-4 py-2 rounded-lg text-sm font-semibold hover:bg-carpetz-light transition-colors"
          >
            {lang === 'nl' ? 'Bestellen' : 'Commander'}
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-carpetz-dark border-t border-white/10 px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-white/80 hover:text-white py-3 text-base border-b border-white/10 last:border-0"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={`/${lang}/configurator`}
            className="block mt-4 btn-primary text-center"
            onClick={() => setMenuOpen(false)}
          >
            {lang === 'nl' ? 'Start uw configuratie' : 'Commencez votre configuration'}
          </Link>
        </div>
      )}
    </header>
  );
}
