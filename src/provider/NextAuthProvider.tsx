'use client';

import { SessionProvider } from 'next-auth/react';

export interface SessionProviderProps {
  children: React.ReactNode;
}

const NextAuthProvider = ({ children }: SessionProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
