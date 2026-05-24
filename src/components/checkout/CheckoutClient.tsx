'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { calculatePrice, formatPrice } from '@/lib/pricing';

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  address: z.string().min(5),
  city: z.string().min(2),
  postalCode: z.string().min(4),
  country: z.enum(['BE', 'NL', 'LU']),
  isCompany: z.boolean(),
  companyName: z.string().optional(),
  vatNumber: z.string().optional(),
  termsAccepted: z.literal(true),
});

type FormData = z.infer<typeof schema>;

export default function CheckoutClient({ lang }: { lang: string }) {
  const t = useTranslations('checkout');
  const store = useConfiguratorStore();
  const [loading, setLoading] = useState(false);
  const [isCompany, setIsCompany] = useState(false);

  const pricing = calculatePrice(store.width, store.height, store.quantity, [], isCompany);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { country: 'BE', isCompany: false, termsAccepted: true },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      // Upload logo to Supabase first
      let logoUrl = store.logoUrl || '';
      if (store.logoFile) {
        const formData = new FormData();
        formData.append('file', store.logoFile);
        const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
        const uploadData = await uploadRes.json();
        logoUrl = uploadData.url;
      }

      // Create order and Mollie payment
      const res = await fetch('/api/mollie/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: data,
          mat: {
            type: store.type,
            placement: store.placement,
            orientation: store.orientation,
            border: store.border,
            width: store.width,
            height: store.height,
            matColor: store.matColor,
            logoColor: store.logoColor,
            logoUrl,
          },
          quantity: store.quantity,
          pricing,
          locale: lang,
        }),
      });

      const { checkoutUrl } = await res.json();
      if (checkoutUrl) window.location.href = checkoutUrl;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-carpetz-bg">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">{t('title')}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              {/* Company toggle */}
              <div className="card">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('isCompany')}
                    onChange={(e) => setIsCompany(e.target.checked)}
                    className="w-5 h-5 rounded accent-carpetz-primary"
                  />
                  <span className="font-medium">{t('is_company')}</span>
                </label>
              </div>

              {/* Personal info */}
              <div className="card">
                <h2 className="font-semibold text-lg mb-4">{t('personal_info')}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">{t('first_name')} *</label>
                    <input {...register('firstName')} className="input-field" />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">Verplicht veld</p>}
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">{t('last_name')} *</label>
                    <input {...register('lastName')} className="input-field" />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">Verplicht veld</p>}
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">{t('email')} *</label>
                    <input {...register('email')} type="email" className="input-field" autoComplete="email" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">Geldig e-mailadres vereist</p>}
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">{t('phone')} *</label>
                    <input {...register('phone')} type="tel" className="input-field" autoComplete="tel" />
                  </div>
                </div>
              </div>

              {/* Company info */}
              {isCompany && (
                <div className="card">
                  <h2 className="font-semibold text-lg mb-4">{t('company_info')}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">{t('company_name')} *</label>
                      <input {...register('companyName')} className="input-field" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">{t('vat_number')}</label>
                      <input {...register('vatNumber')} className="input-field" placeholder={t('vat_placeholder')} />
                    </div>
                  </div>
                </div>
              )}

              {/* Delivery address */}
              <div className="card">
                <h2 className="font-semibold text-lg mb-4">
                  {lang === 'nl' ? 'Leveringsadres' : 'Adresse de livraison'}
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">{t('address')} *</label>
                    <input {...register('address')} className="input-field" autoComplete="street-address" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">{t('postal_code')} *</label>
                      <input {...register('postalCode')} className="input-field" autoComplete="postal-code" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">{t('city')} *</label>
                      <input {...register('city')} className="input-field" autoComplete="address-level2" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">{t('country')} *</label>
                    <select {...register('country')} className="input-field bg-white">
                      <option value="BE">{t('belgium')}</option>
                      <option value="NL">{t('netherlands')}</option>
                      <option value="LU">{t('luxembourg')}</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="card">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('termsAccepted')}
                    className="mt-1 w-5 h-5 accent-carpetz-primary"
                  />
                  <span className="text-sm text-gray-600">
                    {t('terms_agree')}{' '}
                    <a href={`/${lang}/algemene-voorwaarden`} className="text-carpetz-primary underline" target="_blank">
                      {lang === 'nl' ? 'Algemene voorwaarden' : 'Conditions générales'}
                    </a>
                    {' & '}
                    <a href={`/${lang}/privacybeleid`} className="text-carpetz-primary underline" target="_blank">
                      {lang === 'nl' ? 'Privacybeleid' : 'Politique de confidentialité'}
                    </a>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-4 text-lg font-bold flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {lang === 'nl' ? 'Doorverwijzen...' : 'Redirection...'}
                  </>
                ) : (
                  <>🔒 {t('pay_now')}</>
                )}
              </button>
            </form>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h2 className="font-semibold text-lg mb-4">{t('order_summary')}</h2>

              {store.logoUrl && (
                <div
                  className="rounded-lg flex items-center justify-center mb-4 overflow-hidden"
                  style={{ backgroundColor: store.matColor, height: '100px' }}
                >
                  <img src={store.logoUrl} alt="Logo" className="h-16 object-contain" />
                </div>
              )}

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">{lang === 'nl' ? 'Formaat' : 'Format'}</span>
                  <span>{store.width} × {store.height} cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{lang === 'nl' ? 'Type' : 'Type'}</span>
                  <span>{store.type === 'indoor' ? (lang === 'nl' ? 'Binnen' : 'Intérieur') : (lang === 'nl' ? 'Buiten' : 'Extérieur')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{lang === 'nl' ? 'Aantal' : 'Quantité'}</span>
                  <span>{store.quantity}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{lang === 'nl' ? 'Subtotaal' : 'Sous-total'}</span>
                  <span>{formatPrice(pricing.priceExclVat)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>BTW (21%)</span>
                  <span>{formatPrice(pricing.vatAmount)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                  <span>Totaal</span>
                  <span className="text-carpetz-primary">{formatPrice(pricing.priceInclVat)}</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-xs text-green-700 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  {lang === 'nl' ? 'Veilige betaling via Mollie' : 'Paiement sécurisé via Mollie'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
