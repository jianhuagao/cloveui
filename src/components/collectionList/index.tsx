'use client';
import { memo } from 'react';

import ComponentPrev from '../componentPrev';
import { ComponentContainer, ComponentData } from '@/app/docs/comp/[compType]/[compName]/page';

interface CollectionListProps {
  componentsData: ComponentData[];
  componentContainer: ComponentContainer;
}
export default memo(function CollectionList({ componentsData, componentContainer }: CollectionListProps) {
  return (
    <div>
      {componentsData.map(componentData => (
        <ComponentPrev key={componentData.id} componentData={componentData} componentContainer={componentContainer} />
      ))}
    </div>
  );
});
