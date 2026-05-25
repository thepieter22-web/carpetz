export default function CookiebeleidPage({ params: { lang } }: { params: { lang: string } }) {
  const isNl = lang === 'nl';
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{isNl ? 'Cookiebeleid' : 'Politique cookies'}</h1>
      <div className="card text-sm leading-relaxed space-y-6">
        <section>
          <h2 className="text-lg font-semibold mb-2">{isNl ? 'Functionele cookies' : 'Cookies fonctionnels'}</h2>
          <p className="text-gray-600">{isNl ? 'Noodzakelijk voor het functioneren van de website (sessie, taalvoorkeur). Geen toestemming vereist.' : 'Nécessaires au fonctionnement du site (session, préférence de langue). Pas de consentement requis.'}</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-2">{isNl ? 'Analytische cookies' : 'Cookies analytiques'}</h2>
          <p className="text-gray-600">{isNl ? 'Wij gebruiken anonieme statistieken om onze website te verbeteren. U kunt hiervoor toestemming geven of weigeren.' : 'Nous utilisons des statistiques anonymes pour améliorer notre site. Vous pouvez accepter ou refuser.'}</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-2">{isNl ? 'Cookies beheren' : 'Gérer les cookies'}</h2>
          <p className="text-gray-600">{isNl ? 'U kunt uw cookievoorkeuren op elk moment aanpassen via uw browserinstellingen of door de cookiebanner opnieuw te activeren.' : 'Vous pouvez modifier vos préférences de cookies à tout moment via les paramètres de votre navigateur.'}</p>
        </section>
      </div>
    </div>
  );
}
