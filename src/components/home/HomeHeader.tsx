'use client';
import { VscAccount } from 'react-icons/vsc';
import { AiOutlineArrowRight } from 'react-icons/ai';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import UserMenu from '../user/UserMenu';
import { useSession } from 'next-auth/react';
import Loading from '../loading';

export default function HomeHeader() {
  const pathname = usePathname();
  const session = useSession();

  function userMenu() {
    if (session.status == 'loading') {
      return <Loading className="w-8 h-8" title="Loading..." />;
    }
    if (session.status == 'authenticated') {
      return (
        <>
          <Link
            className={`home-header-big-link ${
              pathname == '/workspace' ? 'active' : ''
            }`}
            href="/workspace"
          >
            <span>workspace</span>
            <AiOutlineArrowRight />
          </Link>
          <UserMenu />
        </>
      );
    }
    return (
      <>
        <Link
          className={`home-header-icon-link ${
            pathname === '/signup' ? 'active' : ''
          }`}
          href="/signup"
        >
          <VscAccount />
          <span>signup</span>
        </Link>
        <Link
          className={`home-header-big-link ${
            pathname == '/signin' ? 'active' : ''
          }`}
          href="/signin"
        >
          <span>sign in</span>
          <AiOutlineArrowRight />
        </Link>
      </>
    );
  }

  return (
    <header className="border-b border-b-gray200">
      <div className="w-11/12 container mx-auto flex items-center justify-between text-zinc-400 fill-gray-400 p-1">
        <div className="flex items-center">
          <Link className="flex items-center transition-colors" href="/">
            <h1 className="mx-4 text-2xl text-black font-sans font-thin">
              RYAMA
            </h1>
          </Link>
        </div>
        <div className="ml-auto hidden sm:flex items-center">
          <Link
            className={`home-header-link ${
              pathname === '/public' ? 'active' : ''
            }`}
            href="/public"
          >
            public
          </Link>
          <Link
            className={`home-header-link ${
              pathname === '/features' ? 'active' : ''
            }`}
            href="/features"
          >
            features
          </Link>
        </div>
        {userMenu()}
      </div>
    </header>
  );
}
