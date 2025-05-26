'use client';

import { memo, useCallback, useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ResizeBlock from '../resizeBlock';
import ComponentsIframe from '../componentIframe';
import ComponentCodePrev from '../componentCodePrev';
import clsx from 'clsx';
import ThemeContext from '@/context/themeContext';
import { fetchHtml, FetchHtmlReturn } from '@/service/clientDataService';
import { CodeType } from '../componentPrev';

interface ArticleDemoPreviewProps {
  articleId: string;
  demoId: string;
  previewTitle: string;
  innerWrapper?: string;
  wrapper?: string;
}

const iconClassNames = 'cursor-pointer rounded-sm p-2 hover:bg-[#f8f8f9] dark:invert';
const iconSelectClassNames = 'bg-black/10 shadow-inner';

export default memo(function ArticleDemoPreview({
  articleId,
  demoId,
  previewTitle,
  wrapper,
  innerWrapper
}: ArticleDemoPreviewProps) {
  const refIframe = useRef(null);
  const [loading, setLoading] = useState(false);

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
    if (demoId && ctx?.theme) {
      setLoading(true);
      const componentUrl = `/articleDemo/${articleId}/${demoId}.html`;

      fetchHtml({
        url: componentUrl,
        innerWrapper: innerWrapper,
        isDark: ctx?.theme === 'dark'
      }).then(res => {
        setPreviewData(res);
        setLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId, ctx?.theme]);

  useEffect(() => {
    if (codeType === 'html') setPreviewCode(previewData?.textResponse || '');
    if (codeType === 'jsx') setPreviewCode(previewData?.transformedJsx || '');
    if (codeType === 'vue') setPreviewCode(previewData?.transformedVue || '');
  }, [codeType, previewData]);

  return (
    <div key={demoId} id={demoId}>
      <div className="flex flex-wrap items-end">
        <h4 className="before:absolute before:-left-4 before:text-[#a5b4fc] hover:before:content-['#']">{previewTitle}</h4>
        <div className="not-prose mb-3 ml-auto flex items-center gap-2 pr-2">
          {showCode && (
            <>
              <Image
                onClick={() => setCodeType('html')}
                src="/icons/html.svg"
                className={clsx(codeType === 'html' && iconSelectClassNames, iconClassNames)}
                width={34}
                height={34}
                alt=""
              />
              <Image
                onClick={() => setCodeType('jsx')}
                src="/icons/reactjs.svg"
                className={clsx(codeType === 'jsx' && iconSelectClassNames, iconClassNames)}
                width={34}
                height={34}
                alt=""
              />
              <Image
                onClick={() => setCodeType('vue')}
                src="/icons/vuejs.svg"
                className={clsx(codeType === 'vue' && iconSelectClassNames, iconClassNames)}
                width={34}
                height={34}
                alt=""
              />
            </>
          )}
          <Image
            onClick={switchShowCode}
            src="/icons/code.svg"
            className={clsx(showCode && 'ring-2', iconClassNames)}
            width={34}
            height={34}
            alt=""
          />
        </div>
      </div>
      <ResizeBlock>
        <ComponentsIframe
          loading={loading}
          show={!showCode}
          componentHtml={previewData?.transformedHtml || ''}
          componentTitle={previewTitle}
          refIframe={refIframe}
          wrapper={wrapper}
        />
        <ComponentCodePrev codeType={codeType} componentCode={previewCode} show={showCode} />
      </ResizeBlock>
    </div>
  );
});
