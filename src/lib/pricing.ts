import { BulkDiscount } from '@/types';

export const PRICE_PER_CM2 = 0.0045; // €0.0045 per cm² — adjust in admin
export const VAT_RATE = 0.21;

export function calculatePrice(
  widthCm: number,
  heightCm: number,
  quantity: number = 1,
  bulkDiscounts: BulkDiscount[] = [],
  isCompany: boolean = false
): {
  priceExclVat: number;
  vatAmount: number;
  priceInclVat: number;
  discountPercent: number;
} {
  const surface = widthCm * heightCm;
  let basePrice = surface * PRICE_PER_CM2 * quantity;

  let discountPercent = 0;
  if (isCompany && bulkDiscounts.length > 0) {
    const applicable = bulkDiscounts
      .filter((d) => quantity >= d.minQuantity)
      .sort((a, b) => b.minQuantity - a.minQuantity);
    if (applicable.length > 0) {
      discountPercent = applicable[0].discountPercent;
      basePrice = basePrice * (1 - discountPercent / 100);
    }
  }

  const priceExclVat = Math.round(basePrice * 100) / 100;
  const vatAmount = Math.round(priceExclVat * VAT_RATE * 100) / 100;
  const priceInclVat = Math.round((priceExclVat + vatAmount) * 100) / 100;

  return { priceExclVat, vatAmount, priceInclVat, discountPercent };
}

export function formatPrice(amount: number, locale: string = 'nl-BE'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}
