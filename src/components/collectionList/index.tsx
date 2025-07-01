'use client';
import { memo } from 'react';

import ComponentPrev from '../componentPrev';
import { ComponentData } from '@/service/dataService';
import AnimatedShow from '../framerMotions/animatedShow';

const lowercaseFirstLetter = (str: string) => str.charAt(0).toLowerCase() + str.slice(1);

const spanArr = [
  'col-span-12',
  'col-span-12 xl:col-span-1',
  'col-span-12 xl:col-span-2',
  'col-span-12 xl:col-span-3',
  'col-span-12 xl:col-span-4',
  'col-span-12 xl:col-span-5',
  'col-span-12 xl:col-span-6',
  'col-span-12 xl:col-span-7',
  'col-span-12 xl:col-span-8',
  'col-span-12 xl:col-span-9',
  'col-span-12 xl:col-span-10',
  'col-span-12 xl:col-span-11'
];

export default memo(function CollectionList({ componentsData }: { componentsData: ComponentData[] }) {
  return (
    <AnimatedShow className="grid grid-cols-12 gap-x-8 gap-y-6">
      {componentsData.map(componentData => {
        const span = Number(componentData.span || 0);
        const spanClass = spanArr[span];
        return (
          <ComponentPrev
            originalClassName={spanClass}
            key={componentData.id}
            baseUrl={`/components/${lowercaseFirstLetter(componentData.componentsName)}`}
            componentData={componentData}
          />
        );
      })}
    </AnimatedShow>
  );
});
