import { useEffect, useState, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ThemeContext, type Theme } from './ThemeContext';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [localTheme, setLocalTheme] = useLocalStorage('theme');
  const [theme, setTheme] = useState<Theme>(
    localTheme === 'dark' ? 'dark' : 'light'
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    setLocalTheme(theme);
  }, [setLocalTheme, theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export { ThemeContext };
