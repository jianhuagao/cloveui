import { memo } from 'react';
import LayoutHeader from '@/components/layoutHeader';
import LayoutFooter from '@/components/layoutFooter';

export default memo(function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="2xl:sticky 2xl:top-0">
        <LayoutHeader />
      </div>
      <div className="grow">{children}</div>
      <div>
        <LayoutFooter />
      </div>
    </div>
  );
});
