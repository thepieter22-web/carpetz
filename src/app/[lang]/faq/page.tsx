'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const FAQS = ['1','2','3','4','5','6'];

export default function FaqPage() {
  const t = useTranslations('faq');
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>
      <div className="space-y-3">
        {FAQS.map((n) => (
          <div key={n} className="card cursor-pointer" onClick={() => setOpen(open === n ? null : n)}>
            <div className="flex items-center justify-between">
              <p className="font-medium">{t(`q${n}` as any)}</p>
              <span className="text-carpetz-primary text-xl">{open === n ? '−' : '+'}</span>
            </div>
            {open === n && <p className="text-gray-600 text-sm mt-3 leading-relaxed">{t(`a${n}` as any)}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
