import MdxRemoteRender from '@/components/mdxRemoteRender';
import { getArticles } from '@/service/dataService';
import { memo } from 'react';
import ArticleDemoPreview from '@/components/articleDemoPreview';

interface PageParams {
  articleId: string;
}

const mdxComponents = {
  ArticleDemoPreview
};

export default memo(async function Page({ params }: { params: PageParams }) {
  const { articleId } = params;

  const { data, content } = await getArticles(Number(articleId));

  return (
    <div className="mx-auto max-w-5xl">
      <h2>{data.title}</h2>
      <h3>{data.description}</h3>
      <p>{data.date}</p>
      <MdxRemoteRender mdxSource={content} mdxComponents={mdxComponents} />
    </div>
  );
});
