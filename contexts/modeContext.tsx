import React, { createContext, useContext, useState } from 'react';
import { LightTheme, DarkTheme } from '@/constants/theme';

interface ModeContextType {
  mode: 'light' | 'dark';
  theme: typeof LightTheme;
  toggleMode: () => void;
}

const ModeContext = createContext<ModeContextType>({} as ModeContextType);

export const useMode = () => useContext(ModeContext);

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ModeContext.Provider value={{ mode, theme: mode === 'light' ? LightTheme : DarkTheme, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
}
