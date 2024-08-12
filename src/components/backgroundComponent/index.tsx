'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const BackgroundComponent: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    const backgroundElement = document.querySelector('.main-background');
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

  return <div className="main-background"></div>;
};

export default BackgroundComponent;
