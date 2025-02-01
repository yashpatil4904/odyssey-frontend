import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeContextType } from '../types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize with light mode (isDarkMode = false)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Get from localStorage, explicitly return false if not set
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true' ? true : false;  // Default to false (light mode)
  });

  useEffect(() => {
    // Remove dark class on initial load
    document.documentElement.classList.remove('dark');
    
    // Update classes and localStorage when theme changes
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Force light mode on initial load
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

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