// app/[locale]/layout.tsx
import { notFound } from "next/navigation";

const locales = ["nl", "fr"] as const;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) notFound();

  // ✅ GEEN <html> en GEEN <body> hier!
  return children;
}
