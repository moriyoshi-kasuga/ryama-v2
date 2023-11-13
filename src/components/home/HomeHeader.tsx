import { AiOutlineArrowRight } from 'react-icons/ai';
import React from 'react';
import Link from 'next/link';

export default function HomeHeader() {
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
        <div className="ml-auto hidden sm:flex">
          <Link
            className="px-3 font-medium text-xs hover:text-black transition"
            href="/public"
          >
            PUBLIC
          </Link>
          <Link
            className="px-3 font-medium text-xs hover:text-black transition"
            href="/features"
          >
            FEATURES
          </Link>
          <Link
            className="px-3 font-medium text-xs hover:text-black transition"
            href="/signup"
          >
            SIGN UP
          </Link>
          <Link
            className="px-3 font-semibold text-xs hover:text-black transition flex items-center"
            href="/signin"
          >
            <span className="mr-1">SIGN IN</span>
            <AiOutlineArrowRight />
          </Link>
        </div>
      </div>
    </header>
  );
}
