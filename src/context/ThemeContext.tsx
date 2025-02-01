import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeContextType } from '../types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Get from localStorage, explicitly return false if not set
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? savedMode === 'true' : false;
  });

  useEffect(() => {
    // Ensure dark class is removed on initial load if in light mode
    if (!isDarkMode) {
      document.documentElement.classList.remove('dark');
    }
    // Update document class and localStorage when theme changes
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('darkMode', String(isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}