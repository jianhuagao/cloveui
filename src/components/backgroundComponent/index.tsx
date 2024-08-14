'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import BackgroundContext from '@/context/backgroundContext';

const styles = {
  homepage: {
    '--before-top': '10%',
    '--before-left': '33%',
    '--after-top': '15%',
    '--after-left': '60%'
  },
  otherPage: {
    '--before-top': '90%',
    '--before-left': '0',
    '--after-top': '5%',
    '--after-left': '95%'
  }
};

const BackgroundComponent: React.FC = () => {
  const pathname = usePathname();
  const backgroundContext = useContext(BackgroundContext);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [positionStyles, setPositionStyles] = useState<Record<string, string>>(styles.homepage);

  useEffect(() => {
    const backgroundElement = backgroundRef.current;

    if (!backgroundElement) return;
    const currentStyles = pathname === '/' ? styles.homepage : styles.otherPage;
    setPositionStyles(currentStyles);
  }, [pathname]);

  useEffect(() => {
    for (const [key, value] of Object.entries(positionStyles)) {
      backgroundRef.current?.style.setProperty(key, value);
    }
  }, [positionStyles]);

  useEffect(() => {
    if (backgroundContext?.positionStyles && pathname === '/') {
      setPositionStyles(backgroundContext.positionStyles);
    }
  }, [backgroundContext?.positionStyles, pathname]);

  return <div ref={backgroundRef} className="main-background"></div>;
};

export default BackgroundComponent;
