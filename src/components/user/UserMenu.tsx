'use client';

import { Session } from '@supabase/supabase-js';

export default function UserMenu({ session }: { session: Session | null }) {
  if (!session) {
    return null;
  }
  return <></>;
  // TODO: ここでヘッダーに表示するユーザのハンバーガーメニューを作成する
  // settings だったり dark mod, light mode 切り替えやログアウトもここで実装する
}
