import { notFound } from 'next/navigation';
import { join } from 'path';
import { memo } from 'react';
import { promises as fs } from 'fs';
import { serialize } from 'next-mdx-remote/serialize';
import MdxRemoteRender from '@/components/mdxRemoteRender';
import CollectionList from '@/components/collectionList';

export interface ComponentContainer {
  previewInner: string;
  previewHeight: string;
}

export interface ComponentData {
  id: string;
  title: string;
  slug: string;
  category: string;
  container: string;
  wrapper: string;
  creator: string;
  interactive: boolean;
}

interface ComponentsData {
  componentContainer: ComponentContainer;
  componentsData: ComponentData[];
}

interface PageParams {
  compType: string;
  compName: string;
}

interface CollectionData extends Record<string, unknown> {
  components: object;
  slug: string;
  category: string;
  container: string;
  wrapper: string;
  creator: string;
  interactive: boolean;
  title: string;
}

const mdxComponents = {
  CollectionList
};

const componentsDirectory = join(process.cwd(), '/src/data/components');

async function getCollection(params: PageParams) {
  try {
    const componentPath = join(componentsDirectory, params.compType, `${params.compName}.mdx`);
    const componentItem = await fs.readFile(componentPath, 'utf-8');

    const mdxSource = await serialize<CollectionData, CollectionData>(componentItem, {
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

export default memo(async function Page({ params }: { params: PageParams }) {
  // const { compType, compName } = params;

  const { collectionData, collectionContent } = await getCollection(params);

  const componentsData: ComponentsData = {
    componentContainer: {
      previewInner: (collectionData.container as string) || '',
      previewHeight: (collectionData.wrapper as string) || ''
    },
    componentsData: Object.entries(collectionData.components as object).map(([componentId, componentItem]) => {
      return {
        id: componentId,
        title: componentItem.title,
        slug: collectionData.slug,
        category: collectionData.category,
        container: componentItem.container || '',
        wrapper: componentItem.wrapper || '',
        creator: componentItem.creator || '',
        interactive: !!componentItem.interactive
      };
    })
  };

  return (
    <div>
      <MdxRemoteRender mdxSource={collectionContent} mdxComponents={mdxComponents} mdxScope={componentsData} />
    </div>
  );
});
