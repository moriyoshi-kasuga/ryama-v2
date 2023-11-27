'use client';

import { Spinner } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { IoMoon } from 'react-icons/io5';
import { MdSunny } from 'react-icons/md';
export default function ThemeButton({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <Spinner size='sm' />;
  return (
    <>
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className={className}
      >
        {mounted && <>{theme === 'dark' ? <MdSunny /> : <IoMoon />}</>}
      </button>
    </>
  );
}
