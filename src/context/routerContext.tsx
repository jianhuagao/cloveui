'use client';

import { MenuItemProps } from '@/components/menu';
// context/RouterContext.tsx
import { createContext, ReactNode } from 'react';

const RouterContext = createContext<{ menuItems: MenuItemProps[] } | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  menuItems: MenuItemProps[];
}

export const RouterProvider = ({ children, menuItems }: ThemeProviderProps) => {
  return <RouterContext.Provider value={{ menuItems }}>{children}</RouterContext.Provider>;
};

export default RouterContext;
