'use client';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Page() {
  return (
    <>
      <div className="flex flex-col justify-center mx-auto w-full h-screen items-center">
        <h1>Home</h1>
        <Link href="/signin">Sign in</Link>
        <Link href="/signup">Sign up</Link>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    </>
  );
}
