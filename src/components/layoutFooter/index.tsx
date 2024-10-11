import { memo } from 'react';
import Image from 'next/image';

export default memo(function Footer() {
  return (
    <footer className="z-50 text-sm opacity-70">
      <div className="mx-auto flex h-32 items-center px-20">
        <div className="flex items-center gap-1">
          © 2024 <Image src="/logo.svg" width={12} height={12} alt="" />
          Clove UI
          <a className="text-purple-400 hover:underline" href="https://github.com/jianhuagao/cloveui?tab=MIT-1-ov-file">
            MIT License
          </a>
        </div>
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
