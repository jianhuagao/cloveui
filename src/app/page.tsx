import LayoutContent from '@/components/layoutContent';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative">
      <div className="main-background"></div>
      <LayoutContent>
        <div className="prose mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-20 dark:prose-invert">
          <h1>
            Free open source <span className="cursor-pointer transition-all hover:text-[#38bdf8]">TailwindCSS</span> component
            library{' '}
          </h1>
          <Link href="/docs" className="text-xl no-underline opacity-60">
            Get started
          </Link>
        </div>
      </LayoutContent>
    </main>
  );
}
