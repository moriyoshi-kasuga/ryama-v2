'use client';
import React from 'react';
import UserMenu from './UserMenu';

export default function Header() {
  return (
    <header className='h-[var(--header-height)] border-b border-b-divider'>
      <div className='m-auto flex items-center justify-between p-1 text-default-400'>
        <h1 className='mx-4 select-none font-sans text-2xl font-thin'>RYAMA</h1>
        <div className='ml-auto hidden items-center sm:flex'>
          <div className='mr-5'>
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
