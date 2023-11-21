'use client';
import HomeHeader from '@/components/home/HomeHeader';
import HomeFooter from '@/components/home/HomeFooter';
import { useAuth } from '../providers';
import { redirect } from 'next/navigation';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const { loading, session } = useAuth();
  if (loading) {
    return;
  }
  if (session) {
    redirect('/dashboard');
  }
  return (
    <>
      <HomeHeader />
      {children}
      <HomeFooter />
    </>
  );
}
