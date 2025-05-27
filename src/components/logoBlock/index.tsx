import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

const hoverClass = 'hover:bg-white/40 hover:dark:bg-[#18181b]/40 rounded-lg cursor-pointer select-none';

export default function LogoBlock() {
  return (
    <Link href="/">
      <div className={clsx('group flex items-center gap-2 p-3 text-lg font-semibold hover:text-purple-400', hoverClass)}>
        <Image src="/logo.svg" className="transition-all duration-700 group-hover:rotate-180" width={14} height={14} alt="" />
        <span>
          Clove<span className="font-light">UI</span>
        </span>
      </div>
    </Link>
  );
}
