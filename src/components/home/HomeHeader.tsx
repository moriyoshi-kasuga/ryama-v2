import { AiOutlineArrowRight } from 'react-icons/ai';
import React from 'react';

export default function HomeHeader() {
  return (
    <header className="border-b border-b-gray200">
      <div className="w-11/12 container mx-auto flex items-center justify-between text-zinc-400 fill-gray-400 p-1">
        <div className="flex items-center">
          <a className="flex items-center transition-colors" href="/">
            <h1 className="mx-4 text-2xl text-black font-sans font-thin">
              RYAMA
            </h1>
          </a>
        </div>
        <div className="ml-auto hidden sm:flex">
          <a
            className="px-3 font-medium text-xs hover:text-black transition"
            href="/public"
          >
            PUBLIC
          </a>
          <a
            className="px-3 font-medium text-xs hover:text-black transition"
            href="/features"
          >
            FEATURES
          </a>
          <a
            className="px-3 font-medium text-xs hover:text-black transition"
            href="/signup"
          >
            SIGN UP
          </a>
          <a
            className="px-3 font-semibold text-xs hover:text-black transition flex items-center"
            href="/signin"
          >
            <span className="mr-1">SIGN IN</span>
            <AiOutlineArrowRight />
          </a>
        </div>
      </div>
    </header>
  );
}
