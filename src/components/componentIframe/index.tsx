import { Ref } from 'react';
import Spin from '../spin';

interface ComponentIframeProps {
  show: boolean;
  componentHtml: string;
  componentTitle: string;
  wrapper?: string;
  refIframe: Ref<HTMLIFrameElement>;
  loading: boolean;
  selectBgClass?: string;
}

export default function ComponentsIframe({
  show,
  componentHtml,
  componentTitle,
  loading,
  wrapper = 'h-[400px] lg:h-[600px]',
  refIframe,
  selectBgClass
}: ComponentIframeProps) {
  return (
    <div
      {...(!show && {
        hidden: true
      })}
      className="relative mt-3 rounded-xl"
    >
      <div className="pointer-events-none absolute inset-[35%] hidden rounded-full bg-white/15 blur-2xl dark:block"></div>
      {loading && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Spin />
        </div>
      )}
      <iframe
        className={`w-full rounded-xl bg-[#f8f8f9] transition-[background-color] dark:bg-[#242427] ${wrapper} ${selectBgClass}`}
        loading="lazy"
        srcDoc={componentHtml}
        title={`${componentTitle} Component`}
        ref={refIframe}
      ></iframe>
    </div>
  );
}
