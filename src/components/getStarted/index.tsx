import Link from 'next/link';
import { memo } from 'react';
import { MenuItemProps } from '@/components/menu';
import { getComponents } from '@/service/dataService';

const findFirstSlug = (menuItems: MenuItemProps[]) => {
  for (const item of menuItems) {
    const slug = item.children?.find(c => c.slug)?.slug;
    if (slug) {
      return slug;
    }
  }
  return null;
};

export default memo(async function GetStarted() {
  const componentsByCategory = await getComponents();

  const redirect = findFirstSlug(componentsByCategory);
  const docUrl = redirect ? `/docs/comp/${redirect}` : '/docs';

  return (
    <Link href={docUrl} className="text-xl no-underline transition-all hover:underline">
      <button className="group inline-flex min-w-0 cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-r from-[#9e58e9] to-blue-500 px-4 py-[9px] text-sm font-semibold text-white transition-all active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none dark:bg-white/5">
        Get started
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-4 w-0 transition-all group-hover:w-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </Link>
  );
});
