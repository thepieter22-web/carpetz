import CheckoutClient from '@/components/checkout/CheckoutClient';
import type { Metadata } from 'next';

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  return {
    title: lang === 'nl' ? 'Afrekenen — Carpetz' : 'Paiement — Carpetz',
  };
}

export default function CheckoutPage({ params: { lang } }: { params: { lang: string } }) {
  return <CheckoutClient lang={lang} />;
}
