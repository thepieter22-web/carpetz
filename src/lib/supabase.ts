import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function uploadLogo(file: File, orderId: string): Promise<string> {
  const ext = file.name.split('.').pop();
  const filename = `logos/${orderId}.${ext}`;
  const { data, error } = await supabase.storage
    .from('carpetz')
    .upload(filename, file, { upsert: true });
  if (error) throw error;
  const { data: urlData } = supabase.storage.from('carpetz').getPublicUrl(filename);
  return urlData.publicUrl;
}
