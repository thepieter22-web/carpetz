import { notFound } from "next/navigation";

import nl from "../../src/messages/nl.json";
import fr from "../../src/messages/fr.json";

const SUPPORTED_LOCALES = ["nl", "fr"] as const;

const MESSAGES = {
  nl,
  fr,
} as const;

export default function LocaleHome({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;

  if (!SUPPORTED_LOCALES.includes(locale as any)) notFound();

  const t = MESSAGES[locale as keyof typeof MESSAGES];

  return (
    <main>
      <h1>{t.title}</h1>
      <p>{t.subtitle}</p>

      {/* debug/controle */}
      <small>Locale: {locale}</small>
    </main>
  );
}
