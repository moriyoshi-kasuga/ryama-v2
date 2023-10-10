'use client';
import React, { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  const { data: session } = useSession();
  const [documents, setDocuments] = useState('');
  const [explorerId, setExplorerId] = useState('');

  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await fetch('/api/document');
      if (!response.ok) {
        return;
      }
      const docuemnts = await response.json();
      console.log(docuemnts);
      setDocuments(docuemnts);
    };
    fetchDocuments();
  }, []);
  const loadDocuments = async () => {
    const response = await fetch('/api/document', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        directoryID: explorerId,
        name: 'test',
      }),
    });
    if (!response.ok) {
      return;
    }
    const json = await response.json();
    setDocuments(json);
  };
  const getExplorerId = async () => {
    const response = await fetch('/api/explorer');
    if (!response.ok) {
      return;
    }
    const json = await response.json();
    setExplorerId(json.id);
  };
  if (session) {
    return (
      <>
        Signed in as {session.user!.name} <br />
        Signed in as {session.user!.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <div>{JSON.stringify(documents)}</div>
        <br />
        <button onClick={() => getExplorerId()}>ID: {explorerId}</button>
        <br />
        <button onClick={() => loadDocuments()}> Add document</button>
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
