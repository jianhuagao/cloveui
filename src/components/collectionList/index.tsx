'use client';
import { memo } from 'react';

import ComponentPrev from '../componentPrev';
import { ComponentData } from '@/service/dataService';
import AnimatedShow from '../framerMotions/animatedShow';

export default memo(function CollectionList({ componentsData }: { componentsData: ComponentData[] }) {
  return (
    <AnimatedShow>
      {componentsData.map(componentData => (
        <ComponentPrev key={componentData.id} componentData={componentData} />
      ))}
    </AnimatedShow>
  );
});
