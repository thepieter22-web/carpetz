'use client';

import { useState, useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { calculatePrice, formatPrice } from '@/lib/pricing';
import { PREDEFINED_SIZES, MAT_COLORS } from '@/types';

export default function ConfiguratorClient({ lang }: { lang: string }) {
  const t = useTranslations('configurator');
  const router = useRouter();
  const store = useConfiguratorStore();
  const [useCustomSize, setUseCustomSize] = useState(false);
  const [generatingAi, setGeneratingAi] = useState(false);
  const [aiError, setAiError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const pricing = calculatePrice(store.width, store.height, store.quantity, [], store.isCompany);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    store.setLogoFile(file, url);
  }, [store]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/png': [], 'image/svg+xml': [], 'image/jpeg': [] },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
  });

  const generateAiPreview = async () => {
    if (!store.logoUrl) return;
    setGeneratingAi(true);
    setAiError('');
    try {
      const res = await fetch('/api/ai-preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          matColor: store.matColor,
          matType: store.type,
          width: store.width,
          height: store.height,
        }),
      });
      const data = await res.json();
      if (data.url) store.setAiPreviewUrl(data.url);
      else setAiError('Kon geen preview genereren. Probeer opnieuw.');
    } catch {
      setAiError('Fout bij genereren. Probeer opnieuw.');
    } finally {
      setGeneratingAi(false);
    }
  };

  const handleOrder = () => {
    if (!store.approved) return;
    router.push(`/${lang}/checkout`);
  };

  return (
    <div className="min-h-screen bg-carpetz-bg">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-carpetz-text mb-8">{t('title')}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: Config options */}
          <div className="space-y-6">

            {/* Type */}
            <div className="card">
              <h2 className="font-semibold text-lg mb-4">{t('step_type')}</h2>
              <div className="grid grid-cols-2 gap-3">
                {(['indoor', 'outdoor'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => store.setType(type)}
                    className={`p-4 rounded-xl border-2 text-sm font-medium transition-all ${
                      store.type === type
                        ? 'border-carpetz-primary bg-carpetz-light text-carpetz-primary'
                        : 'border-gray-200 hover:border-carpetz-primary/50'
                    }`}
                  >
                    {type === 'indoor' ? '🏠 ' + t('indoor') : '🏢 ' + t('outdoor')}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 mt-3">
                {(['on_floor', 'recessed'] as const).map((placement) => (
                  <button
                    key={placement}
                    onClick={() => store.setPlacement(placement)}
                    className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                      store.placement === placement
                        ? 'border-carpetz-primary bg-carpetz-light text-carpetz-primary'
                        : 'border-gray-200 hover:border-carpetz-primary/50'
                    }`}
                  >
                    {t(placement)}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 mt-3">
                {(['landscape', 'portrait'] as const).map((orientation) => (
                  <button
                    key={orientation}
                    onClick={() => store.setOrientation(orientation)}
                    className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                      store.orientation === orientation
                        ? 'border-carpetz-primary bg-carpetz-light text-carpetz-primary'
                        : 'border-gray-200 hover:border-carpetz-primary/50'
                    }`}
                  >
                    {t(orientation)}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 mt-3">
                {(['without_border', 'with_border'] as const).map((border) => (
                  <button
                    key={border}
                    onClick={() => store.setBorder(border)}
                    className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                      store.border === border
                        ? 'border-carpetz-primary bg-carpetz-light text-carpetz-primary'
                        : 'border-gray-200 hover:border-carpetz-primary/50'
                    }`}
                  >
                    {t(border)}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="card">
              <h2 className="font-semibold text-lg mb-4">{t('step_size')}</h2>
              <p className="text-sm text-gray-500 mb-3">{t('predefined_sizes')}</p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {PREDEFINED_SIZES.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => {
                      store.setWidth(size.width);
                      store.setHeight(size.height);
                      setUseCustomSize(false);
                    }}
                    className={`p-2 rounded-lg border-2 text-xs font-medium transition-all ${
                      !useCustomSize && store.width === size.width && store.height === size.height
                        ? 'border-carpetz-primary bg-carpetz-light text-carpetz-primary'
                        : 'border-gray-200 hover:border-carpetz-primary/50'
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setUseCustomSize(!useCustomSize)}
                className={`w-full p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                  useCustomSize
                    ? 'border-carpetz-primary bg-carpetz-light text-carpetz-primary'
                    : 'border-gray-200 hover:border-carpetz-primary/50'
                }`}
              >
                ✏️ {t('custom_size')}
              </button>

              {useCustomSize && (
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">{t('width')}</label>
                    <input
                      type="number"
                      min={20}
                      max={300}
                      value={store.width}
                      onChange={(e) => store.setWidth(Number(e.target.value))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">{t('height')}</label>
                    <input
                      type="number"
                      min={20}
                      max={300}
                      value={store.height}
                      onChange={(e) => store.setHeight(Number(e.target.value))}
                      className="input-field"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Colors */}
            <div className="card">
              <h2 className="font-semibold text-lg mb-4">{t('step_design')}</h2>

              <p className="text-sm font-medium text-gray-600 mb-2">{t('mat_color')}</p>
              <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
                {MAT_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => store.setMatColor(color)}
                    title={color}
                    className={`flex-shrink-0 w-9 h-9 rounded-full border-2 transition-transform hover:scale-110 ${
                      store.matColor === color ? 'border-carpetz-primary scale-110 shadow-md' : 'border-gray-200'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              <p className="text-sm font-medium text-gray-600 mb-2">{t('logo_color')}</p>
              <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
                {MAT_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => store.setLogoColor(color)}
                    title={color}
                    className={`flex-shrink-0 w-9 h-9 rounded-full border-2 transition-transform hover:scale-110 ${
                      store.logoColor === color ? 'border-carpetz-primary scale-110 shadow-md' : 'border-gray-200'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              {/* Logo upload */}
              <p className="text-sm font-medium text-gray-600 mb-2">{t('upload_logo')}</p>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                  isDragActive ? 'border-carpetz-primary bg-carpetz-light' : 'border-gray-300 hover:border-carpetz-primary/50'
                }`}
              >
                <input {...getInputProps()} />
                {store.logoUrl ? (
                  <div className="flex items-center justify-center gap-3">
                    <img src={store.logoUrl} alt="Logo" className="h-12 object-contain" />
                    <span className="text-sm text-green-600 font-medium">✓ Logo geladen</span>
                  </div>
                ) : (
                  <div>
                    <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm text-gray-500">{t('upload_logo')}</p>
                    <p className="text-xs text-gray-400 mt-1">{t('upload_hint')}</p>
                  </div>
                )}
              </div>

              {store.logoUrl && (
                <div className="mt-3">
                  <label className="text-xs text-gray-500 mb-1 block">Logo grootte: {Math.round(store.logoScale * 100)}%</label>
                  <input
                    type="range"
                    min={0.2}
                    max={2}
                    step={0.05}
                    value={store.logoScale}
                    onChange={(e) => store.setLogoScale(Number(e.target.value))}
                    className="w-full accent-carpetz-primary"
                  />
                </div>
              )}
            </div>

            {/* Quantity */}
            <div className="card">
              <h2 className="font-semibold text-lg mb-4">
                {lang === 'nl' ? 'Aantal' : 'Quantité'}
              </h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => store.setQuantity(Math.max(1, store.quantity - 1))}
                  className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-lg font-bold hover:border-carpetz-primary transition-colors"
                >
                  −
                </button>
                <span className="text-xl font-semibold w-8 text-center">{store.quantity}</span>
                <button
                  onClick={() => store.setQuantity(store.quantity + 1)}
                  className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-lg font-bold hover:border-carpetz-primary transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Preview & Order */}
          <div className="space-y-6">
            {/* Mat preview */}
            <div className="card">
              <h2 className="font-semibold text-lg mb-4">{t('step_preview')}</h2>
              <div
                className="rounded-xl flex items-center justify-center relative overflow-hidden"
                style={{
                  backgroundColor: store.matColor,
                  aspectRatio: store.orientation === 'landscape'
                    ? `${store.width}/${store.height}`
                    : `${store.height}/${store.width}`,
                  minHeight: '200px',
                  border: store.border === 'with_border' ? '8px solid rgba(255,255,255,0.3)' : 'none',
                }}
              >
                {store.logoUrl ? (
                  <img
                    src={store.logoUrl}
                    alt="Logo preview"
                    style={{
                      maxWidth: `${store.logoScale * 60}%`,
                      maxHeight: `${store.logoScale * 60}%`,
                      filter: store.logoColor !== '#000000'
                        ? `drop-shadow(0 0 0 ${store.logoColor})`
                        : 'none',
                      objectFit: 'contain',
                    }}
                  />
                ) : (
                  <div className="text-white/30 text-sm text-center p-4">
                    {lang === 'nl' ? 'Upload uw logo om een preview te zien' : 'Téléchargez votre logo pour voir un aperçu'}
                  </div>
                )}
              </div>

              <p className="text-xs text-gray-400 mt-3 text-center italic">{t('color_disclaimer')}</p>

              {/* AI Preview */}
              <button
                onClick={generateAiPreview}
                disabled={generatingAi || !store.logoUrl}
                className={`w-full mt-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                  store.logoUrl
                    ? 'bg-carpetz-primary text-white hover:bg-carpetz-dark'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {generatingAi ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {t('generating')}
                  </>
                ) : (
                  <>✨ {t('generate_ai')}</>
                )}
              </button>

              {aiError && <p className="text-red-500 text-xs mt-2 text-center">{aiError}</p>}

              {store.aiPreviewUrl && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    {lang === 'nl' ? 'AI-visualisatie in echte setting:' : 'Visualisation IA en situation réelle:'}
                  </p>
                  <img
                    src={store.aiPreviewUrl}
                    alt="AI preview"
                    className="w-full rounded-xl object-cover"
                  />
                </div>
              )}
            </div>

            {/* Price & order */}
            <div className="card sticky top-24">
              <h2 className="font-semibold text-lg mb-4">{t('price')}</h2>

              <div className="bg-carpetz-bg rounded-xl p-4 mb-4">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>{store.width} × {store.height} cm × {store.quantity}</span>
                  <span>{formatPrice(pricing.priceExclVat)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>BTW (21%)</span>
                  <span>{formatPrice(pricing.vatAmount)}</span>
                </div>
                {pricing.discountPercent > 0 && (
                  <div className="flex justify-between text-sm text-green-600 mb-1">
                    <span>Staffelkorting</span>
                    <span>-{pricing.discountPercent}%</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t border-gray-200">
                  <span>{t('price')} {t('incl_vat')}</span>
                  <span className="text-carpetz-primary">{formatPrice(pricing.priceInclVat)}</span>
                </div>
              </div>

              {/* Approval checkbox */}
              <label className="flex items-start gap-3 cursor-pointer mb-4">
                <input
                  type="checkbox"
                  checked={store.approved}
                  onChange={(e) => store.setApproved(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded accent-carpetz-primary"
                />
                <span className="text-sm text-gray-600">{t('approval_text')}</span>
              </label>

              <button
                onClick={handleOrder}
                disabled={!store.approved || !store.logoUrl}
                className={`w-full py-4 rounded-xl text-lg font-bold transition-all ${
                  store.approved && store.logoUrl
                    ? 'bg-carpetz-primary text-white hover:bg-carpetz-dark active:scale-95'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {t('add_to_cart')} →
              </button>

              {!store.logoUrl && (
                <p className="text-xs text-gray-400 text-center mt-2">
                  {lang === 'nl' ? 'Upload eerst uw logo' : 'Téléchargez d\'abord votre logo'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
