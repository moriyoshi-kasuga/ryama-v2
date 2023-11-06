import HomeAppBar from '@/components/home/HomeAppBar';
import HomeFooter from '@/components/home/HomeFooter';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HomeAppBar />
      {children}
      <HomeFooter />
    </>
  );
}
