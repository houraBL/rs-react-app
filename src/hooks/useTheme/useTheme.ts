import { useContext } from 'react';
import { ThemeContext } from '../../providers/ThemeProvider';

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('no ThemeProvider');
  }
  return context;
}
