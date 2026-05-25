import { notFound } from "next/navigation";
import Home from "../page";

const SUPPORTED_LOCALES = ["nl", "fr"] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export default function LocaleHome({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as SupportedLocale;

  // 1) Onbekende locale? -> 404
  if (!SUPPORTED_LOCALES.includes(locale)) {
    notFound();
  }

  // 2) Toon je echte homepage
  // (optioneel: laat debug blok tijdelijk staan)
  return (
    <main>
      {/* DEBUG - laat dit staan tot alles stabiel is, daarna mag je dit weg */}
      <div style={{ padding: 24 }}>
        <h1 style={{ margin: 0 }}>DEBUG: /{locale} rendert ✅</h1>
        <p style={{ marginTop: 8, opacity: 0.8 }}>
          Als je dit ziet, werkt routing. Als de content eronder leeg is, ligt het aan Home/CSS.
        </p>
      </div>

      {/* Jouw echte homepage */}
      <Home />
    </main>
  );
}
``
