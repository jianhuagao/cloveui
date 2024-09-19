// components/MenuItem.tsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import React from 'react';

const pubClass = 'px-3 py-2 ring-1 ring-transparent transition-all active:scale-95';
const hoverClass = 'hover:bg-white hover:dark:bg-[#18181b] rounded-lg hover:dark:ring-white/10 cursor-pointer select-none';
const activeClass = 'bg-white dark:bg-[#18181b] dark:ring-white/10'; // 高亮样式

interface MenuItemProps {
  title: string;
  slug: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, slug }) => {
  const pathname = usePathname();
  const url = `/docs/comp/${slug}`;
  const isActive = pathname === url;

  return (
    <Link
      href={url}
      className={clsx(pubClass, hoverClass, {
        [activeClass]: isActive
      })}
    >
      {title}
    </Link>
  );
};

export default MenuItem;
