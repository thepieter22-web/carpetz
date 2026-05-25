import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { formatPrice } from '@/lib/pricing';
import OrderStatusUpdater from '@/components/admin/OrderStatusUpdater';

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies });
  const { data: order } = await supabase.from('orders').select('*').eq('id', params.id).single();

  if (!order) notFound();

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <a href="/admin/bestellingen" className="text-gray-400 hover:text-carpetz-primary text-sm">← Bestellingen</a>
        <span className="text-gray-300">/</span>
        <h1 className="text-xl font-bold">#{order.id.slice(0, 8).toUpperCase()}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mat specs */}
        <div className="card">
          <h2 className="font-semibold mb-4">Matspecificaties</h2>
          <div className="space-y-2 text-sm">
            {[
              ['Formaat', `${order.mat_width} × ${order.mat_height} cm`],
              ['Oppervlakte', `${order.mat_width * order.mat_height} cm²`],
              ['Type', order.mat_type],
              ['Plaatsing', order.mat_placement],
              ['Oriëntatie', order.mat_orientation],
              ['Rand', order.mat_border],
              ['Aantal', order.quantity],
            ].map(([k, v]) => (
              <div key={String(k)} className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">{k}</span>
                <span className="font-medium">{v}</span>
              </div>
            ))}
            <div className="flex justify-between py-1 items-center">
              <span className="text-gray-500">Matkleur</span>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full border border-gray-200" style={{ backgroundColor: order.mat_color }} />
                <span className="font-mono text-xs">{order.mat_color}</span>
              </div>
            </div>
          </div>

          {order.logo_url && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">Logo</p>
              <div className="rounded-lg flex items-center justify-center p-4" style={{ backgroundColor: order.mat_color }}>
                <img src={order.logo_url} alt="Logo" className="h-16 object-contain" />
              </div>
              <a href={order.logo_url} target="_blank" className="text-xs text-carpetz-primary hover:underline mt-2 block">
                Download logo →
              </a>
            </div>
          )}
        </div>

        {/* Customer */}
        <div className="card">
          <h2 className="font-semibold mb-4">Klantgegevens</h2>
          <div className="space-y-1 text-sm">
            <p className="font-medium">{order.customer_first_name} {order.customer_last_name}</p>
            {order.is_company && <p className="text-gray-500">{order.company_name} · {order.vat_number}</p>}
            <p className="text-gray-500">{order.customer_email}</p>
            <p className="text-gray-500">{order.customer_phone}</p>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="font-medium text-gray-700">Leveringsadres</p>
              <p className="text-gray-500">{order.customer_address}</p>
              <p className="text-gray-500">{order.customer_postal_code} {order.customer_city}</p>
              <p className="text-gray-500">{order.customer_country}</p>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="card">
          <h2 className="font-semibold mb-4">Financieel</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Excl. BTW</span>
              <span>{formatPrice(order.price_excl_vat)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">BTW (21%)</span>
              <span>{formatPrice(order.vat_amount)}</span>
            </div>
            <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-100">
              <span>Totaal</span>
              <span className="text-carpetz-primary">{formatPrice(order.price_incl_vat)}</span>
            </div>
          </div>
        </div>

        {/* Status management */}
        <div className="card">
          <h2 className="font-semibold mb-4">Status beheren</h2>
          <OrderStatusUpdater orderId={order.id} currentStatus={order.status} />

          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">Leverancier PDF</p>
            {order.supplier_pdf_sent === true && <p className="text-green-600 text-sm font-medium">✓ Succesvol verstuurd</p>}
            {order.supplier_pdf_sent === false && (
              <div>
                <p className="text-red-500 text-sm font-medium">⚠️ Verzending mislukt</p>
                {order.supplier_error && <p className="text-xs text-gray-400 mt-1">{order.supplier_error}</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
