'use client';
import { VscAccount } from 'react-icons/vsc';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function HomeHeader() {
  const pathname = usePathname();
  return (
    <header className='h-[var(--header-height)] border-b border-b-divider'>
      <div className='container m-auto flex w-11/12 items-center justify-between p-1 text-default-400'>
        <div className='flex items-center'>
          <Link className='flex items-center transition-colors' href='/'>
            <h1 className='mx-4 font-sans text-2xl font-thin'>RYAMA</h1>
          </Link>
        </div>
        <div className='ml-auto hidden items-center sm:flex'>
          <Link
            className={`home-header-link ${pathname === '/public' ? 'active' : ''}`}
            href='/public'
          >
            public
          </Link>
          <Link
            className={`home-header-link ${pathname === '/features' ? 'active' : ''}`}
            href='/features'
          >
            features
          </Link>
        </div>
        <Link
          className={`home-header-link ${pathname === '/signup' ? 'active' : ''}`}
          href='/signup'
        >
          <VscAccount />
          <span>signup</span>
        </Link>
        <Link
          className={`home-header-link ${pathname == '/signin' ? 'active' : ''}`}
          href='/signin'
        >
          <span>sign in</span>
          <AiOutlineArrowRight />
        </Link>
      </div>
    </header>
  );
}
