export type Locale = 'nl' | 'fr';

export type MatType = 'indoor' | 'outdoor';
export type MatPlacement = 'on_floor' | 'recessed';
export type MatOrientation = 'portrait' | 'landscape';
export type BorderOption = 'with_border' | 'without_border';

export interface MatSize {
  id: string;
  width: number;
  height: number;
  label: string;
}

export interface MatConfig {
  type: MatType;
  placement: MatPlacement;
  orientation: MatOrientation;
  border: BorderOption;
  width: number;
  height: number;
  matColor: string;
  logoColor: string;
  logoFile: File | null;
  logoUrl: string | null;
  logoScale: number;
  logoX: number;
  logoY: number;
}

export interface PriceConfig {
  pricePerCm2: number;
  vatRate: number;
  bulkDiscounts: BulkDiscount[];
}

export interface BulkDiscount {
  minQuantity: number;
  discountPercent: number;
}

export type OrderStatus = 'paid' | 'in_production' | 'shipped' | 'delivered';

export interface Order {
  id: string;
  created_at: string;
  status: OrderStatus;
  customer_first_name: string;
  customer_last_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  customer_city: string;
  customer_postal_code: string;
  customer_country: string;
  is_company: boolean;
  company_name?: string;
  vat_number?: string;
  mat_type: MatType;
  mat_placement: MatPlacement;
  mat_orientation: MatOrientation;
  mat_border: BorderOption;
  mat_width: number;
  mat_height: number;
  mat_color: string;
  logo_color: string;
  logo_url: string;
  quantity: number;
  price_excl_vat: number;
  vat_amount: number;
  price_incl_vat: number;
  mollie_payment_id?: string;
  locale: Locale;
}

export interface Customer {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  is_company: boolean;
  company_name?: string;
  vat_number?: string;
  orders_count: number;
  total_spent: number;
  created_at: string;
}

export interface Review {
  id: string;
  order_id: string;
  customer_name: string;
  rating: number;
  comment: string;
  verified: boolean;
  created_at: string;
}

export const PREDEFINED_SIZES: MatSize[] = [
  { id: '40x60', width: 40, height: 60, label: '40 × 60 cm' },
  { id: '50x80', width: 50, height: 80, label: '50 × 80 cm' },
  { id: '60x90', width: 60, height: 90, label: '60 × 90 cm' },
  { id: '80x120', width: 80, height: 120, label: '80 × 120 cm' },
  { id: '100x150', width: 100, height: 150, label: '100 × 150 cm' },
  { id: '120x180', width: 120, height: 180, label: '120 × 180 cm' },
];

export const MAT_COLORS = [
  '#000000', '#1A1A1A', '#333333', '#4D4D4D', '#666666', '#808080',
  '#999999', '#B3B3B3', '#CCCCCC', '#E6E6E6', '#FFFFFF',
  '#1B5E9E', '#154C82', '#2575BB', '#3A86D4', '#0D3B6E',
  '#8B0000', '#CC0000', '#FF0000', '#FF4444', '#FF6B6B',
  '#006400', '#228B22', '#2E8B57', '#3CB371', '#90EE90',
  '#8B4513', '#A0522D', '#CD853F', '#DEB887', '#F5DEB3',
  '#FFD700', '#FFA500', '#FF8C00', '#FF6600', '#CC4400',
  '#4B0082', '#6A0DAD', '#8B008B', '#9400D3', '#BA55D3',
];
