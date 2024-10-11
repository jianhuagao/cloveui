'use client';
import { FetchHtmlReturn } from '@/service/clientDataService';
import { componentPreviewHtml } from '@/utils/transformers';
import { memo, useMemo, useState } from 'react';
import Editor from 'react-simple-code-editor';
// import { highlight, languages } from 'prismjs/components/prism-core';
// import { core, languages } from 'prismjs/components';

const Play = () => {
  const [playContent, setPlayContent] = useState('');

  const [isDark, setIsDark] = useState(false);

  const transformedHtml = useMemo(() => componentPreviewHtml(playContent, '', isDark), [playContent, isDark]);

  return (
    <div>
      <div>
        <input type="text" value={playContent} onChange={e => setPlayContent(e.target.value)} />
        {/* <Editor
          value={playContent}
          onValueChange={code => setPlayContent(code)}
          highlight={code => core.highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12
          }}
        /> */}
      </div>
      <div>
        <iframe
          className={`w-full rounded-md bg-[#f8f8f9] transition-[background-color] dark:bg-[#242427]`}
          loading="lazy"
          srcDoc={transformedHtml}
          title="play"
        ></iframe>
      </div>
    </div>
  );
};

export default memo(Play);
