'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('contact');
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async () => {
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setSent(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
      <p className="text-gray-500 mb-8">{t('subtitle')}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card">
          {sent ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">✓</div>
              <p className="font-medium text-green-600">{t('sent')}</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">{t('name')}</label>
                <input className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">{t('email')}</label>
                <input type="email" className="input-field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">{t('message')}</label>
                <textarea rows={5} className="input-field resize-none" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </div>
              <button onClick={handleSubmit} className="btn-primary w-full">{t('send')}</button>
            </div>
          )}
        </div>
        <div className="space-y-4">
          {[
            { label: t('email_title'), value: 'info@carpetz.be', icon: '✉️' },
            { label: t('phone_title'), value: '+32 (0)000 00 00 00', icon: '📞' },
            { label: t('address_title'), value: 'Straat 1, 0000 Stad, België', icon: '📍' },
          ].map((item) => (
            <div key={item.label} className="card flex items-start gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
                <p className="font-medium">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
