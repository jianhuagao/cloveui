import { notFound } from 'next/navigation';
import { join } from 'path';
import { memo } from 'react';
import { promises as fs } from 'fs';
import { serialize } from 'next-mdx-remote/serialize';
import MdxRemoteRender from '@/components/mdxRemoteRender';
import CollectionList from '@/components/collectionList';

interface PageParams {
  compType: string;
  compName: string;
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
}

const mdxComponents = {
  CollectionList
};

const componentsDirectory = join(process.cwd(), '/src/data/components');

async function getCollection(params: PageParams) {
  try {
    const componentPath = join(componentsDirectory, params.compType, `${params.compName}.mdx`);
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

export default memo(async function Page({ params }: { params: PageParams }) {
  // const { compType, compName } = params;

  const { collectionData, collectionContent } = await getCollection(params);

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
    </div>
  );
});
