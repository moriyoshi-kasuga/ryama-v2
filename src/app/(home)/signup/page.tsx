'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reperatPassword, setReperatPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
    })
      .then((res) => {
        if (res?.error) {
          alert(res.error);
        }
        router.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex min-h-full flex-col justify-center">
      <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
        <div className="py-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="pb-8 text-6xl text-center font-thin">Log in</h1>
          <div className="mb-2 hidden">
            <div className="text-green-400 text-sm text-center p-2 rounded border border-green-900 bg-green-950"></div>
            <div className="text-red-400 text-sm text-center p-2 rounded border border-red-900 bg-red-950"></div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="email" className="block py-2 font-medium">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-100 border border-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="email"
                id="email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block py-2 font-medium">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-100 border border-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="password"
                id="password"
              />
            </div>
            <input
              type="submit"
              className="text-white bg-blue-500 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-md  w-full  px-5 py-3 text-center"
              value="Log in"
            />
            <div className="my-8 leading-6 font-medium text-sm">
              <p className="text-center text-gray-500">
                {"Don't have an account?"}
                <a
                  href="#"
                  className="transition-colors text-black hover:text-yellow-500"
                >
                  Create an account
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
