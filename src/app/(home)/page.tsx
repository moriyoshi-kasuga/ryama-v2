'use client';
import { useAuth } from '@/app/providers';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function Page() {
  const { signOut, profile } = useAuth();
  return (
    <>
      <div className='mx-auto flex h-full w-full flex-col items-center justify-center'>
        <h1>Home</h1>
        <Link href='/signin'>Sign in</Link>
        <Link href='/signup'>Sign up</Link>
        <p>usename: {profile?.name}</p>
        <button
          onClick={() => {
            signOut().then(() => {
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
