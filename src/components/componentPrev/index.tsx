'use client';
import { memo, useCallback, useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ResizeBlock from '../resizeBlock';
import ComponentsIframe from '../componentIframe';
import ComponentCodePrev from '../componentCodePrev';
import clsx from 'clsx';
import CreatedBy from '../createdBy';
import ThemeContext from '@/context/themeContext';
import { ComponentData } from '@/service/dataService';
import { fetchHtml, FetchHtmlReturn } from '@/service/clientDataService';

export type CodeType = 'html' | 'jsx' | 'vue';

const iconClassNames = 'cursor-pointer rounded-sm p-2 hover:bg-[#f8f8f9] dark:invert';
const iconSelectClassNames = 'bg-black/10 shadow-inner';

interface ComponentPrevProps {
  baseUrl: string;
  componentData: ComponentData;
}

export default memo(function ComponentPrev({ baseUrl, componentData }: ComponentPrevProps) {
  const pathname = usePathname();
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
    if (componentData.id && ctx?.theme) {
      setLoading(true);
      const componentId = componentData.id;
      const componentUrl = `${baseUrl}/${componentId}.html`;

      fetchHtml({
        url: componentUrl,
        innerWrapper: componentData.innerWrapper || '',
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

  return (
    <div key={componentData.id} id={componentData.id}>
      <div className="flex flex-wrap items-end">
        <Link className="relative no-underline" href={`${pathname}#${componentData.id}`}>
          <h3 className="before:absolute before:-left-4 before:text-violet-500 hover:before:content-['#']">
            {componentData.title}
          </h3>
        </Link>
        <div className="not-prose ml-auto flex items-center gap-2 pr-2">
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
      {componentData.creator && <CreatedBy creatorGithub={componentData.creator} />}
      <ResizeBlock>
        <ComponentsIframe
          loading={loading}
          show={!showCode}
          componentHtml={previewData?.transformedHtml || ''}
          componentTitle={componentData.title}
          refIframe={refIframe}
          wrapper={componentData.wrapper}
        />
        <ComponentCodePrev codeType={codeType} componentCode={previewCode} show={showCode} />
      </ResizeBlock>
    </div>
  );
});
