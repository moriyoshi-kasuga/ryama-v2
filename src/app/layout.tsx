import './globals.css';
import type { Metadata } from 'next';
import SessionProvider from '@/provider/SessionProvider';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RYAMA-V2',
  description: 'RYAMA を next.js で作り、機能を追加したりなどしたものです。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </SessionProvider>
  );
}
