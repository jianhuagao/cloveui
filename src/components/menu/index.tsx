import { memo } from 'react';
import clsx from 'clsx';
import React from 'react';
import MenuItem, { ArticleMenuItem, PlayMenuItem } from '../menuItem';
import Image from 'next/image';
import Link from 'next/link';
import { ArticleDicMdxProps, getArticlesDic, getComponents } from '@/service/dataService';

const miniText = 'text-xs/6 font-medium text-zinc-500 dark:text-zinc-400';

export interface MenuItemProps {
  title: string;
  slug: string;
  children?: MenuItemProps[];
}

export default memo(async function Menu() {
  const componentsByCategory = await getComponents();

  const { articles }: ArticleDicMdxProps = await getArticlesDic();

  return (
    <div className="flex grow flex-col overflow-hidden">
      <div
        style={{
          maskImage: 'linear-gradient(to bottom, black 0%, black 95%, transparent 100%)'
        }}
        className="mini-scrollbar flex shrink grow flex-col gap-1 overflow-auto p-4"
      >
        {componentsByCategory?.map(type => {
          const itemsTitle = <div className={clsx('px-3 pt-2 first:pt-0', miniText)}>{type.title}</div>;
          const items = type.children?.map(c => {
            return <MenuItem slug={c.slug} title={c.title} key={c.slug} />;
          });
          return (
            <React.Fragment key={type.slug}>
              {itemsTitle}
              {items}
            </React.Fragment>
          );
        })}
      </div>
      <div className="shrink-0 px-5">
        <div className="flex flex-col gap-1 border-t border-zinc-950/5 pt-4 transition-all dark:border-white/5">
          <PlayMenuItem>
            <Image src="/play/play.svg" alt="play" width={16} height={16} priority />
            Playground
          </PlayMenuItem>
          <ArticleMenuItem>
            <Image src="/icons/book.svg" alt="book" className="dark:invert" width={16} height={16} priority />
            Article
          </ArticleMenuItem>
          <ul className="list-none text-xs opacity-80">
            {Object.values(articles)?.map(s => (
              <li key={s.articleId}>
                <Link
                  href={`/docs/article/${s.articleId}`}
                  className="block cursor-pointer truncate py-2 transition-all select-none hover:scale-105 active:scale-100"
                >
                  [{s.pubDate.replace(/^(\d{4})-(\d{2}-\d{2})$/, '$2')}] {s.artTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
});
