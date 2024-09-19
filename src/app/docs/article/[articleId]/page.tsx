import { memo } from 'react';

interface PageParams {
  articleId: string;
}

export default memo(async function Page({ params }: { params: PageParams }) {
  const { articleId } = params;

  return (
    <div>
      <h2>{articleId} .Building</h2>
    </div>
  );
});
