'use client';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

// TODO: component とか page の function か const どちらかに統一しよう。

export default function Page() {
  const { data: session, status } = useSession();
  return (
    <>
      <h1>Home</h1>
      {session ? (
        <div>
          Signed in as {session?.user?.name}
          <br />
          email: {session?.user?.email}
        </div>
      ) : (
        <Link href="/signin">Sign in</Link>
      )}
      <br />
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
}
