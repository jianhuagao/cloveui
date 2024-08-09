import { memo } from 'react';

export default memo(function Footer() {
  return (
    <footer className="z-50 flex h-16 items-center bg-[#f4f4f5] px-4 dark:bg-[#18181b]">
      <h1>CloveUI 🦋</h1>
      <h1 className="ml-auto opacity-80">
        Created by
        <a href="https://github.com/jianhuagao" target="_blank" className="transition-all hover:underline">
          {' '}
          Jianhuagao
        </a>
      </h1>
    </footer>
  );
});
