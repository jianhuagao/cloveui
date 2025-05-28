'use client';
import { memo, useContext } from 'react';
import ThemeContext from '@/context/themeContext';

const smallCardClassName =
  'relative cursor-pointer rounded-3xl border border-gray-200 bg-white/10 p-6 shadow-lg backdrop-blur-lg transition-transform select-none hover:scale-105 hover:border-purple-400 hover:bg-white/20 hover:shadow-xl dark:border-white/20';

export default memo(function DarkSwitch() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('useContext must be used within a ThemeProvider');
  }

  const { theme, toggleTheme } = themeContext;

  return (
    <div className={smallCardClassName} onClick={toggleTheme}>
      <div className="mb-4 text-3xl">{theme === 'dark' ? '🌙' : '🌞'}</div>
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
