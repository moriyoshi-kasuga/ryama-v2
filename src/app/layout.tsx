import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NextAuthProvider from '@/provider/NextAuthProvider';

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
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
