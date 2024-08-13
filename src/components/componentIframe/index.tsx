import { LegacyRef } from 'react';

interface ComponentIframeProps {
  show: boolean;
  componentHtml: string;
  componentTitle: string;
  previewHeight?: string;
  refIframe: LegacyRef<HTMLIFrameElement>;
}

export default function ComponentsIframe({
  show,
  componentHtml,
  componentTitle,
  previewHeight = 'h-[400px] lg:h-[600px]',
  refIframe
}: ComponentIframeProps) {
  const iframeTheme = 'bg-[#f8f8f9] dark:bg-[#242427]';

  return (
    <div
      {...(!show && {
        hidden: true
      })}
      className="rounded-md"
    >
      <iframe
        className={`w-full rounded-md ${iframeTheme} ${previewHeight}`}
        loading="lazy"
        srcDoc={componentHtml}
        title={`${componentTitle} Component`}
        ref={refIframe}
      ></iframe>
    </div>
  );
}
