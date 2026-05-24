-- Run this in your Supabase SQL editor

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'pending',
  customer_first_name TEXT NOT NULL,
  customer_last_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  customer_address TEXT NOT NULL,
  customer_city TEXT NOT NULL,
  customer_postal_code TEXT NOT NULL,
  customer_country TEXT NOT NULL DEFAULT 'BE',
  is_company BOOLEAN DEFAULT false,
  company_name TEXT,
  vat_number TEXT,
  mat_type TEXT NOT NULL,
  mat_placement TEXT NOT NULL,
  mat_orientation TEXT NOT NULL,
  mat_border TEXT NOT NULL,
  mat_width INTEGER NOT NULL,
  mat_height INTEGER NOT NULL,
  mat_color TEXT NOT NULL,
  logo_color TEXT NOT NULL,
  logo_url TEXT,
  quantity INTEGER NOT NULL DEFAULT 1,
  price_excl_vat DECIMAL(10,2) NOT NULL,
  vat_amount DECIMAL(10,2) NOT NULL,
  price_incl_vat DECIMAL(10,2) NOT NULL,
  mollie_payment_id TEXT,
  supplier_pdf_sent BOOLEAN,
  supplier_error TEXT,
  locale TEXT DEFAULT 'nl'
);

-- Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  order_id UUID REFERENCES orders(id),
  customer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  verified BOOLEAN DEFAULT true
);

-- Settings table (for admin: pricing, sizes etc)
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert default settings
INSERT INTO settings (key, value) VALUES
  ('price_per_cm2', '0.0045'),
  ('bulk_discounts', '[{"minQuantity": 5, "discountPercent": 5}, {"minQuantity": 10, "discountPercent": 10}, {"minQuantity": 25, "discountPercent": 15}]'),
  ('predefined_sizes', '[{"id":"40x60","width":40,"height":60},{"id":"50x80","width":50,"height":80},{"id":"60x90","width":60,"height":90},{"id":"80x120","width":80,"height":120},{"id":"100x150","width":100,"height":150},{"id":"120x180","width":120,"height":180}]');

-- Storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('carpetz', 'carpetz', true);

-- RLS policies
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Orders: only authenticated users (admin) can read all
CREATE POLICY "Admin can do everything on orders" ON orders
  FOR ALL USING (auth.role() = 'authenticated');

-- Reviews: public can read, only authenticated can insert/update
CREATE POLICY "Public can read reviews" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Service role can manage reviews" ON reviews
  FOR ALL USING (auth.role() = 'service_role');

-- Storage policy
CREATE POLICY "Public read access" ON storage.objects
  FOR SELECT USING (bucket_id = 'carpetz');

CREATE POLICY "Service role upload" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'carpetz');
