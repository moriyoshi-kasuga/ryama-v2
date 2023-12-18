'use client';

import { useAuth } from '@/app/providers';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { createZodErrorMap, excludeSpecialChars } from '@/utils/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Divider, Input } from '@nextui-org/react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const schema = z.object({
  name: excludeSpecialChars(
    z
      .string({ coerce: true, errorMap: createZodErrorMap('name') })
      .min(3)
      .max(20),
  ),
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
  const [isVisible, setIsVisiable] = useState(false);

  const toggleVisibility = () => setIsVisiable(!isVisible);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Copy>({ resolver: zodResolver(schema) });

  const submit = async (data: Copy) => {
    const { name, email, password } = data;
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
    <div className='flex h-full flex-col justify-center'>
      <div className='mx-auto w-5/6 max-w-sm  py-6'>
        <h1 className='select-none pb-7 text-center text-6xl font-thin'>Sign up</h1>
        <div className='mb-4 mt-1 h-10 rounded border border-danger-300 bg-danger-50 p-2 text-center text-sm text-danger-400 empty:border-none empty:bg-transparent'>
          {errors.name?.message ??
            errors.email?.message ??
            errors.password?.message ??
            error}
        </div>
        {/*TODO: add toast for google login process if logged in to send 'Logged IN!' message , else that loggin system error message*/}
        <button
          onClick={() => handleGoogle()}
          className='relative w-full rounded-md border border-default-300 bg-background px-4 py-2 text-sm font-medium text-default-500 hover:bg-default-50'
        >
          <span className='absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 bg-[url("/images/google.svg")] bg-cover bg-center'></span>
          <span className=''>Sign up with Google</span>
        </button>
        <Divider className='my-4' />
        <form onSubmit={handleSubmit(submit)} className='space-y-3' noValidate>
          <Input
            type='text'
            id='name'
            label='name'
            labelPlacement='inside'
            placeholder='Enter your name'
            variant='bordered'
            {...register('name')}
            isInvalid={!!errors.name?.message}
          />
          <Input
            type='email'
            id='email'
            label='email'
            labelPlacement='inside'
            placeholder='Enter your email'
            variant='bordered'
            {...register('email')}
            isInvalid={!!errors.email?.message}
          />
          <Input
            id='password'
            label='password'
            labelPlacement='inside'
            placeholder='Enter your password'
            variant='bordered'
            {...register('password')}
            endContent={
              <button
                className='focus:outline-none'
                type='button'
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <AiFillEyeInvisible className='pointer-events-none text-2xl text-default-400' />
                ) : (
                  <AiFillEye className='pointer-events-none text-2xl text-default-400' />
                )}
              </button>
            }
            type={isVisible ? 'text' : 'password'}
            isInvalid={!!errors.password?.message}
          />
          <button
            type='submit'
            className='w-full rounded-md bg-primary-400 px-5 py-3 text-center text-default-800  transition  hover:bg-primary-500 hover:outline-none'
          >
            Sign up
          </button>
          <div className='my-8 text-sm font-medium leading-6'>
            <p className='text-center text-default-500'>
              {'Have an account? '}
              <Link
                href='/signup'
                className='text-secondary-400 transition-colors duration-300 hover:text-secondary-500'
              >
                Sign in an account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
