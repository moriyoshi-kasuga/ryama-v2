'use client';

import { useAuth } from '@/contexts/AuthContexts';
import Link from 'next/link';
import { FormEvent, Suspense, useRef, useState } from 'react';

export default function Page() {
  const auth = useAuth();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = nameRef?.current?.value;
    const email = emailRef?.current?.value;
    const password = passwordRef?.current?.value;

    if (!name) {
      setError("Name can't be empty");
      return;
    }

    if (!email) {
      setError("Email can't be empty");
      return;
    }

    if (!password) {
      setError("Password can't be empty");
      return;
    }

    // FIX: したのTODOで直せる
    // TODO: auth.user と public.profile に対応する
    // TODO: ちょっと youtube のなんかfigmaのやり方から、デザイン作って実際に作るyoutubeの動画見て勉強しよう。

    console.log(await auth?.signup({ name, email, password }));
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex min-h-full flex-col justify-center">
        <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
          <div className="py-6 sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="pb-8 text-6xl text-center font-thin">Sign up</h1>
            <button
              onClick={() => auth?.google()}
              className="relative rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 w-full"
            >
              <span className='bg-[url("/google.svg")] bg-cover bg-center w-6 h-6 absolute left-3 top-1/2 -translate-y-1/2'></span>
              <span className="">Sign up with Google</span>
            </button>
            <div className="my-4 text-center mx-auto">or</div>
            <div className={`mb-2 ${error ? 'block' : 'hidden'}`}>
              <div className="text-red-400 text-sm text-center p-2 rounded border border-red-300 bg-red-50">
                {error}
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3" noValidate>
              <div>
                <label
                  htmlFor="name"
                  className="block py-2 font-medium text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  ref={nameRef}
                  className="bg-gray-100 border border-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="name"
                  id="name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block py-2 font-medium text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  ref={emailRef}
                  className="bg-gray-100 border border-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="email"
                  id="email"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block py-2 font-medium text-gray-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  ref={passwordRef}
                  className="bg-gray-100 border border-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="password"
                  id="password"
                />
              </div>
              <input
                type="submit"
                className="text-white bg-blue-500 hover:bg-blue-600 hover:ring-2 hover:outline-none hover:ring-blue-300  rounded-md  w-full  px-5 py-3 text-center"
                value="Sign up"
              />
              <div className="my-8 leading-6 font-medium text-sm">
                <p className="text-center text-gray-500">
                  {'Have an account? '}
                  <Link
                    href="/signin"
                    className="transition-colors text-blue-300 hover:text-blue-500 duration-300"
                  >
                    Sign in an account
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
