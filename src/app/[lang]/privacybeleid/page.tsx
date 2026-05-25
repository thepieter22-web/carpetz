export default function PrivacybeleidPage({ params: { lang } }: { params: { lang: string } }) {
  const isNl = lang === 'nl';
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{isNl ? 'Privacybeleid' : 'Politique de confidentialité'}</h1>
      <div className="card text-sm leading-relaxed space-y-6">
        <section>
          <h2 className="text-lg font-semibold mb-2">{isNl ? '1. Verwerkingsverantwoordelijke' : '1. Responsable du traitement'}</h2>
          <p className="text-gray-600">Carpetz · Straat 1, 0000 Stad · BTW: BE0000000000 · info@carpetz.be</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-2">{isNl ? '2. Welke gegevens verzamelen wij?' : '2. Quelles données collectons-nous?'}</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>{isNl ? 'Naam, adres, e-mail, telefoonnummer' : 'Nom, adresse, e-mail, téléphone'}</li>
            <li>{isNl ? 'BTW-nummer (voor B2B-klanten)' : 'Numéro de TVA (clients B2B)'}</li>
            <li>{isNl ? 'Bestellingsgegevens en geüploade logobestanden' : 'Données de commande et fichiers logo téléchargés'}</li>
            <li>{isNl ? 'Betalingsstatus (geen betaalgegevens — verwerkt door Mollie)' : 'Statut de paiement (pas de données de paiement — traité par Mollie)'}</li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-2">{isNl ? '3. Doeleinden van verwerking' : '3. Finalités du traitement'}</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>{isNl ? 'Uitvoering van de bestelling' : 'Exécution de la commande'}</li>
            <li>{isNl ? 'Facturatie' : 'Facturation'}</li>
            <li>{isNl ? 'Klantenservice en communicatie' : 'Service client et communication'}</li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-2">{isNl ? '4. Bewaartermijn' : '4. Durée de conservation'}</h2>
          <p className="text-gray-600">{isNl ? 'Persoonsgegevens worden bewaard zolang nodig voor de uitvoering van de overeenkomst en maximaal 7 jaar voor boekhoudkundige verplichtingen.' : 'Les données personnelles sont conservées aussi longtemps que nécessaire pour l\'exécution du contrat et maximum 7 ans pour les obligations comptables.'}</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-2">{isNl ? '5. Uw rechten' : '5. Vos droits'}</h2>
          <p className="text-gray-600">{isNl ? 'U heeft het recht op inzage, correctie en verwijdering van uw persoonsgegevens. Contacteer ons via info@carpetz.be.' : 'Vous avez le droit d\'accès, de rectification et de suppression de vos données. Contactez-nous via info@carpetz.be.'}</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-2">{isNl ? '6. Derde partijen' : '6. Tiers'}</h2>
          <p className="text-gray-600">{isNl ? 'Wij delen uw gegevens met: Mollie (betalingsverwerking), Supabase (dataopslag), Resend (e-mail), onze productiepartner (uitvoering bestelling). Al deze partijen zijn GDPR-compliant.' : 'Nous partageons vos données avec: Mollie (paiement), Supabase (stockage), Resend (email), notre partenaire de production.'}</p>
        </section>
        <p className="text-xs text-gray-400">{isNl ? 'Laatste update: 2024' : 'Dernière mise à jour: 2024'}</p>
      </div>
    </div>
  );
}
