import { memo } from 'react';
import Image from 'next/image';

export default memo(function Footer() {
  return (
    <footer className="z-50 text-sm opacity-70">
      <div className="mx-auto mb-10 flex h-6 flex-wrap items-center gap-1 px-5 sm:mb-0 sm:h-32 sm:px-20">
        © 2024 <Image src="/logo.svg" width={12} height={12} alt="" />
        Clove UI
        <a className="text-purple-400 hover:underline" href="https://github.com/jianhuagao/cloveui?tab=MIT-1-ov-file">
          MIT License
        </a>
        <h1 className="flex items-center gap-2 sm:ml-auto">
          Created by
          <a href="https://github.com/jianhuagao" target="_blank" className="transition-all hover:underline">
            {' '}
            Jianhuagao
          </a>
          <a href="mailto:jianhua.gao@foxmail.com" aria-label="email" className="ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
              <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
              <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
            </svg>
          </a>
        </h1>
      </div>
    </footer>
  );
});
