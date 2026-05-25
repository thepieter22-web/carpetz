import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { formatPrice } from '@/lib/pricing';

export default async function AdminDashboard() {
  const supabase = createServerComponentClient({ cookies });

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  const stats = {
    total: orders?.length || 0,
    paid: orders?.filter((o) => o.status !== 'pending').length || 0,
    revenue: orders?.filter((o) => o.status !== 'pending').reduce((sum, o) => sum + o.price_incl_vat, 0) || 0,
    pending_supplier: orders?.filter((o) => o.supplier_pdf_sent === false).length || 0,
  };

  const recentOrders = orders?.slice(0, 5) || [];

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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Totaal bestellingen', value: stats.total, color: 'text-carpetz-primary' },
          { label: 'Betaalde orders', value: stats.paid, color: 'text-green-600' },
          { label: 'Omzet', value: formatPrice(stats.revenue), color: 'text-carpetz-primary' },
          { label: '⚠️ Leverancier fout', value: stats.pending_supplier, color: 'text-red-500' },
        ].map((stat) => (
          <div key={stat.label} className="card">
            <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">Recente bestellingen</h2>
          <a href="/admin/bestellingen" className="text-carpetz-primary text-sm hover:underline">Alle orders →</a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 text-gray-500 font-medium">Order</th>
                <th className="text-left py-2 text-gray-500 font-medium">Klant</th>
                <th className="text-left py-2 text-gray-500 font-medium">Formaat</th>
                <th className="text-left py-2 text-gray-500 font-medium">Bedrag</th>
                <th className="text-left py-2 text-gray-500 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order: any) => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3">
                    <a href={`/admin/bestellingen/${order.id}`} className="font-mono text-carpetz-primary hover:underline">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </a>
                  </td>
                  <td className="py-3">{order.customer_first_name} {order.customer_last_name}</td>
                  <td className="py-3">{order.mat_width}×{order.mat_height}cm</td>
                  <td className="py-3 font-medium">{formatPrice(order.price_incl_vat)}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || 'bg-gray-100'}`}>
                      {statusLabels[order.status] || order.status}
                    </span>
                    {order.supplier_pdf_sent === false && (
                      <span className="ml-2 text-red-500 text-xs">⚠️ PDF fout</span>
                    )}
                  </td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr><td colSpan={5} className="py-8 text-center text-gray-400">Nog geen bestellingen</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
