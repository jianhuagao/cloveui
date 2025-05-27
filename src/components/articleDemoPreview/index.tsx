'use client';

import { memo } from 'react';
import ComponentPrev from '../componentPrev';

interface ArticleDemoPreviewProps {
  articleId: string;
  demoId: string;
  previewTitle: string;
  innerWrapper?: string;
  wrapper?: string;
}

export default memo(function ArticleDemoPreview({
  articleId,
  demoId,
  previewTitle,
  wrapper = '',
  innerWrapper = ''
}: ArticleDemoPreviewProps) {
  return (
    <ComponentPrev
      componentData={{
        id: demoId,
        title: previewTitle,
        slug: 'demo',
        category: 'demo',
        wrapper: wrapper,
        creator: '',
        innerWrapper: innerWrapper,
        interactive: true,
        componentsName: 'demo'
      }}
      baseUrl={`/articleDemo/${articleId}`}
    />
  );
});
