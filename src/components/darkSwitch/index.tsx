'use client';
import { memo, useContext } from 'react';
import Image from 'next/image';
import ThemeContext from '@/context/themeContext';

export default memo(function DarkSwitch() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('useContext must be used within a ThemeProvider');
  }

  const { theme, toggleTheme } = themeContext;

  return (
    <div onClick={toggleTheme} className="cursor-pointer p-2 transition-all hover:scale-125">
      <Image
        src={theme === 'dark' ? '/icons/moon.svg' : '/icons/sun.svg'}
        alt="sun"
        className="dark:invert"
        width={20}
        height={20}
        priority
      />
    </div>
  );
});
