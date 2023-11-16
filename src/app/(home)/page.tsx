'use client';
import { useAuth } from '@/contexts/AuthContexts';
import Link from 'next/link';

export default function Page() {
  const auth = useAuth();
  return (
    <>
      <div className="flex flex-col justify-center mx-auto w-full h-full items-center">
        <h1>Home</h1>
        <Link href="/signin">Sign in</Link>
        <Link href="/signup">Sign up</Link>
        <button onClick={() => auth?.logout()}>Logout</button>
      </div>
    </>
  );
}
