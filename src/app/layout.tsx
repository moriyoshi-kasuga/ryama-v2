import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RYAMA-V2',
  description: 'RYAMA を next.js で作り、機能を追加したりなどしたものです。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
