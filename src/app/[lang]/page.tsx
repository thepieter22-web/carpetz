import { useTranslations } from 'next-intl';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  return {
    title: lang === 'nl' ? 'Carpetz — Logomatten op maat | Benelux' : 'Carpetz — Tapis logo sur mesure | Benelux',
    description: lang === 'nl'
      ? 'Bestel uw gepersonaliseerde logomat vanaf 1 stuk. Levering in 48u in de Benelux. Configureer nu online.'
      : 'Commandez votre tapis logo personnalisé à partir d\'1 pièce. Livraison en 48h au Benelux.',
  };
}

const REVIEWS = [
  { name: 'Thomas V.', rating: 5, comment: 'Uitstekende kwaliteit! Onze inkommat ziet er professioneel uit.', company: 'V&D Architecten' },
  { name: 'Sarah M.', rating: 5, comment: 'Snelle levering en perfect resultaat. Zeker aanbevelen!', company: 'Café Madeleine' },
  { name: 'Jean-Pierre D.', rating: 5, comment: 'Très bonne qualité, livraison rapide. Je recommande!', company: 'Boucherie Dupont' },
];

export default function HomePage({ params: { lang } }: { params: { lang: string } }) {
  const t = useTranslations();

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-carpetz-dark to-carpetz-primary text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <span className="inline-block bg-white/20 text-white text-sm px-4 py-1.5 rounded-full mb-6 font-medium">
              {t('hero.badge')}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${lang}/configurator`}
                className="bg-white text-carpetz-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-carpetz-light transition-colors text-center"
              >
                {t('hero.cta')} →
              </Link>
              <Link
                href={`/${lang}/over-ons`}
                className="border-2 border-white/40 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors text-center"
              >
                {t('hero.secondary')}
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 mt-10 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {t('hero.delivery')}
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {t('hero.minimum')}
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {t('hero.benelux')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="section-title text-center mb-12">
          {lang === 'nl' ? 'Hoe werkt het?' : 'Comment ça marche?'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: lang === 'nl' ? 'Configureer uw mat' : 'Configurez votre tapis',
              desc: lang === 'nl' ? 'Kies formaat, kleuren en upload uw logo. Zie direct een preview.' : 'Choisissez le format, les couleurs et téléchargez votre logo.',
            },
            {
              step: '02',
              title: lang === 'nl' ? 'Betaal veilig' : 'Payez en sécurité',
              desc: lang === 'nl' ? 'Betaal via Bancontact, iDEAL, Visa of Apple Pay.' : 'Payez via Bancontact, iDEAL, Visa ou Apple Pay.',
            },
            {
              step: '03',
              title: lang === 'nl' ? 'Ontvang uw mat' : 'Recevez votre tapis',
              desc: lang === 'nl' ? 'Levering binnen 48u na productie in de Benelux.' : 'Livraison en 48h après production au Benelux.',
            },
          ].map((item) => (
            <div key={item.step} className="card text-center">
              <div className="w-12 h-12 rounded-full bg-carpetz-light text-carpetz-primary font-bold text-lg flex items-center justify-center mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="section-title text-center mb-12">{t('reviews.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((review, i) => (
              <div key={i} className="card">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{review.comment}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-carpetz-light flex items-center justify-center text-carpetz-primary font-semibold text-sm">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{review.name}</p>
                    <p className="text-xs text-gray-400">{review.company} · {t('reviews.verified')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-carpetz-primary text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {lang === 'nl' ? 'Klaar om uw logomat te ontwerpen?' : 'Prêt à concevoir votre tapis logo?'}
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            {lang === 'nl' ? 'Vanaf 1 stuk, levering in 48u' : 'À partir d\'1 pièce, livraison en 48h'}
          </p>
          <Link
            href={`/${lang}/configurator`}
            className="bg-white text-carpetz-primary px-10 py-4 rounded-xl font-bold text-lg hover:bg-carpetz-light transition-colors inline-block"
          >
            {lang === 'nl' ? 'Start uw configuratie →' : 'Commencez votre configuration →'}
          </Link>
        </div>
      </section>
    </div>
  );
}
