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
    <Link href={docUrl} className="text-xl no-underline opacity-60 transition-all hover:underline">
      <button className="group inline-flex min-w-0 items-center gap-2 rounded transition-all active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
        Get started
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-4 w-0 transition-all group-hover:w-4"
        >
          <path
            fillRule="evenodd"
            d="M13.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M19.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </Link>
  );
});
