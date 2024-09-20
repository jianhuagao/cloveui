import { notFound } from 'next/navigation';
import { join } from 'path';
import { memo } from 'react';
import { promises as fs } from 'fs';
import { serialize } from 'next-mdx-remote/serialize';
import MdxRemoteRender from '@/components/mdxRemoteRender';
import CollectionList from '@/components/collectionList';
import { ComponentData, getCollection } from '@/service/dataService';

interface PageParams {
  compType: string;
  compName: string;
}

const mdxComponents = {
  CollectionList
};

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
