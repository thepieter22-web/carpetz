import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Footer({ lang }: { lang: string }) {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-carpetz-dark text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white font-bold">C</span>
              </div>
              <span className="font-semibold text-lg">Carpetz</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">{t('tagline')}</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-white/80">{t('links')}</h3>
            <ul className="space-y-2">
              {[
                { href: `/${lang}`, label: lang === 'nl' ? 'Home' : 'Accueil' },
                { href: `/${lang}/configurator`, label: lang === 'nl' ? 'Configurator' : 'Configurateur' },
                { href: `/${lang}/over-ons`, label: lang === 'nl' ? 'Over ons' : 'À propos' },
                { href: `/${lang}/faq`, label: 'FAQ' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-white/80">{t('legal')}</h3>
            <ul className="space-y-2">
              {[
                { href: `/${lang}/privacybeleid`, label: t('privacy') },
                { href: `/${lang}/algemene-voorwaarden`, label: t('terms') },
                { href: `/${lang}/retourbeleid`, label: t('returns') },
                { href: `/${lang}/cookiebeleid`, label: t('cookies') },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-white/80">{t('contact')}</h3>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>info@carpetz.be</li>
              <li>+32 (0)000 00 00 00</li>
              <li>Straat 1, 0000 Stad</li>
              <li>BTW: BE0000000000</li>
              <li>KBO: 0000.000.000</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-white/40 text-xs">
          <p>© {year} Carpetz. {t('rights')}.</p>
          <div className="flex items-center gap-4">
            <span>Bancontact</span>
            <span>iDEAL</span>
            <span>Visa</span>
            <span>Mastercard</span>
            <span>Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
