'use client';

import { useSession } from 'next-auth/react';

export default function UserMenu() {
  const { data: session, status } = useSession();
  if (status != 'authenticated') {
    return null;
  }
  return (
    <>
      <div>Hello:{session?.user?.name}</div>
    </>
  );
  // TODO: ここでヘッダーに表示するユーザのハンバーガーメニューを作成する
  // settings だったり dark mod, light mode 切り替えやログアウトもここで実装する
}
