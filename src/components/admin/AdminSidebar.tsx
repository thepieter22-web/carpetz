'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/bestellingen', label: 'Bestellingen', icon: '📦' },
  { href: '/admin/klanten', label: 'Klanten', icon: '👥' },
  { href: '/admin/instellingen', label: 'Instellingen', icon: '⚙️' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 bg-carpetz-dark text-white flex-shrink-0 flex flex-col">
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">C</div>
          <div>
            <p className="font-semibold text-sm">Carpetz</p>
            <p className="text-xs text-white/50">Admin</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === link.href
                ? 'bg-white/20 text-white'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <span>{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-white/10">
        <Link href="/nl" className="flex items-center gap-2 px-3 py-2 text-white/50 hover:text-white text-xs transition-colors">
          ← Website
        </Link>
      </div>
    </aside>
  );
}
