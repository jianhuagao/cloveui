'use client';
import { memo } from 'react';

import ComponentPrev from '../componentPrev';
import { ComponentData } from '@/service/dataService';
import AnimatedShow from '../framerMotions/animatedShow';

const lowercaseFirstLetter = (str: string) => str.charAt(0).toLowerCase() + str.slice(1);

export default memo(function CollectionList({ componentsData }: { componentsData: ComponentData[] }) {
  return (
    <AnimatedShow>
      {componentsData.map(componentData => (
        <ComponentPrev
          key={componentData.id}
          baseUrl={`/components/${lowercaseFirstLetter(componentData.componentsName)}`}
          componentData={componentData}
        />
      ))}
    </AnimatedShow>
  );
});
