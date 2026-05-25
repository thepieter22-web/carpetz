'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const STATUSES = [
  { value: 'paid', label: 'Betaald', color: 'bg-blue-100 text-blue-700' },
  { value: 'in_production', label: 'In productie', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'shipped', label: 'Verzonden', color: 'bg-purple-100 text-purple-700' },
  { value: 'delivered', label: 'Geleverd', color: 'bg-green-100 text-green-700' },
];

export default function OrderStatusUpdater({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  const updateStatus = async () => {
    setLoading(true);
    try {
      await fetch('/api/orders/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        {STATUSES.map((s) => (
          <button
            key={s.value}
            onClick={() => setStatus(s.value)}
            className={`p-2 rounded-lg border-2 text-xs font-medium transition-all ${
              status === s.value ? 'border-carpetz-primary ' + s.color : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <button
        onClick={updateStatus}
        disabled={loading || status === currentStatus}
        className={`w-full py-2 rounded-lg text-sm font-medium transition-all ${
          status !== currentStatus
            ? 'bg-carpetz-primary text-white hover:bg-carpetz-dark'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
      >
        {loading ? 'Opslaan...' : saved ? '✓ Opgeslagen!' : 'Status bijwerken'}
      </button>
    </div>
  );
}
