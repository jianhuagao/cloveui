import { memo, useCallback, useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { componentPreviewHtml, componentPreviewJsx, componentPreviewVue } from '@/utils/transformers';

import { ComponentData } from '@/app/docs/comp/[compType]/[compName]/page';
import ResizeBlock from '../resizeBlock';
import ComponentsIframe from '../componentIframe';
import ComponentCodePrev from '../componentCodePrev';
import clsx from 'clsx';
import CreatedBy from '../createdBy';
import ThemeContext from '@/context/themeContext';

interface FetchHtmlReturn {
  textResponse: string;
  transformedHtml: string;
  transformedJsx: string;
  transformedVue: string;
}

export type CodeType = 'html' | 'jsx' | 'vue';

async function fetchHtml({
  componentId,
  componentName,
  innerWrapper,
  isDark = false
}: {
  componentId: string;
  componentName: string;
  innerWrapper?: string;
  isDark?: boolean;
}): Promise<FetchHtmlReturn> {
  const componentUrl = `/components/${componentName}/${componentId}.html`;

  const fetchResponse = await fetch(componentUrl);
  const textResponse = await fetchResponse.text();
  const transformedHtml = componentPreviewHtml(textResponse, innerWrapper, isDark);
  const transformedJsx = componentPreviewJsx(textResponse);
  const transformedVue = componentPreviewVue(textResponse);

  return {
    textResponse,
    transformedHtml,
    transformedJsx,
    transformedVue
  };
}

const iconClassNames = 'cursor-pointer rounded p-2 hover:bg-[#f8f8f9] dark:invert';
const iconSelectClassNames = 'bg-black/10 shadow-inner';

const lowercaseFirstLetter = (str: string) => str.charAt(0).toLowerCase() + str.slice(1);

interface ComponentPrevProps {
  componentData: ComponentData;
}

export default memo(function ComponentPrev({ componentData }: ComponentPrevProps) {
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
      fetchHtml({
        componentId: componentData.id,
        componentName: lowercaseFirstLetter(componentData.componentsName),
        innerWrapper: componentData.innerWrapper || '',
        isDark: ctx?.theme === 'dark'
      }).then(res => {
        setPreviewData(res);
        setLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentData.id, ctx?.theme]);

  useEffect(() => {
    codeType === 'html' && setPreviewCode(previewData?.textResponse || '');
    codeType === 'jsx' && setPreviewCode(previewData?.transformedJsx || '');
    codeType === 'vue' && setPreviewCode(previewData?.transformedVue || '');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeType, previewData]);

  return (
    <div key={componentData.id} id={componentData.id}>
      <div className="flex flex-wrap items-end">
        <Link className="relative no-underline" href={`${pathname}#${componentData.id}`}>
          <h3 className="before:absolute before:-left-4 before:text-[#a5b4fc] hover:before:content-['#']">
            {componentData.title}
          </h3>
        </Link>
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
