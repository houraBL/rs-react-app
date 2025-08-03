import { useEffect, useState } from 'react';

export const useLocalStorage = (
  key: string,
  initialValue: string = ''
): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [value, setValue] = useState<string>(() => {
    const stored = localStorage.getItem(key);
    return stored !== null ? stored : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};
