'use client';
import { componentPreviewHtml } from '@/utils/transformers';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import useDebounce from '@/hooks/useDebounce';
import Image from 'next/image';
import clsx from 'clsx';
import CopyBtn from '@/components/copyBtn';
import AnimatedShow from '@/components/framerMotions/animatedShow';

const centerClassName = 'flex items-center justify-center';

const wrapperHeights = ['min-h-[400px]', 'min-h-[800px]', 'min-h-[1200px]'];

const wrapperBgs = [
  'bg-[#f8f8f9]',
  'bg-[#242427]',
  'bg-gradient-to-r from-[#d5ecfc] to-[#f6e2e0]',
  'bg-gradient-to-r from-purple-500 to-pink-500',
  'bg-gradient-to-r from-pink-500 to-fuchsia-400'
];

const Play = () => {
  const [playContent, setPlayContent] = useState('');
  const [transformedHtml, setTransformedHtml] = useState('');

  const [innerWrapper, setInnerWrapper] = useState('');

  const [wrapperHeight, setWrapperHeight] = useState(wrapperHeights[0]);

  const [wrapperBg, setWrapperBg] = useState(wrapperBgs[0]);

  const [isDark, setIsDark] = useState(false);

  const [isCenter, setIsCenter] = useState(true);

  // 防抖处理函数，用于延迟更新 transformedHtml
  const updateTransformedHtml = useDebounce(() => {
    setTransformedHtml(componentPreviewHtml(playContent, innerWrapper, isDark));
  }, 1000);

  // 监听 playContent 和 isDark 的变化，触发防抖更新
  useEffect(() => {
    updateTransformedHtml();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playContent]);

  useEffect(() => {
    setTransformedHtml(componentPreviewHtml(playContent, innerWrapper, isDark));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDark]);

  useEffect(() => {
    const newInnerWrapper = isCenter ? `${wrapperHeight} ${centerClassName}` : '';
    setTransformedHtml(componentPreviewHtml(playContent, newInnerWrapper, isDark));
    setInnerWrapper(newInnerWrapper);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCenter, wrapperHeight]);

  const getDemo = async () => {
    const fetchResponse = await fetch('/playgroundDemo/demo.html');
    const textResponse = await fetchResponse.text();

    setPlayContent(textResponse);
  };

  useEffect(() => {
    getDemo();

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // 自定义询问框的提示信息
      const confirmationMessage = '你确定要离开当前页面吗？';

      // 现代浏览器依赖事件处理函数的返回值，而不是 returnValue
      event.preventDefault(); // 防止默认行为（一些浏览器中是必须的）
      event.returnValue = ''; // 虽然是被弃用的，但还是一些浏览器要求设置为一个空字符串
      return confirmationMessage; // 某些浏览器会使用该返回值作为确认框的文本
    };

    // 仅在客户端侧监听
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    // 在组件卸载时移除事件监听
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      }
    };
  }, []);

  const switchDark = useCallback(() => {
    setIsDark(d => {
      if (wrapperBg === wrapperBgs[0] || wrapperBg === wrapperBgs[1]) {
        setWrapperBg(d ? wrapperBgs[0] : wrapperBgs[1]);
      }

      return !d;
    });
  }, [wrapperBg]);

  const switchCenter = useCallback(() => {
    setIsCenter(d => !d);
  }, []);

  const switchWrapperHeight = useCallback(() => {
    const index = wrapperHeights.indexOf(wrapperHeight);
    if (index < wrapperHeights.length - 1) {
      setWrapperHeight(wrapperHeights[index + 1]);
    } else {
      setWrapperHeight(wrapperHeights[0]);
    }
  }, [wrapperHeight]);

  const switchWrapperIcon = useMemo(() => {
    const index = wrapperHeights.indexOf(wrapperHeight);
    return ['/play/h4.svg', '/play/h8.svg', '/play/h12.svg'][index];
  }, [wrapperHeight]);

  return (
    <AnimatedShow className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <Image src="/play/play.svg" className="m-0" alt="play" width={22} height={22} priority />
        <span className="text-lg">
          <span className="font-semibold">Tailwind</span> Playground
        </span>
      </div>
      <div className="flex items-center">
        提供基础的Tailwind Playground 功能，更好体验请使用
        <Image src="/icons/link.svg" className="m-0 ml-2 dark:invert" alt="link" width={16} height={16} priority />
        <a className="ml-2 no-underline hover:underline" href="https://play.cloveui.asia" target="_blank">
          play.cloveui.asia
        </a>
        <span className="pl-2">或官方</span>
        <Image src="/icons/link.svg" className="m-0 ml-2 dark:invert" alt="link" width={16} height={16} priority />
        <a className="ml-2 no-underline hover:underline" href="https://play.tailwindcss.com" target="_blank">
          play.tailwindcss.com
        </a>
      </div>
      <div className="z-30 h-[600px] overflow-y-auto rounded-xs bg-[#141414] ring-4 ring-[#545454]">
        <div className="not-prose sticky top-0 z-10 flex items-center gap-2 bg-white/10 px-2 py-1.5 text-white backdrop-blur-xl">
          <Image src="/play/edit.svg" className="m-0 ml-2 invert" alt="code" width={20} height={20} priority />
          HTML
          <div className="ml-auto">
            <CopyBtn className="!bg-[#686666]" content={playContent} />
          </div>
        </div>
        <Editor
          className="min-h-[600px]"
          value={playContent}
          onValueChange={code => setPlayContent(code)} // 实时更新 playContent
          highlight={code => Prism.highlight(code, Prism.languages.html, 'html')}
          padding={10}
        />
      </div>
      <div className="not-prose z-30 overflow-hidden rounded-md shadow-xl ring-1 ring-gray-900/5">
        <div className="flex items-center gap-1 bg-[#f8f8f9] p-1.5 dark:bg-white/10">
          <div className="flex items-center gap-2 px-3">
            {wrapperBgs.map(bg => {
              const isChecked = bg === wrapperBg;
              return (
                <div
                  key={bg}
                  onClick={() => setWrapperBg(bg)}
                  className={clsx(
                    'size-5 cursor-pointer rounded-full border border-black/10 ring-black/5 transition-all hover:scale-105 dark:border-white/20 dark:ring-white/30',
                    bg,
                    isChecked && 'ring-4'
                  )}
                ></div>
              );
            })}
          </div>
          <div onClick={switchWrapperHeight} className="ml-auto cursor-pointer rounded-md p-2 hover:bg-white/50">
            <Image src={switchWrapperIcon} alt="sun" className="dark:invert" width={20} height={20} priority />
          </div>
          <div
            onClick={switchCenter}
            className={clsx('cursor-pointer rounded-md p-2 hover:bg-white/50', isCenter && 'bg-black/5 dark:bg-white/30')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
                d="M6 14h36M12 24h24M20 34h8"
              />
            </svg>
          </div>
          <div onClick={switchDark} className="cursor-pointer rounded-md p-2 hover:bg-white/50">
            <Image
              src={isDark ? '/icons/moon.svg' : '/icons/sun.svg'}
              alt="sun"
              className="dark:invert"
              width={20}
              height={20}
              priority
            />
          </div>
        </div>
        <iframe
          className={clsx('w-full transition-[background-color]', wrapperHeight, wrapperBg)}
          loading="lazy"
          srcDoc={transformedHtml} // 使用防抖后的 transformedHtml
          title="play"
        ></iframe>
      </div>
    </AnimatedShow>
  );
};

export default memo(Play);
