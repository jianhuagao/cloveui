'use client';
import { memo, useContext } from 'react';
import clsx from 'clsx';
import React from 'react';
import MenuItem from '../menuItem';
import RouterContext from '@/context/routerContext';

const miniText = 'text-xs/6 font-medium text-zinc-500 dark:text-zinc-400';

export interface MenuItemProps {
  title: string;
  slug: string;
  children?: MenuItemProps[];
}

export default memo(function Menu() {
  const routerContext = useContext(RouterContext);
  return (
    <div className="flex grow flex-col gap-1 overflow-auto p-4">
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
  );
});
