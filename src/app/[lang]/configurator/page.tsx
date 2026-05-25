import { useTranslations } from 'next-intl';
import type { Metadata } from 'next';
import ConfiguratorClient from '@/components/configurator/ConfiguratorClient';

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  return {
    title: lang === 'nl' ? 'Configureer uw logomat — Carpetz' : 'Configurez votre tapis logo — Carpetz',
    description: lang === 'nl'
      ? 'Ontwerp uw gepersonaliseerde logomat online. Kies formaat, kleur en upload uw logo.'
      : 'Concevez votre tapis logo personnalisé en ligne.',
  };
}

export default function ConfiguratorPage({ params: { lang } }: { params: { lang: string } }) {
  return <ConfiguratorClient lang={lang} />;
}
