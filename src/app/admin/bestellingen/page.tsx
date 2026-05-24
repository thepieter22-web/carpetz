import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { formatPrice } from '@/lib/pricing';
import Link from 'next/link';

const statusColors: Record<string, string> = {
  pending: 'bg-gray-100 text-gray-600',
  paid: 'bg-blue-100 text-blue-700',
  in_production: 'bg-yellow-100 text-yellow-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
};

const statusLabels: Record<string, string> = {
  pending: 'In afwachting',
  paid: 'Betaald',
  in_production: 'In productie',
  shipped: 'Verzonden',
  delivered: 'Geleverd',
};

export default async function OrdersPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Bestellingen</h1>
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 text-gray-500 font-medium">Order</th>
              <th className="text-left py-2 text-gray-500 font-medium">Datum</th>
              <th className="text-left py-2 text-gray-500 font-medium">Klant</th>
              <th className="text-left py-2 text-gray-500 font-medium">Mat</th>
              <th className="text-left py-2 text-gray-500 font-medium">Bedrag</th>
              <th className="text-left py-2 text-gray-500 font-medium">Status</th>
              <th className="text-left py-2 text-gray-500 font-medium">Leverancier</th>
            </tr>
          </thead>
          <tbody>
            {(orders || []).map((order: any) => (
              <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="py-3">
                  <Link href={`/admin/bestellingen/${order.id}`} className="font-mono text-carpetz-primary hover:underline">
                    #{order.id.slice(0, 8).toUpperCase()}
                  </Link>
                </td>
                <td className="py-3 text-gray-500">{new Date(order.created_at).toLocaleDateString('nl-BE')}</td>
                <td className="py-3">
                  <div>{order.customer_first_name} {order.customer_last_name}</div>
                  {order.is_company && <div className="text-xs text-gray-400">{order.company_name}</div>}
                </td>
                <td className="py-3">{order.mat_width}×{order.mat_height}cm</td>
                <td className="py-3 font-medium">{formatPrice(order.price_incl_vat)}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || 'bg-gray-100'}`}>
                    {statusLabels[order.status] || order.status}
                  </span>
                </td>
                <td className="py-3">
                  {order.supplier_pdf_sent === true && <span className="text-green-600 text-xs">✓ Verstuurd</span>}
                  {order.supplier_pdf_sent === false && <span className="text-red-500 text-xs">⚠️ Fout</span>}
                  {order.supplier_pdf_sent === null && <span className="text-gray-400 text-xs">—</span>}
                </td>
              </tr>
            ))}
            {(!orders || orders.length === 0) && (
              <tr><td colSpan={7} className="py-8 text-center text-gray-400">Nog geen bestellingen</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
