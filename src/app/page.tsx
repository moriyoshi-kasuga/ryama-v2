'use client';
import React, { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  const { data: session } = useSession();
  const [docuemnts, setDocuments] = useState('');

  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await fetch('/api/document');
      console.log(response.ok);
      if (!response.ok) {
        return;
      }
      const docuemnts = await response.json();
      console.log(docuemnts);
      setDocuments(docuemnts);
    };
    fetchDocuments();
  }, []);
  if (session) {
    return (
      <>
        Signed in as {session.user!.name} <br />
        Signed in as {session.user!.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        {docuemnts}
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
