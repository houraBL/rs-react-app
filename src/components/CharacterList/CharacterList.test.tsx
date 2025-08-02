import CharacterList from './CharacterList';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useSearchParams: vi.fn(),
    useNavigate: vi.fn(),
  };
});

describe('CharacterList', () => {
  vi.mock('../../api/api-client');

  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as Mock).mockReturnValue(mockNavigate);
  });
  const setTotalPages = vi.fn();

  describe('Rendering Tests', () => {
    it('Renders correct number of items when data is provided', async () => {
      render(
        <MemoryRouter>
          <CharacterList searchedTerm="" setTotalPages={setTotalPages} />
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
          <CharacterList searchedTerm="" setTotalPages={setTotalPages} />
        </MemoryRouter>
      );
      const errorMessage = await screen.findByText(
        'Error: No characters found'
      );
      expect(errorMessage).toBeInTheDocument();
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
          <CharacterList searchedTerm="" setTotalPages={setTotalPages} />
        </MemoryRouter>
      );
      expect(screen.getByTestId('main-loader')).toBeInTheDocument();
    });
  });

  describe('Data Display Tests', () => {
    it('Correctly displays item names and descriptions', async () => {
      render(
        <MemoryRouter>
          <CharacterList searchedTerm="" setTotalPages={setTotalPages} />
        </MemoryRouter>
      );
      expect(await screen.findByText('Test Name 1')).toBeInTheDocument();
      expect(await screen.findByText('Test Name 2')).toBeInTheDocument();
      expect(await screen.findByText('Test Name 3')).toBeInTheDocument();
    });
  });

  describe('Error Handling Tests', () => {
    it('Displays error message when API call fails', async () => {
      const { fetchCharacters } = await import('../../api/api-client');
      const mockedFetchCharacters = vi.mocked(fetchCharacters);

      mockedFetchCharacters.mockRejectedValueOnce(new Error('Failed to fetch'));
      render(
        <MemoryRouter>
          <CharacterList searchedTerm="" setTotalPages={setTotalPages} />
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
          <CharacterList searchedTerm="rick" setTotalPages={setTotalPages} />
        </MemoryRouter>
      );
      expect(mockedFetchCharacters).toBeCalledTimes(1);
      await act(async () => {
        await rerender(
          <MemoryRouter>
            <CharacterList searchedTerm="morty" setTotalPages={setTotalPages} />
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
          <CharacterList searchedTerm="rick" setTotalPages={setTotalPages} />
        </MemoryRouter>
      );
      const errorMessage = await screen.findByText(
        'Error: Unknown error occurred'
      );
      expect(errorMessage).toBeInTheDocument();
    });

    it('Redirects to not-found page is pageId is invalid', async () => {
      render(
        <MemoryRouter initialEntries={['/abc']}>
          <Routes>
            <Route
              path="/:pageId"
              element={
                <CharacterList searchedTerm="" setTotalPages={setTotalPages} />
              }
            />
          </Routes>
        </MemoryRouter>
      );
      await expect(mockNavigate).toHaveBeenCalledWith('/not-found', {
        replace: true,
      });
    });
  });
});
