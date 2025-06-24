'use client';
import { memo, useCallback, useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import ThemeContext from '@/context/themeContext';
import { ComponentData } from '@/service/dataService';
import { fetchHtml, FetchHtmlReturn } from '@/service/clientDataService';
import { usePathname } from 'next/navigation';
import ResizeBlock from '../resizeBlock';
import ComponentsIframe from '../componentIframe';
import ComponentCodePrev from '../componentCodePrev';
import CreatedBy from '../createdBy';
import { compInnerWrapperBase, compInnerWrapperFlex } from '@/data/compCss';

export type CodeType = 'html' | 'jsx' | 'vue';

const bgConfig = [
  {
    id: '1',
    classNames: '',
    desc: 'default'
  },
  {
    id: '2',
    classNames: 'bg-linear-to-r from-cyan-500 to-blue-500',
    desc: ''
  },
  {
    id: '3',
    classNames: 'bg-gradient-to-tr from-[#b384c7] to-[#5e8cb1]',
    desc: ''
  },
  {
    id: '4',
    classNames: 'bg-gradient-to-r from-[#d5ecfc] to-[#f6e2e0]',
    desc: ''
  },
  {
    id: '5',
    classNames: 'bg-gradient-to-r from-[#396D84] to-[#E1DDD2]',
    desc: ''
  },
  {
    id: '6',
    classNames: 'bg-gradient-to-r from-[#9795f0] to-[#fbc8d4]',
    desc: ''
  },
  {
    id: '7',
    classNames: 'bg-gradient-to-r from-[#bed5f5] to-[#1bb8d8]',
    desc: ''
  },
  {
    id: '8',
    classNames: 'bg-gradient-to-r from-[#7d97ab] to-[#e3b3b3]',
    desc: ''
  },
  {
    id: '9',
    classNames: 'bg-gradient-to-r from-purple-400 to-pink-400',
    desc: ''
  },
  {
    id: '10',
    classNames: 'bg-[url(/resource/public/bg2.jpg)] bg-cover bg-center bg-no-repeat',
    desc: ''
  },
  {
    id: '11',
    classNames: 'bg-[url(/resource/public/bg1.jpg)] bg-cover bg-center bg-no-repeat',
    desc: ''
  },
  {
    id: '12',
    classNames: 'bg-[url(/resource/public/bg3.jpg)] bg-cover bg-center bg-no-repeat',
    desc: ''
  }
];

const iconClassNames = 'cursor-pointer rounded-lg p-2 hover:bg-[#f8f8f9]/80 dark:invert dark:hover:bg-black/20';
const iconSelectClassNames = 'bg-black/10 shadow-inner dark:bg-black/20';

interface ComponentPrevProps {
  baseUrl: string;
  componentData: ComponentData;
}

export default memo(function ComponentPrev({ baseUrl, componentData }: ComponentPrevProps) {
  const pathname = usePathname();
  const refIframe = useRef(null);
  const [loading, setLoading] = useState(false);
  const [showBgController, setShowBgController] = useState(false);

  const [selectBgClass, setSelectBgClass] = useState('');

  const themeContext = useContext(ThemeContext);
  const ctx = themeContext;

  const [previewData, setPreviewData] = useState<FetchHtmlReturn | null>(null);

  const [showCode, setShowCode] = useState(false);
  const [previewCode, setPreviewCode] = useState('');
  const [codeType, setCodeType] = useState<CodeType>('html');

  const switchShowCode = useCallback(() => {
    setShowCode(prev => !prev);
  }, []);

  useEffect(() => {
    if (componentData.defaultCfg) {
      if (ctx?.theme === 'dark') {
        setSelectBgClass('');
      } else {
        const bg = bgConfig.find(s => s.id === componentData.defaultCfg + '')?.classNames;
        setSelectBgClass(bg || '');
      }
    }
  }, [componentData.defaultCfg, ctx?.theme]);

  useEffect(() => {
    if (componentData.id && ctx?.theme) {
      setLoading(true);
      const componentId = componentData.id;
      const componentUrl = `${baseUrl}/${componentId}.html`;

      fetchHtml({
        url: componentUrl,
        innerWrapper: `${compInnerWrapperBase} ${compInnerWrapperFlex} ${componentData.innerWrapper}`,
        isDark: ctx?.theme === 'dark'
      }).then(res => {
        setPreviewData(res);
        setLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentData.id, ctx?.theme, baseUrl]);

  useEffect(() => {
    if (codeType === 'html') setPreviewCode(previewData?.textResponse || '');
    if (codeType === 'jsx') setPreviewCode(previewData?.transformedJsx || '');
    if (codeType === 'vue') setPreviewCode(previewData?.transformedVue || '');
  }, [codeType, previewData]);

  const openBgController = useCallback(() => {
    setShowBgController(true);
  }, []);

  const closeBgController = useCallback(() => {
    setShowBgController(false);
  }, []);

  const selectClassName = useCallback((className: string) => {
    setSelectBgClass(className);
  }, []);

  return (
    <div key={componentData.id} id={componentData.id}>
      <div className="mt-4 flex flex-wrap items-end">
        <Link className="relative no-underline" href={`${pathname}#${componentData.id}`}>
          <h3 className="mt-0 mb-0 before:absolute before:-left-4 before:text-violet-500 hover:before:content-['#']">
            {componentData.title}
          </h3>
        </Link>
        <div className="not-prose relative ml-auto flex items-center pr-2 select-none">
          <AnimatePresence initial={false}>
            {showCode && (
              <motion.div
                layout
                initial={{ opacity: 0, x: 50, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.8 }}
                transition={{
                  type: 'spring',
                  duration: 0.6,
                  bounce: 0.5
                }}
                className="flex items-center gap-3 rounded-2xl bg-white/60 px-3 py-1.5 shadow-2xl ring-1 ring-gray-400/10 backdrop-blur-2xl dark:bg-black/20 dark:text-white dark:ring-white/10"
              >
                <Image
                  onClick={() => setCodeType('html')}
                  src="/icons/html.svg"
                  className={clsx(codeType === 'html' && iconSelectClassNames, iconClassNames, '!p-[3px]')}
                  width={22}
                  height={22}
                  alt=""
                />
                <Image
                  onClick={() => setCodeType('jsx')}
                  src="/icons/reactjs.svg"
                  className={clsx(codeType === 'jsx' && iconSelectClassNames, iconClassNames, '!p-[3px]')}
                  width={22}
                  height={22}
                  alt=""
                />
                <Image
                  onClick={() => setCodeType('vue')}
                  src="/icons/vuejs.svg"
                  className={clsx(codeType === 'vue' && iconSelectClassNames, iconClassNames, '!p-[3px]')}
                  width={22}
                  height={22}
                  alt=""
                />
              </motion.div>
            )}
          </AnimatePresence>
          <Image
            onClick={switchShowCode}
            src="/icons/code.svg"
            className={clsx(showCode && 'ring-2', iconClassNames)}
            width={34}
            height={34}
            alt=""
          />
          <div className="relative">
            <Image
              src="/icons/bg.svg"
              onClick={openBgController}
              className={clsx(showCode && 'ring-2', iconClassNames)}
              width={34}
              height={34}
              alt=""
            />
            <AnimatePresence initial={false}>
              {showBgController && (
                <motion.div
                  layout
                  initial={{ opacity: 0, x: 50, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 50, scale: 0.8 }}
                  transition={{
                    type: 'spring',
                    duration: 0.6,
                    bounce: 0.5
                  }}
                  className="absolute top-0 right-0 flex items-center gap-3 rounded-2xl bg-white/60 px-3 py-1.5 shadow-2xl ring-1 ring-gray-400/10 backdrop-blur-2xl dark:bg-black/20 dark:text-white dark:ring-white/10"
                >
                  {bgConfig.map(s => {
                    return (
                      <div
                        key={s.id}
                        className={clsx(
                          'flex size-6 cursor-pointer items-center justify-center rounded-xl border border-gray-300/80 transition-all duration-300 ease-in-out hover:bg-gray-500/20 dark:border-white/30 dark:hover:bg-white/20',
                          s.classNames
                        )}
                        onClick={() => {
                          selectClassName(s.classNames);
                        }}
                      ></div>
                    );
                  })}
                  <div
                    onClick={closeBgController}
                    className="flex size-6 cursor-pointer items-center justify-center rounded-xl bg-gray-500/10 transition-all duration-300 ease-in-out hover:bg-gray-500/20 dark:bg-white/10 dark:hover:bg-white/20"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
                      />
                    </svg>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      {componentData.creator && <CreatedBy creatorGithub={componentData.creator} />}
      <ResizeBlock>
        <ComponentsIframe
          loading={loading}
          componentHtml={previewData?.transformedHtml || ''}
          componentTitle={componentData.title}
          refIframe={refIframe}
          wrapper={componentData.wrapper}
          selectBgClass={selectBgClass}
        />
        {showCode && <ComponentCodePrev codeType={codeType} componentCode={previewCode} />}
      </ResizeBlock>
    </div>
  );
});
