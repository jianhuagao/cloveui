import { MenuItemProps } from '@/components/menu';
import { join } from 'path';
import { promises as fs } from 'fs';
import { serialize } from 'next-mdx-remote/serialize';
import { notFound } from 'next/navigation';

/**
 * 获取组件目录
 */
export async function getComponents() {
  try {
    let menuItems: MenuItemProps[] = [];

    const componentsTypePath = join(process.cwd(), '/src/data/components');
    const componentsTypeSlugs = await fs.readdir(componentsTypePath);

    for (const componentsTypeSlug of componentsTypeSlugs) {
      const menuNewItem: MenuItemProps = { title: componentsTypeSlug, slug: componentsTypeSlug };

      const typeMainPath = join(componentsTypePath, componentsTypeSlug);

      const typeUiArr = await fs.readdir(typeMainPath);

      const childrenPromises = typeUiArr.map(async typeUiSlug => {
        const typeUiName = typeUiSlug.replace('.mdx', '');
        return { title: typeUiName, slug: `${componentsTypeSlug}/${typeUiName}` };
      });

      const children = await Promise.all(childrenPromises);
      menuNewItem.children = children;
      menuItems.push(menuNewItem);
    }
    return menuItems;
  } catch {
    notFound();
  }
}

export interface ComponentData extends Record<string, unknown> {
  id: string;
  components?: object;
  slug: string;
  category: string;
  wrapper: string;
  creator: string;
  interactive: boolean;
  innerWrapper?: string;
  title: string;
  componentsName: string;
  articles?: string[];
}
/**
 * 通过当前组件页面路径获取组件
 */
export async function getCollection(params: { compType: string; compName: string }) {
  try {
    const { compType, compName } = await params;
    const componentsDirectory = join(process.cwd(), '/src/data/components');
    const componentPath = join(componentsDirectory, compType, `${compName}.mdx`);
    const componentItem = await fs.readFile(componentPath, 'utf-8');

    const mdxSource = await serialize<ComponentData, ComponentData>(componentItem, {
      parseFrontmatter: true
    });

    return {
      collectionData: {
        ...mdxSource.frontmatter
      },
      collectionContent: mdxSource
    };
  } catch {
    notFound();
  }
}

export interface ArticleDicProps {
  articleId: number;
  artTitle: string;
  authName: string;
  isPublished: boolean;
  pubDate: string;
  lastModDate: string;
  category: string;
}
export interface ArticleDicMdxProps {
  articles: {
    [key: string]: ArticleDicProps;
  };
}
/**
 * 获取Articles目录信息
 */
export async function getArticlesDic(ids?: string[]) {
  try {
    const directoryDicPath = join(process.cwd(), '/src/data/articles/directory.mdx');

    const componentItem = await fs.readFile(directoryDicPath, 'utf-8');

    const mdxSource = await serialize<ArticleDicMdxProps, ArticleDicMdxProps>(componentItem, {
      parseFrontmatter: true
    });
    const filteredArticles = filterPublishedArticles(mdxSource.frontmatter);
    if (ids && filteredArticles) {
      return filterArticlesByIds(ids, filteredArticles);
    }
    return filteredArticles;
  } catch {
    notFound();
  }
}

function filterPublishedArticles(data: ArticleDicMdxProps): ArticleDicMdxProps {
  const filteredArticles = Object.entries(data.articles)
    .filter(([_, article]) => article.isPublished)
    .reduce(
      (acc, [key, article]) => {
        acc[key] = article;
        return acc;
      },
      {} as Record<string, ArticleDicProps>
    );

  return { articles: filteredArticles };
}

const filterArticlesByIds = (input: string[], data: ArticleDicMdxProps): ArticleDicMdxProps => {
  const filteredArticles: Record<string, ArticleDicProps> = {};

  input.forEach(id => {
    if (data.articles[id]) {
      filteredArticles[id] = data.articles[id];
    }
  });

  return { articles: filteredArticles };
};

interface ArticleMdxProps extends Record<string, unknown> {
  title: string;
  description: string;
  date: string;
}
/**
 * 通过Articlesid获取Articles内容
 */
export async function getArticles(id: number) {
  try {
    const directoryDicPath = join(process.cwd(), `/src/data/articles/${id}.mdx`);

    const componentItem = await fs.readFile(directoryDicPath, 'utf-8');

    const mdxSource = await serialize<ArticleMdxProps, ArticleMdxProps>(componentItem, {
      parseFrontmatter: true
    });

    return {
      data: mdxSource.frontmatter,
      content: mdxSource
    };
  } catch {
    notFound();
  }
}
