import { notFound } from "next/navigation";

const SUPPORTED_LOCALES = ["nl", "fr"] as const;

export default function LocaleHome({ params }: { params: { locale: string } }) {
  if (!SUPPORTED_LOCALES.includes(params.locale as any)) notFound();

  return (
    <main>
      {/* hier jouw echte homepage */}
      <h1>Carpetz</h1>
      <p>Locale: {params.locale}</p>
      {/* … rest van je UI */}
    </main>
  );
}
