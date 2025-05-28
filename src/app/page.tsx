import Image from 'next/image';
import Link from 'next/link';
import ChangeBg from '@/components/changeBg';
import ComponentPrev from '@/components/componentPrev';
import DarkSwitchBlock from '@/components/darkSwitchBlock';
import FadeIn from '@/components/framerMotions/fadeIn';
import LayoutContent from '@/components/layoutContent';
import { MenuItemProps } from '@/components/menu';
import { getComponents } from '@/service/dataService';
import clsx from 'clsx';
import { Geist_Mono } from 'next/font/google';
import AnimatedVis from '@/components/framerMotions/animatedVis';

const geist = Geist_Mono({
  subsets: ['latin']
});

const smallCardClassName =
  'relative cursor-pointer block rounded-3xl border border-gray-200 bg-white/10 p-6 shadow-lg backdrop-blur-lg transition-transform select-none hover:scale-105 hover:border-purple-400 hover:bg-white/20 hover:shadow-xl dark:border-white/20';

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
      <LayoutContent>
        <div className="mx-auto mt-9 flex max-w-7xl flex-col p-5 sm:p-20">
          <AnimatedVis className="flex flex-col gap-12">
            <h1 className="group z-10 text-center text-6xl font-bold transition-all hover:text-transparent">
              <ChangeBg className="cursor-pointer bg-gradient-to-r from-[#9e58e9] to-blue-500 bg-clip-text leading-20 transition-all select-none">
                <span className="group-hover:ml-0">Component </span>
                library built with TailwindCSS
              </ChangeBg>
            </h1>
            <h1 className={clsx('text-center text-xl', geist.className)}>
              Free open source <span className="cursor-pointer transition-all hover:text-[#38bdf8]">TailwindCSS</span> component
              library
            </h1>
            <div className="mt-10 mb-20 flex items-center justify-center gap-5">
              <Link
                href="https://github.com/jianhuagao/cloveui"
                target="_blank"
                className="group inline-flex min-w-0 cursor-pointer items-center gap-2 rounded-lg border border-transparent bg-black px-4 py-2 text-sm font-semibold text-white transition-all active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none dark:border-white/30 dark:bg-white/5"
              >
                Github
                <Image className="invert" src="/icons/github.svg" width={16} height={16} alt="" />
              </Link>
              <Link href={docUrl} className="text-xl no-underline transition-all hover:underline">
                <button className="group inline-flex min-w-0 cursor-pointer items-center rounded-lg bg-gradient-to-r from-[#9e58e9] to-blue-500 px-4 py-[9px] text-sm font-semibold text-white transition-all active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none dark:bg-white/5">
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
            </div>
          </AnimatedVis>
          <div className="flex flex-col gap-8">
            <AnimatedVis className="mt-10 mb-6 grid gap-6 md:grid-cols-3">
              <DarkSwitchBlock />
              <div>
                <Link href="https://play.cloveui.asia" target="_blank" className={smallCardClassName}>
                  <div className="mb-4 text-3xl">🧪</div>
                  <h3 className="mb-2 text-xl font-semibold dark:text-white">Playground</h3>
                  <p className="text-sm text-black/80 dark:text-white/80">在线试验你的组件组合</p>
                  <div className="absolute right-4 bottom-4 text-sm text-black/40 dark:text-white/40">→</div>
                </Link>
              </div>
              <Link href={docUrl} className={smallCardClassName}>
                <div className="mb-4 text-3xl">📦</div>
                <h3 className="mb-2 text-xl font-semibold dark:text-white">More Components</h3>
                <p className="text-sm text-black/80 dark:text-white/80">探索更多开箱即用组件</p>
                <div className="absolute right-4 bottom-4 text-sm text-black/40 dark:text-white/40">→</div>
              </Link>
            </AnimatedVis>
            <FadeIn>
              <ComponentPrev
                componentData={{
                  id: '2',
                  title: 'Card Demo',
                  slug: 'demo',
                  category: 'demo',
                  wrapper: 'h-[500px] bg-gradient-to-tr from-[#b384c7] to-[#5e8cb1] dark:bg-none',
                  creator: '',
                  innerWrapper: 'h-[500px]',
                  interactive: true,
                  componentsName: ''
                }}
                baseUrl={`/homeDemo`}
              />
            </FadeIn>
            <FadeIn>
              <ComponentPrev
                componentData={{
                  id: '1',
                  title: 'Notification Demo',
                  slug: 'demo',
                  category: 'demo',
                  wrapper: 'h-72 bg-gradient-to-r from-[#9795f0] to-[#fbc8d4] dark:bg-none',
                  creator: '',
                  innerWrapper: 'flex h-72 items-center justify-center gap-5 flex-col md:flex-row',
                  interactive: true,
                  componentsName: ''
                }}
                baseUrl={`/homeDemo`}
              />
            </FadeIn>
            <FadeIn>
              <ComponentPrev
                componentData={{
                  id: '3',
                  title: 'RadioGroup Demo',
                  slug: 'demo',
                  category: 'demo',
                  wrapper: 'h-96 bg-gradient-to-r from-[#9795f0] to-[#fbc8d4] dark:bg-none',
                  creator: '',
                  innerWrapper: 'flex px-[20%] h-96 [&>*]:flex-1 items-center justify-center gap-4',
                  interactive: true,
                  componentsName: ''
                }}
                baseUrl={`/homeDemo`}
              />
            </FadeIn>
          </div>
        </div>
      </LayoutContent>
      <div className="absolute top-0 left-0 -z-10 h-screen w-full bg-[url(/grid.svg)] [mask-image:linear-gradient(180deg,white_1%,rgba(255,255,255,0)_50%)] bg-center dark:bg-[url(/gridDark.svg)]"></div>
    </main>
  );
}
