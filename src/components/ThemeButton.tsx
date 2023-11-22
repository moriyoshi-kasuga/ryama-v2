'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { IoMoon } from 'react-icons/io5';
import { MdSunny } from 'react-icons/md';
export default function ThemeButton() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return (
    <>
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        {mounted && <>{theme === 'dark' ? <MdSunny /> : <IoMoon />}</>}
      </button>
    </>
  );
}
