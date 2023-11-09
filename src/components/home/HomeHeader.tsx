import { AiOutlineArrowRight } from 'react-icons/ai';
import React from 'react';

export default function HomeHeader() {
  return (
    <header className="border-b border-b-gray-200">
      <div className="container mx-auto flex items-center justify-between text-gray-400 fill-gray-400 p-1">
        <div className="flex items-center">
          <a
            className="mr-4 flex items-center gap-x-2 transition-colors current"
            href="/"
          >
            <h1 className="text-3xl text-black font-sans font-thin">Ryama</h1>
          </a>
        </div>
        <div className="ml-auto hidden sm:flex">
          <a
            className="px-3 py-2 font-medium hover:text-black transition"
            href="/public"
          >
            PUBLIC
          </a>
          <a
            className="px-3 py-2 font-medium hover:text-black transition"
            href="/features"
          >
            FEATURES
          </a>
          <a
            className="px-3 py-2 font-medium hover:text-black transition"
            href="/signup"
          >
            SIGN UP
          </a>
          <a
            className="px-3 py-2 font-bold hover:text-black transition flex items-center"
            href="/signin"
          >
            SIGN IN <AiOutlineArrowRight />
          </a>
        </div>
      </div>
    </header>
  );
}
