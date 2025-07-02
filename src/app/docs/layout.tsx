import DarkSwitch from '@/components/darkSwitch';
import GithubIcon from '@/components/githubIcon';
import Menu from '@/components/menu';
import clsx from 'clsx';
import type { Metadata } from 'next';
import { memo } from 'react';
import HoverMenu from '@/components/hoverMenu';
import LogoBlock from '@/components/logoBlock';

import LayoutModeContent from '@/components/layoutModeContent';
import LayoutModeSwitch from '@/components/layoutModeSwitch';
import MenuHorizontal from '@/components/menuHorizontal';

export const metadata: Metadata = {
  title: 'TwinkleUI-Docs',
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
      <LayoutModeContent mode="vertical">
        <div className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col md:flex">
          <LeftContent />
        </div>
      </LayoutModeContent>
      <div className="prose dark:prose-invert m-2 max-w-none min-w-0 grow rounded-lg bg-white p-10 shadow-xs ring-1 ring-zinc-950/5 transition-[background-color] lg:ml-0 dark:bg-zinc-900 dark:lg:ring-white/10">
        <HoverMenu>
          <LeftContent isFloat />
        </HoverMenu>
        <LayoutModeContent mode="horizontal">
          <MenuHorizontal />
        </LayoutModeContent>
        {children}
      </div>
    </div>
  );
}

const LeftContent = memo(function LeftContent({ isFloat = false }: { isFloat?: boolean }) {
  return (
    <>
      <div className="flex shrink-0 items-center justify-between p-4">
        <LogoBlock />
        <LayoutModeSwitch />
      </div>
      <Menu />
      <div className="shrink-0 p-2">
        <div className={clsx('flex items-center p-2', hoverClass)}>
          <p className={clsx(miniText)}>v1.0.0 @{process.env.NEXT_PUBLIC_BUILD_VERSION}</p>
          <div className={clsx(!isFloat && 'ml-auto flex items-center gap-2')}>
            {!isFloat && <GithubIcon size={20} />}
            <DarkSwitch />
          </div>
        </div>
      </div>
    </>
  );
});
