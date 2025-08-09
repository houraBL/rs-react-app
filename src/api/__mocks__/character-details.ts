import type { CharacterInfo } from '@/types/characterInfo';
import { vi } from 'vitest';

export const mockCharacter: CharacterInfo = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth (C-137)', url: '' },
  location: { name: 'Citadel of Ricks', url: '' },
  image: `1.jpeg`,
  episode: [],
  url: '',
  created: '',
};

export const fetchCharacterDetails = vi.fn(() =>
  Promise.resolve({ result: mockCharacter })
);
