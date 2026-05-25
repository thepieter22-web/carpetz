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

  // TypeScript klaagt omdat nl/fr types niet 100% hetzelfde lijken
  const t = MESSAGES[locale as keyof typeof MESSAGES] as any;

  return (
    <main>
      <h1>{t.hero.title}</h1>
      <p>{t.hero.subtitle}</p>

      {/* debug */}
      <small>Locale: {locale}</small>
    </main>
  );
}
