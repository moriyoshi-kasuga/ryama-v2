'use client';

import { useAuth } from '@/contexts/AuthContexts';
import { createZodErrorMap } from '@/utils/zod';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const schema = z.object({
  email: z
    .string({ coerce: true, errorMap: createZodErrorMap('email') })
    .email(),
  password: z
    .string({ coerce: true, errorMap: createZodErrorMap('password') })
    .min(6)
    .max(20),
});

type Copy = z.infer<typeof schema>;

export default function Page({}) {
  const auth = useAuth();
  const [error, setError] = useState('');

  const { register, handleSubmit } = useForm<Copy>({});

  const submit = async (data: Copy) => {
    const ref = await schema.safeParseAsync(data);
    if (!ref.success) {
      setError(ref.error.errors[0].message);
      return;
    }
    const { email, password } = ref.data;
    const res = await auth.login({ email, password });
    const error = res.error?.message;
    if (error) {
      setError(error);
      return;
    }
    setError('');
    toast.success('Logged in!', {
      duration: 3000,
      position: 'top-center',
    });
    redirect('/workspace')
  };

  const handleGoogle = async () => {
    const res = await auth.google();
    const error = res.error?.message;
    if (error) {
      setError(error);
      return;
    }
    setError('');
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
      <div className="py-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="pb-8 text-6xl text-center font-thin">Sign in</h1>
        <button
          onClick={() => handleGoogle()}
          className="relative rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 w-full"
        >
          <span className='bg-[url("/google.svg")] bg-cover bg-center w-6 h-6 absolute left-3 top-1/2 -translate-y-1/2'></span>
          <span className="">Sign in with Google</span>
        </button>
        <div className="mt-4 mb-6">
          <div className="text-red-400 text-sm text-center p-2 rounded border border-red-300 bg-red-50 h-10 empty:hidden">
            {error}
          </div>
        </div>
        <form onSubmit={handleSubmit(submit)} className="space-y-3" noValidate>
          <div>
            <label
              htmlFor="email"
              className="block py-2 font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              {...register('email')}
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
              {...register('password')}
              className="bg-gray-100 border border-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-600 hover:ring-2 hover:outline-none hover:ring-blue-300  rounded-md  w-full  px-5 py-3 text-center"
          >
            Sign in
          </button>
          <div className="my-8 leading-6 font-medium text-sm">
            <p className="text-center text-gray-500">
              {"Don't have an account? "}
              <Link
                href="/signup"
                className="transition-colors text-blue-300 hover:text-blue-500 duration-300"
              >
                Create an account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
