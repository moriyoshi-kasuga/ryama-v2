'use client';

import Header from '@/components/workspace/Header';
import React from 'react';

export default function WorkSpaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header>{children}</Header>
    </>
  );
}
