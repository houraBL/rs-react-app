import CharacterCard from './CharacterCard';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import type { CharacterInfo } from '../../types/character';

describe('Character Card', () => {
  const mockCharacter: CharacterInfo = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth (C-137)', url: '' },
    location: { name: 'Citadel of Ricks', url: '' },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [],
    url: '',
    created: '',
  };

  describe('Rendering Tests', () => {
    it('Displays item name and image correctly', () => {
      render(<CharacterCard characterInfo={mockCharacter} />);
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByAltText('Character portrait')).toBeInTheDocument();
    });

    it('Handles missing props gracefully', () => {
      render(<CharacterCard characterInfo={undefined} />);
      expect(
        screen.getByText('Character information is missing')
      ).toBeInTheDocument();
    });
  });
});
