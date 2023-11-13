'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent, Suspense, useState } from 'react';

export default function Page() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

    await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          router.push('/signin');
        } else {
          res.json().then((data) => {
            setError(data.message);
          });
        }
      })
      .catch((err) => {
        setError('Server error');
        console.log(err);
      });
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex min-h-full flex-col justify-center">
        <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
          <div className="py-6 sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="pb-8 text-6xl text-center font-thin">Sign up</h1>
            <button
              onClick={() => signIn('google')}
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
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
                  <a
                    href="/signin"
                    className="transition-colors text-blue-300 hover:text-blue-500 duration-300"
                  >
                    Sign in an account
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
