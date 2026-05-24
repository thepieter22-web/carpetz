'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function CookieBanner() {
  const t = useTranslations('cookie');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('carpetz_cookie_consent');
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('carpetz_cookie_consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('carpetz_cookie_consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4 md:p-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
        <p className="text-sm text-gray-600 flex-1">
          {t('message')}{' '}
          <Link href="#" className="text-carpetz-primary underline">{t('more')}</Link>
        </p>
        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={decline}
            className="flex-1 md:flex-none px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {t('decline')}
          </button>
          <button
            onClick={accept}
            className="flex-1 md:flex-none px-4 py-2 text-sm bg-carpetz-primary text-white rounded-lg hover:bg-carpetz-dark transition-colors"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
