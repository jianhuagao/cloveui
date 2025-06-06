import { memo } from 'react';
import Image from 'next/image';

export default memo(function Footer() {
  return (
    <footer className="relative z-50 text-sm text-black/70 dark:text-white/70">
      <div className="absolute bottom-0 left-0 -z-10 opacity-85 dark:opacity-70">
        <Image src="/bot.png" width={240} height={240} alt="" />
      </div>
      <div className="mx-auto mb-0 flex flex-col flex-wrap items-center gap-1 px-10 pt-10 pb-20 sm:flex-row sm:px-32 sm:pt-40 lg:px-72">
        <div>
          <div className="flex items-end gap-3">
            <Image src="/logo.svg" className="ml-1 opacity-70" width={28} height={28} alt="" />
            <span className="text-xl font-semibold">Clove UI</span>
          </div>
          <div className="mt-5 flex flex-wrap items-center">
            © 2024 Clove UI
            <a className="ml-1 text-purple-400 hover:underline" href="https://github.com/jianhuagao/cloveui?tab=MIT-1-ov-file">
              MIT License
            </a>
            <span className="mx-1">/ Created by</span>
            <a href="https://github.com/jianhuagao" target="_blank" className="transition-all hover:underline">
              Jianhuagao
            </a>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-16 sm:mt-0 sm:ml-auto">
          <div>
            <p className="mb-3 text-black/80 dark:text-white/80">SITE</p>
            <ul className="leading-5 opacity-60">
              <li>
                <a href="https://vercel.com" target="_blank" className="hover:underline">
                  Vercel
                </a>
              </li>
              <li>
                <a href="https://nextjs.org" target="_blank" className="hover:underline">
                  Nextjs
                </a>
              </li>
              <li>
                <a href="https://tailwindcss.com" target="_blank" className="hover:underline">
                  Tailwindcss
                </a>
              </li>
              <li>
                <a href="https://motion.dev" target="_blank" className="hover:underline">
                  Framer-motion
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-black/80 dark:text-white/80">SOCIAL</p>
            <ul className="leading-5 opacity-60">
              <li>
                <a href="https://github.com/jianhuagao" target="_blank" className="hover:underline">
                  Github
                </a>
              </li>
              <li>
                <a href="mailto:jianhua.gao@foxmail.com" className="flex items-center gap-1 hover:underline" aria-label="email">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                    <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                    <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                  </svg>
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
});
