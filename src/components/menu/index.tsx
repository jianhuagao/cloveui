'use client';
import { memo, useContext } from 'react';
import clsx from 'clsx';
import React from 'react';
import MenuItem, { BlogMenuItem } from '../menuItem';
import RouterContext from '@/context/routerContext';
import Image from 'next/image';
import Link from 'next/link';

const miniText = 'text-xs/6 font-medium text-zinc-500 dark:text-zinc-400';

export interface MenuItemProps {
  title: string;
  slug: string;
  children?: MenuItemProps[];
}

export default memo(function Menu() {
  const routerContext = useContext(RouterContext);
  return (
    <div className="flex grow flex-col overflow-hidden">
      <div className="flex flex-shrink grow flex-col gap-1 overflow-auto p-4">
        {routerContext?.menuItems?.map(type => {
          const itemsTitle = <div className={clsx('px-3 pt-2 first:pt-0', miniText)}>{type.title}</div>;
          const items = type.children?.map(c => {
            return <MenuItem slug={c.slug} title={c.title} key={c.slug} />;
          });
          return (
            <React.Fragment key={type.slug}>
              {itemsTitle}
              {items}
            </React.Fragment>
          );
        })}
      </div>
      <div className="flex-shrink-0 p-5 pb-0">
        <div className="flex flex-col gap-1 border-t border-zinc-950/5 pt-4 transition-all dark:border-white/5">
          <BlogMenuItem>
            <Image src="/icons/book.svg" alt="book" className="dark:invert" width={16} height={16} priority />
            Blog
          </BlogMenuItem>
          <ul className="list-disc text-xs opacity-80">
            {[1, 2].map(s => (
              <li key={s} className="cursor-pointer select-none truncate py-2 transition-all hover:scale-105 active:scale-100">
                <Link href={`/docs/blog/${s}`}>[08-16] The blog is currently being written.</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
});
