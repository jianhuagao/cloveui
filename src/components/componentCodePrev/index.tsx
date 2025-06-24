import { memo, useEffect, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx.min';
import CopyBtn from '../copyBtn';

interface ComponentCodePrevProps {
  componentCode?: string;
  codeType?: string;
}

export default memo(function ComponentCodePrev({ componentCode = '', codeType = 'html' }: ComponentCodePrevProps) {
  const [prismClass, setPrismClass] = useState('language-html');
  // const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // 设置组件已挂载状态
    // setIsMounted(true);
    Prism.highlightAll();
  }, [componentCode]);

  useEffect(() => {
    if (codeType === 'html') setPrismClass('language-html');
    else if (codeType === 'vue') setPrismClass('language-html');
    else if (codeType === 'jsx') setPrismClass('language-jsx');
  }, [codeType]);

  return (
    <div className="relative">
      <pre className="h-[400px] overflow-auto rounded-xs p-4 ring-2 ring-gray-900 lg:h-[600px]">
        <code className={prismClass}>{componentCode}</code>
      </pre>
      <div className="absolute top-4 right-4 z-10">
        <CopyBtn content={componentCode} />
      </div>
    </div>
  );
});
