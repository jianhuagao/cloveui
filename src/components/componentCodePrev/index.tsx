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

  useEffect(() => Prism.highlightAll(), [componentCode]);

  useEffect(() => {
    codeType === 'html' && setPrismClass('language-html');
    codeType === 'vue' && setPrismClass('language-html');
    codeType === 'jsx' && setPrismClass('language-jsx');
  }, [codeType]);

  return (
    <div
      {...(!show && {
        hidden: true
      })}
    >
      <pre className="h-[400px] overflow-auto rounded-sm p-4 ring-2 ring-gray-900 lg:h-[600px]">
        <code className={prismClass}>{componentCode}</code>
      </pre>
    </div>
  );
});
