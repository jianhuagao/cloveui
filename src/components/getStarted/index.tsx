'use client';
import Link from 'next/link';
import { memo, useContext, useEffect, useState } from 'react';
import RouterContext from '@/context/routerContext';
import { MenuItemProps } from '@/components/menu';

const findFirstSlug = (menuItems: MenuItemProps[]) => {
  for (const item of menuItems) {
    const slug = item.children?.find(c => c.slug)?.slug;
    if (slug) {
      return slug;
    }
  }
  return null;
};

export default memo(function GetStarted() {
  const routerContext = useContext(RouterContext);
  const [docUrl, setDocUrl] = useState<string | null>(null);

  useEffect(() => {
    const menuItems = routerContext?.menuItems;
    if (!menuItems) return; // 如果没有menuItems，提前返回

    const redirect = findFirstSlug(menuItems);
    if (redirect) {
      setDocUrl(`/docs/comp/${redirect}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routerContext]);

  return (
    <Link href={docUrl || '/docs'} className="text-xl no-underline opacity-60 transition-all hover:underline">
      Get started
    </Link>
  );
});
