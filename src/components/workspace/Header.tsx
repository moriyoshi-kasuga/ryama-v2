'use client';
import Link from 'next/link';
import React from 'react';
import UserMenu from './UserMenu';

export default function Header() {
  return (
    <header className='h-[var(--header-height)] border-b border-b-divider'>
      <div className='container m-auto flex w-11/12 items-center justify-between p-1 text-default-400'>
        <div className='flex items-center'>
          <Link className='flex items-center transition-colors' href='/'>
            <h1 className='mx-4 font-sans text-2xl font-thin'>RYAMA</h1>
          </Link>
        </div>
        <div className='ml-auto hidden items-center sm:flex'>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
