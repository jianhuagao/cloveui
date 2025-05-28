// components/MenuItem.tsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import React from 'react';

const pubClass = 'px-3 py-2 ring-1 ring-transparent transition-all active:scale-95';
const hoverClass = 'hover:bg-white hover:dark:bg-[#18181b] rounded-lg hover:dark:ring-white/10 cursor-pointer select-none';
const activeClass = 'bg-white text-violet-500 dark:bg-[#18181b] dark:ring-white/10'; // 高亮样式

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

const articleMenuItemPubClass =
  'flex cursor-pointer items-center gap-2 rounded-lg px-0 py-2 ring-1 ring-transparent backdrop-blur-sm transition-all';
const articleMenuItemHoverClass = 'hover:bg-white/60 hover:px-3 dark:hover:bg-black/20 dark:hover:ring-white/5';
const articleMenuItemActiveClass = 'bg-white/60 px-3 dark:bg-black/20 dark:ring-white/5';
export const ArticleMenuItem = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname.indexOf('/docs/article/') !== -1;

  return (
    <Link
      href="/docs/article/directory"
      className={clsx(articleMenuItemPubClass, articleMenuItemHoverClass, { [articleMenuItemActiveClass]: isActive })}
    >
      {children}
    </Link>
  );
};

export const PlayMenuItem = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname.indexOf('/docs/play') !== -1;

  return (
    <Link
      // href="/docs/play"
      target="_blank"
      href="https://play.cloveui.asia"
      className={clsx(articleMenuItemPubClass, articleMenuItemHoverClass, { [articleMenuItemActiveClass]: isActive })}
    >
      {children}
    </Link>
  );
};
