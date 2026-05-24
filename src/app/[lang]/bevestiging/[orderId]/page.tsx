import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function BevestigingPage({
  params: { lang, orderId },
}: {
  params: { lang: string; orderId: string };
}) {
  const t = useTranslations('confirmation');

  return (
    <div className="min-h-screen bg-carpetz-bg flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="card py-12">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold mb-2">{t('title')}</h1>
          <p className="text-gray-500 mb-6">{t('subtitle')}</p>

          <div className="bg-carpetz-bg rounded-xl p-4 mb-8">
            <p className="text-sm text-gray-500">{t('order_number')}</p>
            <p className="font-mono font-bold text-lg text-carpetz-primary">#{orderId.slice(0, 8).toUpperCase()}</p>
          </div>

          <h2 className="font-semibold mb-4">{t('what_next')}</h2>
          <div className="space-y-3 text-left mb-8">
            {[t('step1'), t('step2'), t('step3')].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-carpetz-primary text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-sm text-gray-600">{step}</p>
              </div>
            ))}
          </div>

          <Link href={`/${lang}`} className="btn-primary inline-block">
            {t('back_home')}
          </Link>
        </div>
      </div>
    </div>
  );
}
