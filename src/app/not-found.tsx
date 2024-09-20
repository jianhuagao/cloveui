import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="prose flex h-screen w-full flex-col justify-center divide-y pl-[10%] dark:prose-invert lg:pl-[20%]">
      <h1>404</h1>
      <div className="flex flex-col gap-1 pt-4">
        <div>This page could not be found.</div>
        <Link href="/" className="text-sm">
          homepage
        </Link>
      </div>
    </div>
  );
}
