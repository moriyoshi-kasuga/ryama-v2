'use client';

import { useAuth } from '@/app/providers';
import { createZodErrorMap } from '@/utils/zod';
import { Divider, Input } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const schema = z.object({
  email: z.string({ coerce: true, errorMap: createZodErrorMap('email') }).email(),
  password: z
    .string({ coerce: true, errorMap: createZodErrorMap('password') })
    .min(6)
    .max(20),
});

type Copy = z.infer<typeof schema>;

export default function Page() {
  const auth = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');

  const { register, handleSubmit } = useForm<Copy>({});

  const submit = async (data: Copy) => {
    const ref = await schema.safeParseAsync(data);
    if (!ref.success) {
      setError(ref.error.errors[0].message);
      return;
    }
    const { email, password } = ref.data;
    const res = await auth.signin({ email, password });
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
    router.push('/workspace');
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
    <div className='flex min-h-full flex-col justify-center px-6 lg:px-8'>
      <div className='py-6 sm:mx-auto sm:w-full sm:max-w-sm'>
        <h1 className='pb-8 text-center text-6xl font-thin'>Sign in</h1>
        <button
          onClick={() => handleGoogle()}
          className='relative w-full rounded-md border border-default-300 bg-background px-4 py-2 text-sm font-medium text-default-500 hover:bg-default-50'
        >
          <span className='absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 bg-[url("/images/google.svg")] bg-cover bg-center'></span>
          <span className=''>Sign up with Google</span>
        </button>
        <Divider className='my-4' />
        <div className={`mb-2 ${error ? 'block' : 'hidden'}`}>
          <div className='rounded border border-danger-300 bg-danger-50 p-2 text-center text-sm text-danger-400'>
            {error}
          </div>
        </div>
        <form onSubmit={handleSubmit(submit)} className='space-y-3' noValidate>
          <Input type='email' label='email' {...register('email')} id='email' />
          <Input
            type='password'
            label='password'
            {...register('password')}
            id='password'
          />
          <button
            type='submit'
            className='w-full rounded-md bg-primary-400 px-5 py-3 text-center text-default-800  transition  hover:bg-primary-500 hover:outline-none'
          >
            Sign in
          </button>
          <div className='my-8 text-sm font-medium leading-6'>
            <p className='text-center text-default-500'>
              {"Don't have an account? "}
              <Link
                href='/signup'
                className='text-secondary-400 transition-colors duration-300 hover:text-secondary-500'
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
