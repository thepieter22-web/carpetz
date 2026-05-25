export default function LocaleHome({ params }: { params: { locale: string } }) {
  return (
    <main style={{ padding: 24 }}>
      <h1>Locale route werkt ✅</h1>
      <p>Huidige locale: <strong>{params.locale}</strong></p>
      <p>Test: ga naar /nl of /fr</p>
    </main>
  );
}
