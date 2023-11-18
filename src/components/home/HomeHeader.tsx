'use client';
import { VscAccount } from 'react-icons/vsc';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Link from 'next/link';
import UserMenu from '../user/UserMenu';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContexts';
import Loading from '../loading';

export default function HomeHeader() {
  const pathname = usePathname();
  const { loading, profile } = useAuth();
  return (
    <header className='border-b-gray200 h-[var(--header-height)] border-b'>
      <div className='container m-auto flex w-11/12 items-center justify-between fill-gray-400 p-1 text-zinc-400'>
        <div className='flex items-center'>
          <Link className='flex items-center transition-colors' href='/'>
            <h1 className='mx-4 font-sans text-2xl font-thin text-black'>RYAMA</h1>
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
        {(loading && <Loading title='Loading...' className='h-6 w-6' />) ||
          (profile && (
            <>
              <Link
                className={`home-header-big-link ${
                  pathname == '/workspace' ? 'active' : ''
                }`}
                href='/workspace'
              >
                <span>workspace</span>
                <AiOutlineArrowRight />
              </Link>
              <UserMenu profile={profile} />
            </>
          )) || (
            <>
              <Link
                className={`home-header-icon-link ${
                  pathname === '/signup' ? 'active' : ''
                }`}
                href='/signup'
              >
                <VscAccount />
                <span>signup</span>
              </Link>
              <Link
                className={`home-header-big-link ${
                  pathname == '/signin' ? 'active' : ''
                }`}
                href='/signin'
              >
                <span>sign in</span>
                <AiOutlineArrowRight />
              </Link>
            </>
          )}
      </div>
    </header>
  );
}
