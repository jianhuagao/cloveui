import { memo } from 'react';
import MdxRemoteRender from '@/components/mdxRemoteRender';
import { getArticles } from '@/service/dataService';
import ArticleDemoPreview from '@/components/articleDemoPreview';

interface PageParams {
  articleId: string;
}

const mdxComponents: Record<string, React.ComponentType<unknown>> = {
  ArticleDemoPreview: ArticleDemoPreview as React.ComponentType<unknown>
};

export default memo(async function Page({ params }: { params: Promise<PageParams> }) {
  const { articleId } = await params;

  const { data, content } = await getArticles(Number(articleId));

  const schemaData = {
    '@context': 'http://schema.org',
    '@type': 'NewsArticle',
    headline: `${data.title}`,
    image: 'https://www.cloveui.asia/og.png',
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
