'use client';
import { memo, useState } from 'react';
import Image from 'next/image';

export default memo(function HoverMenu({ children }: { children: React.ReactNode }) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      {showMenu && (
        <div className="not-prose absolute left-0 top-0 z-10 h-full w-full bg-[#f4f4f5] dark:bg-[#09090b]">{children}</div>
      )}
      <div
        onClick={() => setShowMenu(prev => !prev)}
        className="absolute right-10 top-10 z-20 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-black md:hidden dark:bg-white"
      >
        <Image className="dark:invert" src="/icons/bars.svg" width={20} height={20} alt="" />
      </div>
    </>
  );
});
