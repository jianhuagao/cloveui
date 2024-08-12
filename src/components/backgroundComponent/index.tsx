'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const BackgroundComponent: React.FC = () => {
  const pathname = usePathname();
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const backgroundElement = backgroundRef.current;

    if (backgroundElement) {
      if (pathname === '/') {
        backgroundElement.classList.add('homepage');
        backgroundElement.classList.remove('otherpage');
      } else {
        backgroundElement.classList.add('otherpage');
        backgroundElement.classList.remove('homepage');
      }
    }
  }, [pathname]);

  return <div ref={backgroundRef} className="main-background"></div>;
};

export default BackgroundComponent;
