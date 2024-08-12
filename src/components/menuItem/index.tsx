// components/MenuItem.tsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import React from 'react';

const hoverClass = 'hover:bg-white hover:dark:bg-[#18181b] rounded-lg cursor-pointer select-none';
const activeClass = 'bg-white dark:bg-[#18181b]'; // 高亮样式

interface MenuItemProps {
  title: string;
  slug: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, slug }) => {
  const pathname = usePathname();
  const url = `/docs/comp/${slug}`;
  const isActive = pathname === url;

  return (
    <Link href={url} className={clsx('px-3 py-2', hoverClass, { [activeClass]: isActive })}>
      {title}
    </Link>
  );
};

export default MenuItem;
