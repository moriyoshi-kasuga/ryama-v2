'use client';

import { Profiles } from '@/lib/schema';

export default function UserMenu({ profile }: { profile: Profiles }) {
  return <>{profile.name}</>;
  // TODO: ここでヘッダーに表示するユーザのハンバーガーメニューを作成する
  // settings だったり dark mod, light mode 切り替えやログアウトもここで実装する
}
