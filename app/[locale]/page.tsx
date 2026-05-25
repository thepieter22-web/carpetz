import { notFound } from "next/navigation";

const SUPPORTED_LOCALES = ["nl", "fr"] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export default function LocaleHome({ params }: { params: { locale: string } }) {
  const locale = params.locale as SupportedLocale;

  if (!SUPPORTED_LOCALES.includes(locale)) {
    notFound();
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Carpetz — Logomatten op maat</h1>
      <p>Locale: <strong>{locale}</strong></p>

      {/* TODO: hier komt je echte homepage content */}
      <p>✅ Routing werkt en deze pagina rendert.</p>
    </main>
  );
}
