import { Order } from '@/types';

export async function generateOrderPdf(order: Order): Promise<string> {
  // Using jsPDF in a Node.js-compatible way
  const { jsPDF } = await import('jspdf');

  const doc = new jsPDF();
  const blue = [27, 94, 158] as [number, number, number];

  // Header
  doc.setFillColor(...blue);
  doc.rect(0, 0, 210, 35, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('CARPETZ', 15, 20);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Productieorder', 15, 28);

  // Order info
  doc.setTextColor(26, 26, 26);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(`Bestelling #${order.id.slice(0, 8).toUpperCase()}`, 15, 50);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text(`Datum: ${new Date(order.created_at).toLocaleDateString('nl-BE')}`, 15, 58);

  // Specs table
  const specs = [
    ['Formaat', `${order.mat_width} × ${order.mat_height} cm`],
    ['Oppervlakte', `${order.mat_width * order.mat_height} cm²`],
    ['Type', order.mat_type === 'indoor' ? 'Binnenmat' : 'Buitenmat'],
    ['Plaatsing', order.mat_placement === 'on_floor' ? 'Op de vloer' : 'Verzonken'],
    ['Oriëntatie', order.mat_orientation === 'landscape' ? 'Liggend' : 'Staand'],
    ['Rand', order.mat_border === 'with_border' ? 'Met rand' : 'Zonder rand'],
    ['Matkleur', order.mat_color],
    ['Logocleur', order.logo_color],
    ['Aantal', String(order.quantity)],
  ];

  let y = 75;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(26, 26, 26);
  doc.text('Productspecificaties', 15, y);
  y += 8;

  specs.forEach(([key, value], i) => {
    if (i % 2 === 0) {
      doc.setFillColor(244, 244, 244);
      doc.rect(15, y - 4, 180, 8, 'F');
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(key, 18, y + 1);
    doc.setFont('helvetica', 'normal');
    doc.text(value, 80, y + 1);
    y += 8;
  });

  // Color swatch
  y += 5;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Kleuren', 15, y);
  y += 8;

  const matRgb = hexToRgb(order.mat_color);
  const logoRgb = hexToRgb(order.logo_color);

  if (matRgb) {
    doc.setFillColor(matRgb[0], matRgb[1], matRgb[2]);
    doc.roundedRect(15, y, 30, 15, 2, 2, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text('Matkleur', 17, y + 20);
    doc.text(order.mat_color, 17, y + 25);
  }

  if (logoRgb) {
    doc.setFillColor(logoRgb[0], logoRgb[1], logoRgb[2]);
    doc.roundedRect(55, y, 30, 15, 2, 2, 'F');
    doc.text('Logocleur', 57, y + 20);
    doc.text(order.logo_color, 57, y + 25);
  }

  y += 40;

  // Delivery address
  doc.setTextColor(26, 26, 26);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Leveringsadres', 15, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);

  const lines = [
    `${order.customer_first_name} ${order.customer_last_name}`,
    order.is_company ? (order.company_name || '') : '',
    order.customer_address,
    `${order.customer_postal_code} ${order.customer_city}`,
    order.customer_country,
  ].filter(Boolean);

  lines.forEach((line) => {
    doc.text(line, 15, y);
    y += 6;
  });

  // Logo URL
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.text('Logo bestand:', 15, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(27, 94, 158);
  doc.text(order.logo_url, 55, y);

  // Footer
  doc.setFillColor(...blue);
  doc.rect(0, 280, 210, 17, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.text('Carpetz · info@carpetz.be · carpetz.be', 15, 291);

  return doc.output('datauristring').split(',')[1];
}

function hexToRgb(hex: string): [number, number, number] | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : null;
}
