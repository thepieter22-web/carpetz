'use client';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const login = async () => {
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError('Ongeldige inloggegevens');
    } else {
      router.push('/admin');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-carpetz-bg flex items-center justify-center px-4">
      <div className="max-w-sm w-full">
        <div className="card">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-full bg-carpetz-primary flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <h1 className="text-xl font-bold">Carpetz Admin</h1>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">E-mail</label>
              <input type="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Wachtwoord</label>
              <input type="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && login()} />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button onClick={login} disabled={loading} className="btn-primary w-full">
              {loading ? 'Inloggen...' : 'Inloggen'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
