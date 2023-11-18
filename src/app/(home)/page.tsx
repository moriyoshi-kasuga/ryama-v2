'use client';
import { useAuth } from '@/contexts/AuthContexts';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function Page() {
  const auth = useAuth();
  return (
    <>
      <div className="flex flex-col justify-center mx-auto w-full h-full items-center">
        <h1>Home</h1>
        <Link href="/signin">Sign in</Link>
        <Link href="/signup">Sign up</Link>
        <button
          onClick={async () => {
            await auth.logout();
            toast.success('Logged out!', {
              duration: 3000,
              position: 'top-center',
            });
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
}
