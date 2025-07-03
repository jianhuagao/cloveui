import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import ChangeBg from '@/components/changeBg';
import ComponentPrev from '@/components/componentPrev';
import DarkSwitchBlock from '@/components/darkSwitchBlock';
import FadeIn from '@/components/framerMotions/fadeIn';
import LayoutContent from '@/components/layoutContent';
import { MenuItemProps } from '@/components/menu';
import { getComponents } from '@/service/dataService';
import AnimatedVis from '@/components/framerMotions/animatedVis';
import EmojiHoverCard from '@/components/emojiHoverCard';
import HomepageBg from '@/components/homepageBg';
import { geistMomo } from './fonts';

// import { Geist_Mono } from 'next/font/google';

// const geist = Geist_Mono({
//   subsets: ['latin']
// });

const findFirstSlug = (menuItems: MenuItemProps[]) => {
  for (const item of menuItems) {
    const slug = item.children?.find(c => c.slug)?.slug;
    if (slug) {
      return slug;
    }
  }
  return null;
};

export default async function Home() {
  const componentsByCategory = await getComponents();
  const redirect = findFirstSlug(componentsByCategory);
  const docUrl = redirect ? `/docs/comp/${redirect}` : '/docs';

  return (
    <main className="relative">
      <HomepageBg />
      <LayoutContent>
        <div className="mx-auto mt-9 flex max-w-7xl flex-col p-5 sm:p-20">
          <AnimatedVis className="flex flex-col gap-12">
            <h1 className="group z-10 bg-gradient-to-b bg-clip-text text-center text-6xl font-bold transition-all dark:from-white/80 dark:via-white dark:to-white/60 dark:text-transparent">
              <ChangeBg className="cursor-pointer leading-20 select-none">
                <span className="group-hover:ml-0">Component </span>
                library built with TailwindCSS
              </ChangeBg>
            </h1>
            <h1 className={clsx('text-center text-xl', geistMomo.className)}>
              Free open source <span className="cursor-pointer text-[#38bdf8] transition-all hover:text-3xl">TailwindCSS</span>{' '}
              component library
            </h1>
            <div className="mt-16 mb-24 flex items-center justify-center gap-5">
              <Link
                href="https://github.com/jianhuagao/TwinkleUI"
                target="_blank"
                className="group relative inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-white/60 px-4 py-2 text-sm ring-1 ring-gray-300/50 backdrop-blur-md transition-all duration-300 hover:shadow-lg active:scale-90 dark:bg-[rgba(255,255,255,0.15)] dark:text-white dark:shadow-white/10 dark:ring-white/20 dark:hover:ring-white/50"
              >
                Github
                <Image className="dark:invert" src="/icons/github.svg" width={16} height={16} alt="" />
              </Link>
              <Link href={docUrl} className="text-xl no-underline transition-all hover:underline">
                <button className="group relative inline-flex cursor-pointer items-center justify-center rounded-xl bg-white/60 px-4 py-2 text-sm text-purple-800 ring-1 ring-gray-300/50 backdrop-blur-md transition-all duration-300 hover:shadow-lg active:scale-90 dark:bg-[rgba(255,255,255,0.15)] dark:text-white dark:shadow-white/10 dark:ring-white/20 dark:hover:ring-white/50">
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
                  <span className="pointer-events-none absolute right-2 bottom-2 z-0 size-5 rounded-full bg-purple-400/50 blur-[6px] transition-transform duration-300 ease-in-out group-hover:translate-1/2 dark:bg-purple-400/40"></span>
                </button>
              </Link>
            </div>
          </AnimatedVis>
          <div className="flex flex-col gap-8">
            <AnimatedVis className="mt-16 mb-6 grid gap-6 md:grid-cols-3">
              <DarkSwitchBlock />
              <EmojiHoverCard
                emojis={['🧪', '🧬', '🔬', '⚗️', '🧫']}
                href="https://play.cloveui.asia"
                title="Playground"
                description="在线试验你的组件组合"
              />
              <EmojiHoverCard
                emojis={['📦', '📣', '📤', '🌆', '🗯️', '📊', '💰']}
                href={docUrl}
                title="More Components"
                description="探索更多开箱即用组件"
              />
            </AnimatedVis>
            <FadeIn once={true}>
              <ComponentPrev
                componentData={{
                  id: '1',
                  title: 'Notification Demo',
                  defaultCfg: '11-12',
                  slug: 'demo',
                  category: 'demo',
                  wrapper: 'h-72',
                  creator: '',
                  interactive: true,
                  componentsName: ''
                }}
                baseUrl={`/homeDemo`}
              />
            </FadeIn>
            <FadeIn once={true}>
              <ComponentPrev
                componentData={{
                  id: '2',
                  title: 'Card Demo',
                  slug: 'demo',
                  defaultCfg: '10-12',
                  category: 'demo',
                  wrapper: 'h-[500px]',
                  creator: '',
                  innerWrapper: '1 !px-0 !block',
                  interactive: true,
                  componentsName: ''
                }}
                baseUrl={`/homeDemo`}
              />
            </FadeIn>
            <FadeIn once={true}>
              <ComponentPrev
                componentData={{
                  id: '3',
                  title: 'RadioGroup Demo',
                  slug: 'demo',
                  category: 'demo',
                  defaultCfg: '16-14',
                  wrapper: 'h-96',
                  creator: '',
                  innerWrapper: 'px-[20%] *:flex-1 !flex-row',
                  interactive: true,
                  componentsName: ''
                }}
                baseUrl={`/homeDemo`}
              />
            </FadeIn>
            {/* <FadeIn once={true}>
              <ComponentPrev
                componentData={{
                  id: '4',
                  title: 'Card Demo',
                  slug: 'demo',
                  category: 'demo',
                  wrapper: 'h-96',
                  defaultCfg: '7',
                  creator: '',
                  innerWrapper: '',
                  interactive: true,
                  componentsName: ''
                }}
                baseUrl={`/homeDemo`}
              />
            </FadeIn> */}
            <FadeIn once={true}>
              <div className="mt-10 flex items-center justify-center opacity-70">
                <Link href={docUrl} className="text-lg hover:text-blue-500 hover:underline">
                  More Components ...
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </LayoutContent>
    </main>
  );
}
