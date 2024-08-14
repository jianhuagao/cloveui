'use client';

import BackgroundContext from '@/context/backgroundContext';
import clsx from 'clsx';
import { memo, useContext } from 'react';

export default memo(function ChangeBg({ children, className }: { children: React.ReactNode; className?: string }) {
  const backgroundContext = useContext(BackgroundContext);
  return (
    <span className={clsx(className)} onClick={backgroundContext?.randomStyles}>
      {children}
    </span>
  );
});
