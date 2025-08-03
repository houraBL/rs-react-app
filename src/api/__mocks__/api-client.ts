import { vi } from 'vitest';

export const fetchCharacters = vi.fn(() =>
  Promise.resolve({
    results: [
      { id: 1, name: 'Test Name 1', image: 'qwerty' },
      { id: 2, name: 'Test Name 2', image: 'qwerty' },
      { id: 3, name: 'Test Name 3', image: 'qwerty' },
    ],
    totalPages: 1,
  })
);
