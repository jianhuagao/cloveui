import clsx from 'clsx';
import { memo } from 'react';

export default memo(function Spin({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        'flex size-9 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-black/80 dark:border-t-white/80',
        className
      )}
    ></div>
  );
});
