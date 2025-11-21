import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Axiom Token Table - Real-time Token Trading Discovery',
  description: 'Discover new trading pairs, track final stretch tokens, and explore migrated tokens with real-time updates',
  keywords: 'crypto, token, trading, axiom, blockchain, defi',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
