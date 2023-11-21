'use client';
import { useAuth } from '@/app/providers';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function Page() {
  const auth = useAuth();
  return (
    <>
      <div className='mx-auto flex h-full w-full flex-col items-center justify-center'>
        <h1>Home</h1>
        <Link href='/signin'>Sign in</Link>
        <Link href='/signup'>Sign up</Link>
        <button
          onClick={() => {
            auth.signOut().then(() => {
              toast.success('Logged out!', {
                duration: 3000,
                position: 'top-center',
              });
            });
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
}
