export default function RetourbeleidPage({ params: { lang } }: { params: { lang: string } }) {
  const isNl = lang === 'nl';
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{isNl ? 'Retourbeleid' : 'Politique de retour'}</h1>
      <div className="card text-sm leading-relaxed space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <h2 className="font-semibold text-red-700 mb-2">
            {isNl ? '⚠️ Maatwerk — geen retourmogelijkheid' : '⚠️ Sur mesure — pas de retour possible'}
          </h2>
          <p className="text-red-600">
            {isNl
              ? 'Omdat alle producten van Carpetz volledig op maat worden vervaardigd op basis van de specificaties van de klant, is retourneren wettelijk uitgesloten op grond van artikel VI.53, 3° van het Wetboek Economisch Recht (WER).'
              : 'Parce que tous les produits de Carpetz sont fabriqués sur mesure selon les spécifications du client, le retour est légalement exclu en vertu de l\'article VI.53, 3° du Code de droit économique.'}
          </p>
        </div>
        <section>
          <h2 className="text-lg font-semibold mb-2">{isNl ? 'Uitzondering: defect of verkeerde levering' : 'Exception: défaut ou livraison incorrecte'}</h2>
          <p className="text-gray-600">
            {isNl
              ? 'Indien uw product beschadigd of incorrect geleverd werd, neemt u binnen 48 uur na ontvangst contact op via info@carpetz.be met foto\'s. Wij zullen een oplossing zoeken.'
              : 'Si votre produit est endommagé ou livré incorrectement, contactez-nous dans les 48h après réception via info@carpetz.be avec des photos.'}
          </p>
        </section>
      </div>
    </div>
  );
}
