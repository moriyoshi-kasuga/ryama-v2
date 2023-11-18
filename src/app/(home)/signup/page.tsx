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
  name: z
    .string({ coerce: true, errorMap: createZodErrorMap('name') })
    .min(3)
    .max(20),
  email: z.string({ coerce: true, errorMap: createZodErrorMap('email') }).email(),
  password: z
    .string({ coerce: true, errorMap: createZodErrorMap('password') })
    .min(6)
    .max(20),
});

type Copy = z.infer<typeof schema>;

export default function Page() {
  const auth = useAuth();
  const [error, setError] = useState('');

  const { register, handleSubmit } = useForm<Copy>({});

  const submit = async (data: Copy) => {
    const ref = await schema.safeParseAsync(data);
    if (!ref.success) {
      setError(ref.error.errors[0].message);
      return;
    }
    const { name, email, password } = ref.data;
    const res = await auth.signup({ name, email, password });
    const error = res.error?.message;
    if (error) {
      setError(error);
      return;
    }
    setError('');
    toast.success('Please check your email!', {
      duration: 3000,
      position: 'top-center',
    });
    redirect('/workspace');
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
    <div className='flex min-h-full flex-col justify-center'>
      <div className='flex min-h-full flex-col justify-center px-6 lg:px-8'>
        <div className='py-6 sm:mx-auto sm:w-full sm:max-w-sm'>
          <h1 className='pb-8 text-center text-6xl font-thin'>Sign up</h1>
          <button
            onClick={() => handleGoogle()}
            className='relative w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50'
          >
            <span className='absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 bg-[url("/google.svg")] bg-cover bg-center'></span>
            <span className=''>Sign up with Google</span>
          </button>
          <div className='mx-auto my-4 text-center'>or</div>
          <div className={`mb-2 ${error ? 'block' : 'hidden'}`}>
            <div className='rounded border border-red-300 bg-red-50 p-2 text-center text-sm text-red-400'>
              {error}
            </div>
          </div>
          <form onSubmit={handleSubmit(submit)} className='space-y-3' noValidate>
            <div>
              <label htmlFor='name' className='block py-2 font-medium text-gray-600'>
                Name
              </label>
              <input
                type='text'
                {...register('name')}
                className='block w-full rounded-lg border border-gray-50 bg-gray-100 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                placeholder='name'
                id='name'
              />
            </div>
            <div>
              <label htmlFor='email' className='block py-2 font-medium text-gray-600'>
                Email
              </label>
              <input
                type='email'
                {...register('email')}
                className='block w-full rounded-lg border border-gray-50 bg-gray-100 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                placeholder='email'
                id='email'
              />
            </div>
            <div>
              <label htmlFor='password' className='block py-2 font-medium text-gray-600'>
                Password
              </label>
              <input
                type='password'
                {...register('password')}
                className='block w-full rounded-lg border border-gray-50 bg-gray-100 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                placeholder='password'
                id='password'
              />
            </div>
            <input
              type='submit'
              className='w-full rounded-md bg-blue-500 px-5 py-3 text-center  text-white  hover:bg-blue-600  hover:outline-none hover:ring-2 hover:ring-blue-300'
              value='Sign up'
            />
            <div className='my-8 text-sm font-medium leading-6'>
              <p className='text-center text-gray-500'>
                {'Have an account? '}
                <Link
                  href='/signin'
                  className='text-blue-300 transition-colors duration-300 hover:text-blue-500'
                >
                  Sign in an account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
