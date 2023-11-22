'use client';
import { VscAccount } from 'react-icons/vsc';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function HomeHeader() {
  const pathname = usePathname();
  const getLink = (href: string, inner?: React.ReactNode) => {
    return (
      <Link
        className={`home-header-link ${pathname === href ? 'active' : ''}`}
        href={href}
      >
        {inner ?? href.replace('/', '')}
      </Link>
    );
  };

  return (
    <header className='h-[var(--header-height)] border-b border-b-divider'>
      <div className='container m-auto flex w-11/12 items-center justify-between p-1 text-default-400'>
        <div className='flex items-center'>
          <Link className='flex items-center transition-colors' href='/'>
            <h1 className='mx-4 font-sans text-2xl font-thin'>RYAMA</h1>
          </Link>
        </div>
        <div className='ml-auto hidden items-center sm:flex'>
          {getLink('/public')}
          {getLink('/features')}
          {getLink(
            '/signup',
            <>
              <VscAccount />
              <span>signup</span>
            </>,
          )}
          {getLink(
            '/signin',
            <>
              <span>sign in</span>
              <AiOutlineArrowRight />
            </>,
          )}
        </div>
      </div>
    </header>
  );
}
