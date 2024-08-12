import { memo } from 'react';

export default memo(function Footer() {
  return (
    <footer className="z-50">
      <div className="mx-auto flex h-32 max-w-7xl items-center px-4">
        <h1>CloveUI 🦋</h1>
        <h1 className="ml-auto opacity-80">
          Created by
          <a href="https://github.com/jianhuagao" target="_blank" className="transition-all hover:underline">
            {' '}
            Jianhuagao
          </a>
        </h1>
      </div>
    </footer>
  );
});
