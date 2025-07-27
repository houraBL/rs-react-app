import CharacterList from './CharacterList';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('CharacterList', () => {
  vi.mock('../../api/api-client');
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering Tests', () => {
    it('Renders correct number of items when data is provided', async () => {
      render(
        <MemoryRouter>
          <CharacterList searchedTerm="" />
        </MemoryRouter>
      );
      const cards = await screen.findAllByRole('character-card');
      expect(cards).toHaveLength(3);
    });

    it('Displays "no results" message when data array is empty', async () => {
      const { fetchCharacters } = await import('../../api/api-client');
      const mockedFetchCharacters = vi.mocked(fetchCharacters);

      mockedFetchCharacters.mockImplementationOnce(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  results: [],
                  totalPages: 1,
                }),
              0
            )
          )
      );
      render(
        <MemoryRouter>
          <CharacterList searchedTerm="" />
        </MemoryRouter>
      );
      const emptyCharactersMessage = await screen.findByText(
        'No characters found.'
      );
      expect(emptyCharactersMessage).toBeInTheDocument();
    });

    it('Shows loading state while fetching data', async () => {
      const { fetchCharacters } = await import('../../api/api-client');
      const mockedFetchCharacters = vi.mocked(fetchCharacters);

      mockedFetchCharacters.mockImplementationOnce(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  results: [],
                  totalPages: 1,
                }),
              300
            )
          )
      );
      render(
        <MemoryRouter>
          <CharacterList searchedTerm="" />
        </MemoryRouter>
      );
      expect(screen.getByTestId('main-loader')).toBeInTheDocument();
    });
  });

  describe('Data Display Tests', () => {
    it('Correctly displays item names and descriptions', async () => {
      render(
        <MemoryRouter>
          <CharacterList searchedTerm="" />
        </MemoryRouter>
      );
      expect(await screen.findByText('Test Name 1')).toBeInTheDocument();
      expect(await screen.findByText('Test Name 2')).toBeInTheDocument();
      expect(await screen.findByText('Test Name 3')).toBeInTheDocument();
    });

    it('Handles missing or undefined data gracefully', async () => {
      const { fetchCharacters } = await import('../../api/api-client');
      const mockedFetchCharacters = vi.mocked(fetchCharacters);

      mockedFetchCharacters.mockImplementationOnce(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () => resolve({ results: undefined, totalPages: undefined }),
              300
            )
          )
      );
      render(
        <MemoryRouter>
          <CharacterList searchedTerm="" />
        </MemoryRouter>
      );

      expect(
        await screen.findByText('Error: Cannot retrieve characters')
      ).toBeInTheDocument();
    });
  });

  describe('Error Handling Tests', () => {
    it('Displays error message when API call fails', async () => {
      const { fetchCharacters } = await import('../../api/api-client');
      const mockedFetchCharacters = vi.mocked(fetchCharacters);

      mockedFetchCharacters.mockRejectedValueOnce(new Error('Failed to fetch'));
      render(
        <MemoryRouter>
          <CharacterList searchedTerm="" />
        </MemoryRouter>
      );
      const errorMessage = await screen.findByText('Error: Failed to fetch');
      expect(errorMessage).toBeInTheDocument();
    });

    it('Displays error message when API call fails', async () => {
      const { fetchCharacters } = await import('../../api/api-client');
      const mockedFetchCharacters = vi.mocked(fetchCharacters);

      mockedFetchCharacters.mockResolvedValueOnce({
        results: [],
        totalPages: 1,
      });
      const { rerender } = render(
        <MemoryRouter>
          <CharacterList searchedTerm="rick" />
        </MemoryRouter>
      );
      expect(mockedFetchCharacters).toBeCalledTimes(1);
      await act(async () => {
        await rerender(
          <MemoryRouter>
            <CharacterList searchedTerm="morty" />
          </MemoryRouter>
        );
      });
      expect(mockedFetchCharacters).toBeCalledTimes(2);
    });

    it('Displays unknown error message when non-error was thrown', async () => {
      const { fetchCharacters } = await import('../../api/api-client');
      const mockedFetchCharacters = vi.mocked(fetchCharacters);

      mockedFetchCharacters.mockRejectedValueOnce('123');
      render(
        <MemoryRouter>
          <CharacterList searchedTerm="rick" />
        </MemoryRouter>
      );
      const errorMessage = await screen.findByText(
        'Error: Unknown error occurred'
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
