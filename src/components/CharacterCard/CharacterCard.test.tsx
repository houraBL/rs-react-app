import CharacterCard from './CharacterCard';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { mockCharacter } from '../../api/__mocks__/character-details';

describe('Character Card', () => {
  vi.mock('react-router-dom', async () => {
    const actual =
      await vi.importActual<typeof import('react-router-dom')>(
        'react-router-dom'
      );
    return {
      ...actual,
      useParams: () => ({ page: '3' }),
    };
  });

  describe('Rendering Tests', () => {
    it('Displays item name and image correctly', () => {
      render(
        <MemoryRouter>
          <CharacterCard characterInfo={mockCharacter} />
        </MemoryRouter>
      );
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
