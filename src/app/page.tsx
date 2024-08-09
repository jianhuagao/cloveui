import LayoutContent from '@/components/layoutContent';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <LayoutContent>
        <div className="flex flex-col items-center gap-4 py-20">
          <h1 className="text-3xl">Free open source Tailwind CSS component library</h1>
          <Link href="/docs" className="text-xl opacity-60">
            Get started &gt;&gt;
          </Link>
        </div>
      </LayoutContent>
    </main>
  );
}
