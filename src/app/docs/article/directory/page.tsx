import { memo } from 'react';
import Link from 'next/link';
import { ArticleDicMdxProps, getArticlesDic } from '@/service/dataService';

export default memo(async function Page() {
  const { articles }: ArticleDicMdxProps = await getArticlesDic();
  return (
    <div className="mx-auto max-w-5xl">
      <h2 className="pb-6 pt-4">Directory</h2>
      <div className="flex flex-col gap-6 py-2">
        {Object.values(articles)?.map(article => {
          const categoryArr = article.category.split(',');

          return (
            <div
              key={article.articleId}
              className="flex items-center gap-6 rounded-xl border border-black/5 px-6 py-4 dark:border-white/5 dark:bg-black/20"
            >
              <div className="shrink-0 text-sm">{article.pubDate}</div>
              <Link
                href={`/docs/article/${article.articleId}`}
                className="cursor-pointer truncate text-lg font-semibold no-underline transition-transform hover:underline active:scale-95"
              >
                {article.artTitle}
              </Link>
              <div className="flex shrink-0 items-center gap-1">
                {categoryArr.map(cat => (
                  <div
                    key={cat}
                    className="rounded border border-gray-100 bg-black/5 px-2 py-0.5 text-xs transition-all dark:border-white/10"
                  >
                    # {cat}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
