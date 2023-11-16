'use client';
import { Profile } from '@/contexts/AuthContexts';

export default function UserMenu({ profile }: { profile: Profile }) {
  return <>{profile.name}</>;
  // TODO: ここでヘッダーに表示するユーザのハンバーガーメニューを作成する
  // settings だったり dark mod, light mode 切り替えやログアウトもここで実装する
}
