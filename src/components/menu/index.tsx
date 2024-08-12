import { memo } from 'react';
import clsx from 'clsx';
import { join } from 'path';
import { promises as fs } from 'fs';
import React from 'react';
import MenuItem from '../menuItem';

const miniText = 'text-xs/6 font-medium text-zinc-500 dark:text-zinc-400';

interface MenuItemProps {
  title: string;
  slug: string;
  children?: MenuItemProps[];
}

async function getComponents() {
  let menuItems: MenuItemProps[] = [];

  const componentsTypePath = join(process.cwd(), '/src/data/components');
  const componentsTypeSlugs = await fs.readdir(componentsTypePath);

  for (const componentsTypeSlug of componentsTypeSlugs) {
    const menuNewItem: MenuItemProps = { title: componentsTypeSlug, slug: componentsTypeSlug };

    const typeMainPath = join(componentsTypePath, componentsTypeSlug);

    const typeUiArr = await fs.readdir(typeMainPath);

    const childrenPromises = typeUiArr.map(async typeUiSlug => {
      const typeUiName = typeUiSlug.replace('.mdx', '');
      return { title: typeUiName, slug: `${componentsTypeSlug}/${typeUiName}` };
    });

    const children = await Promise.all(childrenPromises);
    menuNewItem.children = children;
    menuItems.push(menuNewItem);
  }
  return menuItems;
}

export default memo(async function Menu() {
  const componentsByCategory = await getComponents();
  return (
    <div className="flex grow flex-col gap-1 overflow-auto p-4">
      {componentsByCategory.map(type => {
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
