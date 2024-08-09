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
      className="rounded-md bg-white bg-[linear-gradient(45deg,_rgb(249_250_251)_25%,_transparent_25%),_linear-gradient(-45deg,_rgb(249_250_251)_25%,_transparent_25%),_linear-gradient(45deg,_transparent_75%,_rgb(249_250_251)_75%),_linear-gradient(-45deg,_transparent_75%,_rgb(249_250_251)_75%)] bg-[length:_20px_20px] [background-position:_0_0,_0_10px,_10px_-10px,_-10px_0px]"
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
