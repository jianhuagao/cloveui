'use client';
import React, { createContext, ReactNode, useState } from 'react';

export interface BackgroundContextProps {
  positionStyles: Record<string, string> | undefined;
  randomStyles: () => void;
}

function generateRandomStyles(): Record<string, string> {
  const getRandomPercentage = (): string => {
    const min = 10;
    const max = 90;
    const randomValue = Math.random() * (max - min) + min;
    return `${randomValue.toFixed(2)}%`;
  };

  return {
    '--before-top': getRandomPercentage(),
    '--before-left': getRandomPercentage(),
    '--after-top': getRandomPercentage(),
    '--after-left': getRandomPercentage()
  };
}

const BackgroundContext = createContext<BackgroundContextProps | undefined>(undefined);

interface BackgroundProviderProps {
  children: ReactNode;
}

export const BackgroundProvider: React.FC<BackgroundProviderProps> = ({ children }) => {
  const [positionStyles, setPositionStyles] = useState<Record<string, string>>();

  const randomStyles = () => {
    setPositionStyles(generateRandomStyles());
  };

  return <BackgroundContext.Provider value={{ positionStyles, randomStyles }}>{children}</BackgroundContext.Provider>;
};

export default BackgroundContext;
