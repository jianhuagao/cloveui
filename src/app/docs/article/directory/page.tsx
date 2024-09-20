import { memo } from 'react';
import Link from 'next/link';
import { ArticleDicMdxProps, getArticlesDic } from '@/service/dataService';

export default memo(async function Page() {
  const { articles }: ArticleDicMdxProps = await getArticlesDic();
  return (
    <div className="mx-auto max-w-5xl">
      <h2 className="px-6 pb-6 pt-4">Directory</h2>
      <div className="flex flex-col gap-6 py-2">
        {Object.values(articles)?.map(article => {
          const categoryArr = article.category.split(',');

          return (
            <div
              key={article.articleId}
              className="flex flex-col gap-1.5 rounded-xl border border-black/5 px-6 py-5 hover:ring dark:border-white/5 dark:bg-black/20"
            >
              <div className="flex shrink-0 items-center gap-2 text-sm opacity-85">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                  <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                  <path
                    fillRule="evenodd"
                    d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                {article.pubDate}
              </div>
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
