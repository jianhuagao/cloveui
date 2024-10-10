import ChangeBg from '@/components/changeBg';
import GetStarted from '@/components/getStarted';
import LayoutContent from '@/components/layoutContent';

export default function Home() {
  return (
    <main className="relative">
      <LayoutContent>
        <div className="prose mx-auto flex max-w-7xl flex-col p-20 dark:prose-invert">
          <h1 className="group z-10 text-7xl transition-all hover:text-transparent">
            <ChangeBg className="cursor-pointer select-none bg-gradient-to-r from-violet-500 to-purple-300 bg-clip-text transition-all">
              Clove
              <span className="ml-1 font-light transition-[margin] group-hover:ml-0">UI</span>
            </ChangeBg>
          </h1>
          <h1>
            Free open source <span className="cursor-pointer transition-all hover:text-[#38bdf8]">TailwindCSS</span> component
            library
          </h1>
          <div className="mt-2">
            <GetStarted />
          </div>
        </div>
      </LayoutContent>
    </main>
  );
}
