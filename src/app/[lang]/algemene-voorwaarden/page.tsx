import type { Metadata } from 'next';

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  return { title: lang === 'nl' ? 'Algemene voorwaarden — Carpetz' : 'Conditions générales — Carpetz' };
}

export default function AlgemeneVoorwaardenPage({ params: { lang } }: { params: { lang: string } }) {
  const isNl = lang === 'nl';
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{isNl ? 'Algemene voorwaarden' : 'Conditions générales'}</h1>
      <div className="card prose max-w-none text-sm leading-relaxed space-y-6">
        <section>
          <h2 className="text-lg font-semibold mb-2">{isNl ? '1. Identiteit van de verkoper' : '1. Identité du vendeur'}</h2>
          <p className="text-gray-600">Carpetz · Straat 1, 0000 Stad, België · BTW: BE0000000000 · KBO: 0000.000.000 · info@carpetz.be</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">{isNl ? '2. Toepassingsgebied' : '2. Champ d\'application'}</h2>
          <p className="text-gray-600">{isNl ? 'Deze algemene voorwaarden zijn van toepassing op alle bestellingen geplaatst via carpetz.be.' : 'Ces conditions générales s\'appliquent à toutes les commandes passées via carpetz.be.'}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">{isNl ? '3. Bestellingen en maatwerk' : '3. Commandes et sur mesure'}</h2>
          <p className="text-gray-600">{isNl
            ? 'Alle producten worden op maat gemaakt volgens de specificaties opgegeven door de klant. De klant geeft digitaal goedkeuring aan de preview voor de bestelling wordt geplaatst. Carpetz is niet aansprakelijk voor fouten in de door de klant opgegeven specificaties.'
            : 'Tous les produits sont fabriqués sur mesure selon les spécifications fournies par le client. Le client approuve numériquement l\'aperçu avant de passer la commande.'}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">{isNl ? '4. Herroepingsrecht — Uitsluiting voor maatwerk' : '4. Droit de rétractation — Exclusion pour le sur mesure'}</h2>
          <p className="text-gray-600 font-medium text-red-600">{isNl
            ? 'Op grond van artikel VI.53, 3° van het Wetboek Economisch Recht is het herroepingsrecht NIET van toepassing op goederen die volgens de specificaties van de consument zijn vervaardigd of die duidelijk voor een specifieke persoon bestemd zijn. Alle bestellingen bij Carpetz zijn maatwerk en kunnen derhalve NIET worden geretourneerd of geannuleerd na digitale goedkeuring.'
            : 'En vertu de l\'article VI.53, 3° du Code de droit économique, le droit de rétractation NE s\'applique PAS aux biens confectionnés selon les spécifications du consommateur. Toutes les commandes chez Carpetz sont sur mesure et ne peuvent PAS être retournées.'}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">{isNl ? '5. Prijs en betaling' : '5. Prix et paiement'}</h2>
          <p className="text-gray-600">{isNl
            ? 'Alle prijzen zijn vermeld in euro inclusief BTW (21%), tenzij anders aangegeven voor B2B-klanten met geldig BTW-nummer. Betaling geschiedt via de aangeboden betaalmethoden (Mollie).'
            : 'Tous les prix sont indiqués en euros TVA comprise (21%), sauf indication contraire pour les clients B2B avec un numéro de TVA valide.'}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">{isNl ? '6. Levering' : '6. Livraison'}</h2>
          <p className="text-gray-600">{isNl
            ? 'Levering vindt plaats binnen 48 uur na productie in de Benelux (België, Nederland, Luxemburg). Levertijden zijn indicatief en kunnen afwijken.'
            : 'La livraison a lieu dans les 48h après production au Benelux. Les délais de livraison sont indicatifs.'}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">{isNl ? '7. Klachten' : '7. Réclamations'}</h2>
          <p className="text-gray-600">{isNl
            ? 'Klachten kunnen worden ingediend via info@carpetz.be. Wij trachten klachten binnen 5 werkdagen te behandelen.'
            : 'Les réclamations peuvent être soumises via info@carpetz.be. Nous traitons les réclamations dans les 5 jours ouvrables.'}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">{isNl ? '8. Toepasselijk recht' : '8. Droit applicable'}</h2>
          <p className="text-gray-600">{isNl
            ? 'Op alle overeenkomsten is het Belgisch recht van toepassing. Geschillen vallen onder de bevoegdheid van de rechtbanken van het gerechtelijk arrondissement van de maatschappelijke zetel van Carpetz.'
            : 'Toutes les conventions sont soumises au droit belge. Les litiges relèvent de la compétence des tribunaux de l\'arrondissement judiciaire du siège social de Carpetz.'}</p>
        </section>

        <p className="text-xs text-gray-400">{isNl ? 'Laatste update: 2024' : 'Dernière mise à jour: 2024'}</p>
      </div>
    </div>
  );
}
