import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  const key = 'test-key';

  beforeEach(() => {
    localStorage.clear();
  });

  it('Initializes with default value if localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage(key, 'default'));

    const [storedValue] = result.current;
    expect(storedValue).toBe('default');
    expect(localStorage.getItem(key)).toBe('default');
  });

  it('Initializes with stored value if localStorage has data', () => {
    localStorage.setItem(key, 'stored-value');

    const { result } = renderHook(() => useLocalStorage(key, 'default'));

    const [storedValue] = result.current;
    expect(storedValue).toBe('stored-value');
  });

  it('Updates value and saves to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage(key, 'initial'));

    act(() => {
      const [, setValue] = result.current;
      setValue('updated');
    });

    const [updatedValue] = result.current;
    expect(updatedValue).toBe('updated');
    expect(localStorage.getItem(key)).toBe('updated');
  });

  it('Saves changes across rerenders', () => {
    const { result, rerender } = renderHook(() =>
      useLocalStorage(key, 'first')
    );

    act(() => {
      const [, setValue] = result.current;
      setValue('persisted');
    });

    rerender();

    const [currentValue] = result.current;
    expect(currentValue).toBe('persisted');
    expect(localStorage.getItem(key)).toBe('persisted');
  });
});
