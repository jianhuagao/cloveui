'use client';
import { componentPreviewHtml } from '@/utils/transformers';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import useDebounce from '@/hooks/useDebounce';
import Image from 'next/image';
import clsx from 'clsx';

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
    <div className="flex flex-col gap-5">
      <div className="z-30 h-[600px] overflow-y-auto rounded-sm bg-[#141414] p-2 ring-4 ring-[#545454]">
        <Editor
          className="min-h-[600px]"
          value={playContent}
          onValueChange={code => setPlayContent(code)} // 实时更新 playContent
          highlight={code => Prism.highlight(code, Prism.languages.html, 'html')}
          padding={10}
        />
      </div>

      <div className="not-prose z-30 overflow-hidden rounded-md shadow-xl ring-1 ring-gray-900/5">
        <div className="flex items-center gap-1 bg-[#f8f8f9] p-1.5 dark:bg-white/20">
          <div className="flex items-center gap-2 px-3">
            {wrapperBgs.map(bg => {
              const isChecked = bg === wrapperBg;
              return (
                <div
                  key={bg}
                  onClick={() => setWrapperBg(bg)}
                  className={clsx(
                    'size-5 cursor-pointer rounded-full border border-black/10 ring-black/5 transition-all hover:scale-105 dark:ring-white/30',
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
    </div>
  );
};

export default memo(Play);
