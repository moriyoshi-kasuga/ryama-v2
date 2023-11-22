'use client';
import HomeHeader from '@/components/home/HomeHeader';
import HomeFooter from '@/components/home/HomeFooter';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HomeHeader />
      {children}
      <HomeFooter />
    </>
  );
}
