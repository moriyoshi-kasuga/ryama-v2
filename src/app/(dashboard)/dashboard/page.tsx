'use client';

import { useAuth } from '@/app/providers';

export default function Page() {
  const auth = useAuth();
  return (
    <>
      <button
        onClick={async () => {
          auth.signOut();
        }}
      >
        Sign out
      </button>
    </>
  );
}
