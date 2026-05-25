import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Carpetz — Logomatten op maat',
  description: 'Gepersonaliseerde logomatten voor elk bedrijf. Bestel vanaf 1 stuk, levering in 48u.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
