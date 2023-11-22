'use client';

import { useAuth } from '@/app/providers';
import UserMenu from '@/components/user/UserMenu';

export default function Page() {
  const { loading, profile, signOut } = useAuth();
  return (
    <>
      {loading}
      {(loading && <div>Loading...</div>) ||
        (profile && <UserMenu profile={profile} />) || <div>Not signed in</div>}
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
}
