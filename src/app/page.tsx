import GetStarted from '@/components/getStarted';
import LayoutContent from '@/components/layoutContent';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative">
      <LayoutContent>
        <div className="prose mx-auto flex max-w-7xl flex-col px-4 py-20 dark:prose-invert">
          <h1 className="z-10 text-7xl">CloveUI</h1>
          <h1>
            Free open source <span className="cursor-pointer transition-all hover:text-[#38bdf8]">TailwindCSS</span> component
            library
          </h1>
          <GetStarted />
        </div>
      </LayoutContent>
    </main>
  );
}
