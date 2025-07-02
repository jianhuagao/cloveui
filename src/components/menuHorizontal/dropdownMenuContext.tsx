'use client';

import { createContext, useContext, useState } from 'react';

interface DropdownMenuContextType {
  openId: string | null;
  setOpenId: (id: string | null) => void;
}

const DropdownMenuContext = createContext<DropdownMenuContextType | null>(null);

export const useDropdownMenu = () => {
  const context = useContext(DropdownMenuContext);
  if (!context) throw new Error('DropdownMenuProvider 未包裹');
  return context;
};

export const DropdownMenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [openId, setOpenId] = useState<string | null>(null);

  return <DropdownMenuContext.Provider value={{ openId, setOpenId }}>{children}</DropdownMenuContext.Provider>;
};
