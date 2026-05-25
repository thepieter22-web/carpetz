export default function LocaleHome({ params }: { params: { locale: string } }) {
  return (
    <main style={{ padding: 24 }}>
      <h1>DEBUG: /{params.locale} rendert ✅</h1>
      <p>Als je dit ziet, werkt de route en de render.</p>
    </main>
  );
}
``
