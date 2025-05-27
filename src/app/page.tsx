import ChangeBg from '@/components/changeBg';
import ComponentPrev from '@/components/componentPrev';
import AnimatedSection from '@/components/framerMotions/animatedSection';
import GetStarted from '@/components/getStarted';
import LayoutContent from '@/components/layoutContent';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="relative">
      <LayoutContent>
        <div className="mx-auto mt-9 flex max-w-7xl flex-col p-5 sm:p-20">
          <AnimatedSection className="flex flex-col gap-12">
            <h1 className="group z-10 text-center text-6xl font-bold transition-all hover:text-transparent">
              <ChangeBg className="cursor-pointer bg-gradient-to-r from-violet-500 to-purple-300 bg-clip-text transition-all select-none">
                <span className="group-hover:ml-0">Component </span>
                library by TailwindCSS
              </ChangeBg>
            </h1>
            <h1 className="text-center text-xl">
              Free open source <span className="cursor-pointer transition-all hover:text-[#38bdf8]">TailwindCSS</span> component
              library
            </h1>
            <div className="mt-10 mb-20 flex items-center justify-center gap-4">
              <a
                href="https://github.com/jianhuagao/cloveui"
                target="_blank"
                className="group inline-flex min-w-0 cursor-pointer items-center gap-2 rounded-sm border border-transparent bg-black px-4 py-2 text-sm font-semibold text-white transition-all active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none dark:border-white/30 dark:bg-white/5"
              >
                Github
                <Image className="invert" src="/icons/github.svg" width={16} height={16} alt="" />
              </a>
              <GetStarted />
            </div>
            <ComponentPrev
              componentData={{
                id: '1',
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
            <ComponentPrev
              componentData={{
                id: '2',
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
          </AnimatedSection>
        </div>
      </LayoutContent>
      <div className="absolute inset-0 -z-10 bg-[url(/grid.svg)] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center"></div>
    </main>
  );
}
