'use client';

// context/layoutContext.tsx
import { createContext, useState, useEffect, ReactNode } from 'react';

interface layoutContextType {
  layout: 'vertical' | 'horizontal';
  toggleLayout: () => void;
}

const layoutContext = createContext<layoutContextType | undefined>(undefined);

interface LayoutProviderProps {
  children: ReactNode;
}

export const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const [layout, setLayout] = useState<'vertical' | 'horizontal'>('vertical');

  useEffect(() => {
    const storedLayout = localStorage.getItem('layout');
    if (storedLayout) {
      setLayout(storedLayout as 'vertical' | 'horizontal');
    } else {
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: horizontal)').matches;
      setLayout(prefersDarkScheme ? 'horizontal' : 'vertical');
    }
  }, []);

  useEffect(() => {
    if (layout === 'horizontal') {
      document.documentElement.classList.add('horizontal');
    } else {
      document.documentElement.classList.remove('horizontal');
    }
  }, [layout]);

  const toggleLayout = () => {
    const newLayout = layout === 'vertical' ? 'horizontal' : 'vertical';
    setLayout(newLayout);
    localStorage.setItem('layout', newLayout);
  };

  return <layoutContext.Provider value={{ layout, toggleLayout }}>{children}</layoutContext.Provider>;
};

export default layoutContext;
