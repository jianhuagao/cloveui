import ChangeBg from '@/components/changeBg';
import ComponentPrev from '@/components/componentPrev';
import AnimatedSection from '@/components/framerMotions/animatedSection';
import FadeIn from '@/components/framerMotions/fadeIn';
import GetStarted from '@/components/getStarted';
import LayoutContent from '@/components/layoutContent';
import Image from 'next/image';

export default function Home() {
  const cards = [
    {
      title: 'Dark Mode',
      description: '切换明暗模式，体验不同风格',
      icon: '🌙'
    },
    {
      title: 'Playground',
      description: '在线试验你的组件组合',
      icon: '🧪'
    },
    {
      title: 'More Components',
      description: '探索更多开箱即用组件',
      icon: '📦'
    }
  ];
  return (
    <main className="relative">
      <LayoutContent>
        <div className="mx-auto mt-9 flex max-w-7xl flex-col p-5 sm:p-20">
          <AnimatedSection className="flex flex-col gap-12">
            <h1 className="group z-10 text-center text-6xl font-bold transition-all hover:text-transparent">
              <ChangeBg className="cursor-pointer bg-gradient-to-r from-[#9e58e9] to-blue-500 bg-clip-text leading-20 transition-all select-none">
                <span className="group-hover:ml-0">Component </span>
                library built with TailwindCSS
              </ChangeBg>
            </h1>
            <h1 className="text-center text-xl">
              Free open source <span className="cursor-pointer transition-all hover:text-[#38bdf8]">TailwindCSS</span> component
              library
            </h1>
            <div className="mt-10 mb-20 flex items-center justify-center gap-5">
              <a
                href="https://github.com/jianhuagao/cloveui"
                target="_blank"
                className="group inline-flex min-w-0 cursor-pointer items-center gap-2 rounded-lg border border-transparent bg-black px-4 py-2 text-sm font-semibold text-white transition-all active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none dark:border-white/30 dark:bg-white/5"
              >
                Github
                <Image className="invert" src="/icons/github.svg" width={16} height={16} alt="" />
              </a>
              <GetStarted />
            </div>
          </AnimatedSection>
          <div className="flex flex-col gap-8">
            <FadeIn>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {cards.map((card, idx) => (
                  <div
                    key={idx}
                    className="relative cursor-pointer rounded-3xl border border-gray-200 bg-white/10 p-6 shadow-lg backdrop-blur-lg transition-transform select-none hover:scale-105 hover:border-purple-400 hover:bg-white/20 hover:shadow-xl dark:border-white/20"
                  >
                    <div className="mb-4 text-3xl">{card.icon}</div>
                    <h3 className="mb-2 text-xl font-semibold dark:text-white">{card.title}</h3>
                    <p className="text-sm text-black/80 dark:text-white/80">{card.description}</p>
                    <div className="absolute right-4 bottom-4 text-sm text-black/40 dark:text-white/40">→</div>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn>
              <ComponentPrev
                componentData={{
                  id: '1',
                  title: 'Notification Demo',
                  slug: 'demo',
                  category: 'demo',
                  wrapper: 'h-52 bg-gradient-to-r from-[#9795f0] to-[#fbc8d4] dark:bg-none',
                  creator: '',
                  innerWrapper: 'flex h-52 items-center justify-center gap-5',
                  interactive: true,
                  componentsName: ''
                }}
                baseUrl={`/homeDemo`}
              />
            </FadeIn>
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
                  id: '3',
                  title: 'RadioGroup Demo',
                  slug: 'demo',
                  category: 'demo',
                  wrapper: 'h-72 bg-gradient-to-r from-[#9795f0] to-[#fbc8d4] dark:bg-none',
                  creator: '',
                  innerWrapper: 'flex px-[20%] h-72 [&>*]:flex-1 items-center justify-center gap-4',
                  interactive: true,
                  componentsName: ''
                }}
                baseUrl={`/homeDemo`}
              />
            </FadeIn>
          </div>
        </div>
      </LayoutContent>
      <div className="absolute inset-0 -z-10 bg-[url(/grid.svg)] [mask-image:linear-gradient(180deg,white_1%,rgba(255,255,255,0)_43%)] bg-center dark:bg-[url(/gridDark.svg)]"></div>
    </main>
  );
}
