import { MenuItemProps } from '@/components/menu';
import { join } from 'path';
import { promises as fs } from 'fs';
import { serialize } from 'next-mdx-remote/serialize';

export async function getComponents() {
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

export async function getArticlesDic() {
  const directoryDicPath = join(process.cwd(), '/src/data/articles/directory.mdx');

  const componentItem = await fs.readFile(directoryDicPath, 'utf-8');

  const mdxSource = await serialize<ArticleDicMdxProps, ArticleDicMdxProps>(componentItem, {
    parseFrontmatter: true
  });
  return mdxSource.frontmatter;
}

export async function getArticles(id: number) {
  const directoryDicPath = join(process.cwd(), `/src/data/articles/${id}.mdx`);

  const componentItem = await fs.readFile(directoryDicPath, 'utf-8');

  const mdxSource = await serialize<ArticleDicMdxProps, ArticleDicMdxProps>(componentItem, {
    parseFrontmatter: true
  });
  return mdxSource.frontmatter;
}
