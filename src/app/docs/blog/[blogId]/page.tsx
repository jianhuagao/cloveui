import { memo } from 'react';

interface PageParams {
  blogId: string;
}

export default memo(async function Page({ params }: { params: PageParams }) {
  const { blogId } = params;

  return (
    <div>
      <h2>{blogId} .Building</h2>
    </div>
  );
});
