# Carpetz — Logomatten op maat

E-commerce platform voor gepersonaliseerde logomatten. Gebouwd met Next.js, Supabase, Mollie en DALL-E 3.

## Setup

### 1. Clone en installeer
```bash
npm install
```

### 2. Environment variables
Kopieer `.env.example` naar `.env.local` en vul alle waarden in:
```bash
cp .env.example .env.local
```

Vereiste accounts:
- **Supabase**: https://supabase.com — maak een project aan
- **Mollie**: https://mollie.com — maak een account aan (test key voor development)
- **OpenAI**: https://platform.openai.com — voor DALL-E 3
- **Resend**: https://resend.com — voor transactionele emails

### 3. Database setup
Voer het SQL-bestand uit in je Supabase SQL editor:
```
supabase-schema.sql
```

### 4. Supabase Storage
De SQL maakt automatisch een `carpetz` bucket aan.
Controleer in Supabase Dashboard > Storage dat de bucket bestaat.

### 5. Admin account aanmaken
In Supabase Dashboard > Authentication > Users:
- Klik "Add user"
- Voeg je email en wachtwoord toe

### 6. Development starten
```bash
npm run dev
```

### 7. Vercel deployment
```bash
# Voeg alle .env.local variabelen toe in Vercel Dashboard > Settings > Environment Variables
vercel deploy
```

## Structuur

```
src/
  app/
    [lang]/          # NL + FR pagina's
    admin/           # Admin dashboard
    api/             # API routes
  components/
    layout/          # Header, Footer, CookieBanner
    configurator/    # Productconfigurator
    checkout/        # Checkout form
    admin/           # Admin componenten
  lib/               # Supabase, Resend, pricing, PDF
  store/             # Zustand state
  types/             # TypeScript types
  messages/          # NL + FR vertalingen
```

## Mollie live zetten
1. Activeer betaalmethoden in Mollie Dashboard
2. Vervang `test_` key door `live_` key in productie omgeving
3. Zorg dat je website voldoet aan Mollie review criteria (zie algemene voorwaarden, retourbeleid, contactgegevens)

## Aanpassen
- **Prijzen**: Aanpasbaar in `/admin/instellingen` of rechtstreeks in `supabase settings` tabel
- **Vertalingen**: `src/messages/nl.json` en `src/messages/fr.json`
- **Kleuren**: `tailwind.config.ts` en `src/app/globals.css`
- **Leverancier email**: `SUPPLIER_EMAIL` in `.env.local`
