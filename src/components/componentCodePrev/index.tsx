import { memo, useEffect, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx.min';

interface ComponentCodePrevProps {
  show: boolean;
  componentCode?: string;
  codeType?: string;
}

export default memo(function ComponentCodePrev({ show, componentCode = '', codeType = 'html' }: ComponentCodePrevProps) {
  const [prismClass, setPrismClass] = useState('language-html');

  const [copyText, setCopyText] = useState('Copy');

  useEffect(() => Prism.highlightAll(), [componentCode]);

  useEffect(() => {
    codeType === 'html' && setPrismClass('language-html');
    codeType === 'vue' && setPrismClass('language-html');
    codeType === 'jsx' && setPrismClass('language-jsx');
  }, [codeType]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(componentCode || '');
    setCopyText('Copied');
    setTimeout(() => setCopyText('Copy'), 2000);
  };

  return (
    <div {...(!show && { hidden: true })}>
      <div className="relative">
        <pre className="h-[400px] overflow-auto rounded-sm p-4 ring-2 ring-gray-900 lg:h-[600px]">
          <code className={prismClass}>{componentCode}</code>
        </pre>
        <button
          onClick={copyToClipboard}
          className="group absolute right-4 top-4 z-10 inline-flex min-w-0 items-center gap-2 rounded bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition-all hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          {copyText}
          {copyText === 'Copy' ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4 w-0 transition-all group-hover:w-4"
            >
              <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
              <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
            </svg>
          ) : (
            ' 🎉'
          )}
        </button>
      </div>
    </div>
  );
});
