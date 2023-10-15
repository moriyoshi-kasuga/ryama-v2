'use client';
import React, { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import HomeAppBar from '@/components/home/HomeAppBar';

export default function Home() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <HomeAppBar />
        Signed in as {session.user!.name} <br />
        Signed in as {session.user!.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <Link href="/signin">Sign in</Link>
    </>
  );
}
