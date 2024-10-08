'use client';
import { memo } from 'react';

import ComponentPrev from '../componentPrev';
import { ComponentData } from '@/service/dataService';

export default memo(function CollectionList({ componentsData }: { componentsData: ComponentData[] }) {
  return (
    <div>
      {componentsData.map(componentData => (
        <ComponentPrev key={componentData.id} componentData={componentData} />
      ))}
    </div>
  );
});
