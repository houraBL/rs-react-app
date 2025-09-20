import selectionReducer from '@/utils/selectionSlice';
import { mockCharacter } from '@api/__mocks__/character-details';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import CharacterCard from './CharacterCard';

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

  const store = configureStore({
    reducer: { selection: selectionReducer },
    preloadedState: {
      selection: {
        selectedItems: [mockCharacter],
      },
    },
  });

  describe('Rendering Tests', () => {
    it('Displays item name and image correctly', () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <CharacterCard characterInfo={mockCharacter} />
          </MemoryRouter>
        </Provider>
      );
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByAltText('Character portrait')).toBeInTheDocument();
    });

    it('Handles missing props gracefully', () => {
      render(
        <Provider store={store}>
          <CharacterCard characterInfo={undefined} />
        </Provider>
      );
      expect(
        screen.getByText('Character information is missing')
      ).toBeInTheDocument();
    });

    it('Updates store when checkbox is clicked', async () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/1']}>
            <CharacterCard characterInfo={mockCharacter} />
          </MemoryRouter>
        </Provider>
      );
      const checkbox = screen.getByRole('selection-checkbox');
      expect(checkbox).toBeChecked();

      await userEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
      await userEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    });
  });
});
