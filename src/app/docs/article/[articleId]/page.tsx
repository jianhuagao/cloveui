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

  const schemaData = {
    '@context': 'http://schema.org',
    '@type': 'NewsArticle',
    headline: `${data.title}`,
    image: 'https://www.cloveui.asia/og.jpg',
    datePublished: `${data.date}`
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      <article data-article className="mx-auto max-w-5xl">
        <header>
          <h2>{data.title}</h2>
          <h3 className="opacity-90">{data.description}</h3>
          <time>{data.date}</time>
        </header>
        <MdxRemoteRender mdxSource={content} mdxComponents={mdxComponents} />
      </article>
    </>
  );
});
