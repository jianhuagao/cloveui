import { join } from 'path';
import { memo } from 'react';
import { promises as fs } from 'fs';
import { serialize } from 'next-mdx-remote/serialize';

interface ArticleDicProps {
  articleId: number;
  artTitle: string;
  authName: string;
  isPublished: boolean;
  pubDate: string;
  lastModDate: string;
  category: string;
}

interface ArticleDicMdxProps {
  articles: {
    [key: string]: ArticleDicProps;
  };
}

export default memo(async function Page() {
  const { articles }: ArticleDicMdxProps = await getArticlesDic();
  return (
    <div className="mx-auto max-w-5xl">
      <h2>Directory</h2>
      <div className="flex flex-col gap-4 py-2">
        {Object.values(articles)?.map(article => {
          return <h4 key={article.articleId}>{article.artTitle}</h4>;
        })}
      </div>
    </div>
  );
});

async function getArticlesDic() {
  const directoryDicPath = join(process.cwd(), '/src/data/articles/directory.mdx');

  const componentItem = await fs.readFile(directoryDicPath, 'utf-8');

  const mdxSource = await serialize<ArticleDicMdxProps, ArticleDicMdxProps>(componentItem, {
    parseFrontmatter: true
  });
  return mdxSource.frontmatter;
}
