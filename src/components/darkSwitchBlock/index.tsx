'use client';
import { memo, useContext } from 'react';
import ThemeContext from '@/context/themeContext';
import { motion } from 'framer-motion';
// import Image from 'next/image';

const smallCardClassName =
  'relative cursor-pointer rounded-3xl border border-gray-200 bg-white/10 p-6 shadow-lg backdrop-blur-lg transition-transform select-none hover:scale-105 hover:border-purple-400 hover:bg-white/20 hover:shadow-xl dark:border-white/20';

export default memo(function DarkSwitch() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('useContext must be used within a ThemeProvider');
  }

  const { theme, toggleTheme } = themeContext;

  const iconList = ['🌙', '🌞'];
  const currentIconIndex = theme === 'dark' ? 0 : 1;

  return (
    <div className={smallCardClassName} onClick={toggleTheme}>
      {/* <Image src="/rbt2.png" className="absolute brightness-125 grayscale-50 dark:grayscale-0 -top-[107px] -left-[27px] z-10" width={100} height={100} alt="" /> */}
      {/* 动画图标容器 */}
      <div className="relative mb-4 h-10 w-10 overflow-hidden">
        <motion.div
          className="flex w-[80px]"
          animate={{ x: -40 }} // 永远向左滑动
          key={theme} // 每次切换触发新动画
          initial={{ x: 40 }} // 从右边进入
          transition={{ duration: 1, ease: [0.25, 0.8, 0.25, 1] }} // 自定义缓动曲线
        >
          {/* 新图标在右，旧图标在左，实际视觉从右滑入 */}
          <div className="flex w-10 items-center justify-center text-3xl">{iconList[(currentIconIndex + 1) % 2]}</div>
          <div className="flex w-10 items-center justify-center text-3xl">{iconList[currentIconIndex]}</div>
        </motion.div>
      </div>
      <h3 className="mb-2 text-xl font-semibold dark:text-white">Dark Mode</h3>
      <p className="text-sm text-black/80 dark:text-white/80">切换明暗模式，体验不同风格</p>
      <div className="absolute right-4 bottom-4 text-sm text-black/40 dark:text-white/40">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M20.01 2v3.132a.314.314 0 0 1-.556.201A9.98 9.98 0 0 0 12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10"
            color="currentColor"
          />
        </svg>
      </div>
    </div>
  );
});
