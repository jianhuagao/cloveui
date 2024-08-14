import { LegacyRef } from 'react';

interface ComponentIframeProps {
  show: boolean;
  componentHtml: string;
  componentTitle: string;
  wrapper?: string;
  refIframe: LegacyRef<HTMLIFrameElement>;
}

export default function ComponentsIframe({
  show,
  componentHtml,
  componentTitle,
  wrapper = 'h-[400px] lg:h-[600px]',
  refIframe
}: ComponentIframeProps) {
  return (
    <div
      {...(!show && {
        hidden: true
      })}
      className="relative mt-3 rounded-md"
    >
      <div className="pointer-events-none absolute inset-[35%] hidden rounded-full bg-white/15 blur-2xl dark:block"></div>
      <iframe
        className={`w-full rounded-md bg-[#f8f8f9] transition-[background-color] dark:bg-[#242427] ${wrapper}`}
        loading="lazy"
        srcDoc={componentHtml}
        title={`${componentTitle} Component`}
        ref={refIframe}
      ></iframe>
    </div>
  );
}
