import DarkSwitch from '@/components/darkSwitch';
import GithubIcon from '@/components/githubIcon';
import Menu from '@/components/menu';
import clsx from 'clsx';
import type { Metadata } from 'next';
import Link from 'next/link';
import { memo } from 'react';
import HoverMenu from '@/components/hoverMenu';

export const metadata: Metadata = {
  title: 'CloveUI-Docs',
  description: 'A Tailwind CSS component library'
};

const hoverClass = 'hover:bg-white/40 hover:dark:bg-[#18181b]/40 rounded-lg cursor-pointer select-none';
const miniText = 'text-xs/6 font-medium text-zinc-500 dark:text-zinc-400';

export default function DocLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-[#f4f4f5] transition-[background-color] dark:bg-[#09090b]">
      <div className="sticky top-0 hidden h-screen w-64 flex-shrink-0 flex-col md:flex">
        <LeftContent />
      </div>
      <div className="prose m-2 min-w-0 max-w-none grow rounded-lg bg-white p-10 shadow-sm ring-1 ring-zinc-950/5 transition-[background-color] dark:prose-invert lg:ml-0 dark:bg-zinc-900 dark:lg:ring-white/10">
        <HoverMenu>
          <LeftContent isFloat />
        </HoverMenu>
        {children}
      </div>
    </div>
  );
}

const LeftContent = memo(function LeftContent({ isFloat = false }: { isFloat?: boolean }) {
  return (
    <>
      <div className="flex flex-shrink-0 items-center justify-between p-4">
        <Link href="/">
          <div className={clsx('flex items-center p-3 hover:text-violet-500', hoverClass)}>CloveUI</div>
        </Link>
        {!isFloat && <GithubIcon size={20} />}
      </div>
      <Menu />
      <div className="flex-shrink-0 p-2">
        <div className={clsx('flex items-center p-2', hoverClass)}>
          <p className={clsx(miniText)}>v0.0.1 beta</p>
          <div className={clsx(!isFloat && 'ml-auto')}>
            <DarkSwitch />
          </div>
        </div>
      </div>
    </>
  );
});
