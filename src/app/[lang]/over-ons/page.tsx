import { useTranslations } from 'next-intl';

export default function OverOnsPage() {
  const t = useTranslations('about');
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
      <p className="text-xl text-carpetz-primary mb-8">{t('subtitle')}</p>
      <div className="card mb-8">
        <p className="text-gray-600 leading-relaxed">{t('story')}</p>
      </div>
      <h2 className="text-2xl font-semibold mb-6">{t('values_title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: '⭐', title: t('value1_title'), desc: t('value1') },
          { icon: '🚀', title: t('value2_title'), desc: t('value2') },
          { icon: '🎨', title: t('value3_title'), desc: t('value3') },
        ].map((v) => (
          <div key={v.title} className="card text-center">
            <div className="text-4xl mb-3">{v.icon}</div>
            <h3 className="font-semibold mb-2">{v.title}</h3>
            <p className="text-gray-500 text-sm">{v.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
