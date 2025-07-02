'use client';

import { memo, ReactNode, useContext } from 'react';
import LayoutContext from '@/context/layoutContext';

interface LayoutModeContentProps {
  children: ReactNode;
  mode: 'horizontal' | 'vertical';
}

export default memo(function LayoutModeContent({ children, mode }: LayoutModeContentProps) {
  const layoutContext = useContext(LayoutContext);

  if (!layoutContext) {
    throw new Error('useContext must be used within a LayoutProvider');
  }

  const { layout } = layoutContext;

  if (layout === mode) {
    return children;
  }

  return <></>;
});
