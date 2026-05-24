import { Resend } from 'resend';
import { Order } from '@/types';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmation(order: Order): Promise<void> {
  const isNl = order.locale === 'nl';
  const subject = isNl
    ? `Bevestiging bestelling #${order.id} — Carpetz`
    : `Confirmation commande #${order.id} — Carpetz`;

  await resend.emails.send({
    from: 'Carpetz <bestellingen@carpetz.be>',
    to: order.customer_email,
    subject,
    html: orderConfirmationHtml(order),
  });
}

export async function sendOrderToSupplier(order: Order, pdfBase64: string): Promise<void> {
  await resend.emails.send({
    from: 'Carpetz <bestellingen@carpetz.be>',
    to: process.env.SUPPLIER_EMAIL!,
    subject: `Nieuwe bestelling #${order.id} — ${order.mat_width}x${order.mat_height}cm`,
    html: supplierEmailHtml(order),
    attachments: [
      {
        filename: `bestelling-${order.id}.pdf`,
        content: pdfBase64,
      },
    ],
  });
}

export async function sendStatusUpdate(order: Order): Promise<void> {
  const isNl = order.locale === 'nl';
  const statusLabels: Record<string, { nl: string; fr: string }> = {
    in_production: { nl: 'In productie', fr: 'En production' },
    shipped: { nl: 'Verzonden', fr: 'Expédié' },
    delivered: { nl: 'Geleverd', fr: 'Livré' },
  };

  const label = statusLabels[order.status];
  if (!label) return;

  const subject = isNl
    ? `Update bestelling #${order.id}: ${label.nl}`
    : `Mise à jour commande #${order.id}: ${label.fr}`;

  await resend.emails.send({
    from: 'Carpetz <bestellingen@carpetz.be>',
    to: order.customer_email,
    subject,
    html: statusUpdateHtml(order, isNl ? label.nl : label.fr),
  });
}

export async function sendReviewRequest(order: Order): Promise<void> {
  const isNl = order.locale === 'nl';
  const subject = isNl
    ? `Hoe was uw Carpetz logomat?`
    : `Comment était votre tapis logo Carpetz?`;

  await resend.emails.send({
    from: 'Carpetz <info@carpetz.be>',
    to: order.customer_email,
    subject,
    html: reviewRequestHtml(order),
  });
}

function orderConfirmationHtml(order: Order): string {
  const isNl = order.locale === 'nl';
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1A1A1A;">
      <div style="background:#1B5E9E;padding:24px;text-align:center;">
        <h1 style="color:white;margin:0;font-size:24px;">Carpetz</h1>
      </div>
      <div style="padding:32px;">
        <h2>${isNl ? 'Bedankt voor uw bestelling!' : 'Merci pour votre commande!'}</h2>
        <p>${isNl ? 'Bestelnummer' : 'Numéro de commande'}: <strong>#${order.id}</strong></p>
        <table style="width:100%;border-collapse:collapse;margin:24px 0;">
          <tr style="background:#F4F4F4;">
            <td style="padding:8px;">${isNl ? 'Formaat' : 'Format'}</td>
            <td style="padding:8px;">${order.mat_width} × ${order.mat_height} cm</td>
          </tr>
          <tr>
            <td style="padding:8px;">${isNl ? 'Type' : 'Type'}</td>
            <td style="padding:8px;">${order.mat_type === 'indoor' ? (isNl ? 'Binnenmat' : 'Tapis intérieur') : (isNl ? 'Buitenmat' : 'Tapis extérieur')}</td>
          </tr>
          <tr style="background:#F4F4F4;">
            <td style="padding:8px;">${isNl ? 'Totaal incl. BTW' : 'Total TVA comprise'}</td>
            <td style="padding:8px;font-weight:bold;">€${order.price_incl_vat.toFixed(2)}</td>
          </tr>
        </table>
        <p>${isNl ? 'Levering binnen 48u na productie.' : 'Livraison en 48h après production.'}</p>
      </div>
      <div style="background:#F4F4F4;padding:16px;text-align:center;font-size:12px;color:#666;">
        Carpetz · BTW: BE0000000000 · info@carpetz.be
      </div>
    </div>
  `;
}

function supplierEmailHtml(order: Order): string {
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
      <h2>Nieuwe bestelling #${order.id}</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px;background:#f5f5f5;"><strong>Formaat</strong></td><td style="padding:8px;">${order.mat_width} × ${order.mat_height} cm</td></tr>
        <tr><td style="padding:8px;"><strong>Type</strong></td><td style="padding:8px;">${order.mat_type}</td></tr>
        <tr><td style="padding:8px;background:#f5f5f5;"><strong>Plaatsing</strong></td><td style="padding:8px;">${order.mat_placement}</td></tr>
        <tr><td style="padding:8px;"><strong>Oriëntatie</strong></td><td style="padding:8px;">${order.mat_orientation}</td></tr>
        <tr><td style="padding:8px;background:#f5f5f5;"><strong>Rand</strong></td><td style="padding:8px;">${order.mat_border}</td></tr>
        <tr><td style="padding:8px;"><strong>Matkleur</strong></td><td style="padding:8px;">${order.mat_color}</td></tr>
        <tr><td style="padding:8px;background:#f5f5f5;"><strong>Logocleur</strong></td><td style="padding:8px;">${order.logo_color}</td></tr>
        <tr><td style="padding:8px;"><strong>Leveringsadres</strong></td><td style="padding:8px;">${order.customer_address}, ${order.customer_postal_code} ${order.customer_city}, ${order.customer_country}</td></tr>
      </table>
      <p>Logo is bijgevoegd als PDF bijlage.</p>
    </div>
  `;
}

function statusUpdateHtml(order: Order, statusLabel: string): string {
  const isNl = order.locale === 'nl';
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#1B5E9E;padding:24px;text-align:center;">
        <h1 style="color:white;margin:0;">Carpetz</h1>
      </div>
      <div style="padding:32px;">
        <h2>${isNl ? 'Update voor uw bestelling' : 'Mise à jour de votre commande'} #${order.id}</h2>
        <p>${isNl ? 'Status' : 'Statut'}: <strong style="color:#1B5E9E;">${statusLabel}</strong></p>
        ${order.status === 'shipped' ? `<p>${isNl ? 'Uw mat is onderweg!' : 'Votre tapis est en route!'}</p>` : ''}
      </div>
    </div>
  `;
}

function reviewRequestHtml(order: Order): string {
  const isNl = order.locale === 'nl';
  const reviewUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${order.locale}/review/${order.id}`;
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#1B5E9E;padding:24px;text-align:center;">
        <h1 style="color:white;margin:0;">Carpetz</h1>
      </div>
      <div style="padding:32px;text-align:center;">
        <h2>${isNl ? 'Hoe was uw ervaring?' : 'Comment était votre expérience?'}</h2>
        <p>${isNl ? 'Uw mening helpt andere klanten.' : 'Votre avis aide les autres clients.'}</p>
        <a href="${reviewUrl}" style="display:inline-block;background:#1B5E9E;color:white;padding:12px 24px;text-decoration:none;border-radius:6px;margin-top:16px;">
          ${isNl ? 'Schrijf een review' : 'Écrire un avis'}
        </a>
      </div>
    </div>
  `;
}
