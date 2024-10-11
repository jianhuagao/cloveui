'use client';
import { memo, useState, useEffect } from 'react';
import Image from 'next/image';

export default memo(function HoverMenu({ children }: { children: React.ReactNode }) {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (showMenu) {
      // 禁用页面滚动
      document.body.style.overflow = 'hidden';
    } else {
      // 恢复页面滚动
      document.body.style.overflow = '';
    }

    // 组件卸载时确保恢复滚动
    return () => {
      document.body.style.overflow = '';
    };
  }, [showMenu]);

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  return (
    <>
      {showMenu && (
        <div
          onClick={handleCloseMenu}
          className="not-prose absolute left-0 top-0 z-10 h-full w-full overflow-y-auto bg-[#f4f4f5] dark:bg-[#09090b]"
        >
          {children}
        </div>
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
