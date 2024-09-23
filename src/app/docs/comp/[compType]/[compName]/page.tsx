import { memo } from 'react';
import MdxRemoteRender from '@/components/mdxRemoteRender';
import CollectionList from '@/components/collectionList';
import { ComponentData, getArticlesDic, getCollection } from '@/service/dataService';
import Link from 'next/link';

interface PageParams {
  compType: string;
  compName: string;
}

const mdxComponents = {
  CollectionList
};

export default memo(async function Page({ params }: { params: PageParams }) {
  const { collectionData, collectionContent } = await getCollection(params);

  const articlesId = collectionData.articles;

  const articles = articlesId && (await getArticlesDic(articlesId));

  const componentsData: { componentsData: ComponentData[] } = {
    componentsData: Object.entries(collectionData.components as object).map(([componentId, componentItem]) => {
      return {
        id: componentId,
        title: componentItem.title,
        slug: collectionData.slug,
        category: collectionData.category,
        wrapper: componentItem.wrapper || '',
        creator: componentItem.creator || '',
        innerWrapper: componentItem.innerWrapper || '',
        interactive: !!componentItem.interactive,
        componentsName: collectionData.title
      };
    })
  };

  return (
    <div>
      <MdxRemoteRender mdxSource={collectionContent} mdxComponents={mdxComponents} mdxScope={componentsData} />
      {articles && (
        <div className="mt-8 border-t border-t-black/10 pt-4 dark:border-t-white/15">
          <h6>相关文章</h6>
          <ul>
            {Object.values(articles.articles)?.map(article => {
              return (
                <li key={article.articleId} className="leading-3">
                  <Link className="text-sm no-underline hover:underline" href={`/docs/article/${article.articleId}`}>
                    {article.artTitle}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
});
