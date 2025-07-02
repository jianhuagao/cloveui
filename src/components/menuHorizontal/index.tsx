import { getComponents } from '@/service/dataService';
import DarkSwitch from '../darkSwitch';
import GithubIcon from '../githubIcon';
import LayoutModeSwitch from '../layoutModeSwitch';
import LogoBlock from '../logoBlock';
import DropdownMenuClient from './dropdownMenuClient';
import { DropdownMenuProvider } from './dropdownMenuContext';
import { ArticleMenuItem } from '../menuItem';
import Image from 'next/image';
import Link from 'next/link';

export default async function MenuHorizontal() {
  const componentsByCategory = await getComponents();

  return (
    <div className="not-prose sticky top-[48px] z-30 mb-8 flex items-center rounded-2xl border border-black/5 bg-white/60 px-3 py-2 ring-1 ring-gray-300/20 backdrop-blur-xl backdrop-saturate-200 dark:bg-black/50 dark:ring-white/15">
      <LogoBlock />
      <div className="mx-3 h-4 w-1 rounded-full bg-[#e0e0e0] dark:bg-[#e0e0e0]/60"></div>
      <DropdownMenuProvider>
        <div className="flex grow items-center gap-2">
          {componentsByCategory.map(({ title, children }, index) => {
            return (
              <div key={title} className="relative">
                <DropdownMenuClient id={`menu-${index}`} buttonLabel={title} items={children || []} />
              </div>
            );
          })}
        </div>
      </DropdownMenuProvider>
      <div className="flex items-center gap-2">
        <Link target="_blank" href="https://play.cloveui.asia">
          <button className="flex cursor-pointer items-center gap-1 rounded-[10px] px-2 py-1 transition-all hover:bg-gray-500/15 dark:hover:bg-white/20">
            <Image src="/play/play.svg" alt="play" width={16} height={16} priority />
            Playground
          </button>
        </Link>
        <ArticleMenuItem activeClass="bg-gray-500/15 dark:bg-white/20 !p-0">
          <button className="flex cursor-pointer items-center gap-1 rounded-[10px] px-2 py-1 transition-all hover:bg-gray-500/15 dark:hover:bg-white/20">
            <Image src="/icons/book.svg" alt="book" className="dark:invert" width={16} height={16} priority />
            Article
          </button>
        </ArticleMenuItem>
      </div>
      <div className="mx-3 h-4 w-1 rounded-full bg-[#e0e0e0] dark:bg-[#e0e0e0]/60"></div>
      <div className="flex items-center gap-2">
        <DarkSwitch />
        <GithubIcon />
        <LayoutModeSwitch />
      </div>
    </div>
  );
}
