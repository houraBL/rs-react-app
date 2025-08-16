import selectionReducer from '@/utils/selectionSlice';
import { mockCharacters } from '@api/__mocks__/api-client';
import { mockCharacter } from '@api/__mocks__/character-details';
import {
  rickAndMortyAPI,
  useGetCharactersByNameQuery,
} from '@api/rickAndMorty';
import { configureStore } from '@reduxjs/toolkit/react';
import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { type Mock, beforeEach, describe, expect, it, vi } from 'vitest';

import CharacterList from './CharacterList';

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

const mockedGetCharacters = vi.mocked(useGetCharactersByNameQuery);
vi.mock('@api/rickAndMorty', async () => {
  const actual =
    await vi.importActual<typeof import('@api/rickAndMorty')>(
      '@api/rickAndMorty'
    );
  return {
    ...actual,
    useGetCharactersByNameQuery: vi.fn(),
  };
});

const store = configureStore({
  reducer: {
    selection: selectionReducer,
    [rickAndMortyAPI.reducerPath]: rickAndMortyAPI.reducer,
  },
  preloadedState: {
    selection: {
      selectedItems: [mockCharacter],
    },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rickAndMortyAPI.middleware),
});

describe('CharacterList', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as Mock).mockReturnValue(mockNavigate);
  });
  const setTotalPages = vi.fn();

  describe('Rendering Tests', () => {
    it('Renders correct number of items when data is provided', async () => {
      mockedGetCharacters.mockReturnValueOnce({
        data: {
          info: {
            count: 0,
            pages: 1,
            next: null,
            prev: null,
          },
          results: mockCharacters,
        },
        error: undefined,
        isLoading: false,
        isFetching: false,
        refetch: vi.fn(),
      });
      render(
        <MemoryRouter>
          <Provider store={store}>
            <CharacterList searchedTerm="" setTotalPages={setTotalPages} />
          </Provider>
        </MemoryRouter>
      );
      const cards = await screen.findAllByRole('character-card');
      expect(cards).toHaveLength(3);
    });

    it('Displays "no results" message when data array is empty', async () => {
      mockedGetCharacters.mockReturnValue({
        data: {
          info: {
            count: 0,
            pages: 1,
            next: null,
            prev: null,
          },
          results: [],
        },
        error: undefined,
        isLoading: false,
        isFetching: false,
        refetch: vi.fn(),
      });
      render(
        <MemoryRouter>
          <Provider store={store}>
            <CharacterList searchedTerm="" setTotalPages={setTotalPages} />
          </Provider>
        </MemoryRouter>
      );
      const errorMessage = await screen.findByText(
        'Error: No characters found'
      );
      expect(errorMessage).toBeInTheDocument();
    });

    it('Shows loading state while fetching data', async () => {
      mockedGetCharacters.mockReturnValueOnce({
        data: {
          info: {
            count: 0,
            pages: 1,
            next: null,
            prev: null,
          },
          results: [],
        },
        error: undefined,
        isLoading: true,
        isFetching: true,
        refetch: vi.fn(),
      });
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
      mockedGetCharacters.mockReturnValueOnce({
        data: {
          info: {
            count: 0,
            pages: 1,
            next: null,
            prev: null,
          },
          results: mockCharacters,
        },
        error: undefined,
        isLoading: false,
        isFetching: false,
        refetch: vi.fn(),
      });
      render(
        <Provider store={store}>
          <MemoryRouter>
            <CharacterList searchedTerm="" setTotalPages={setTotalPages} />
          </MemoryRouter>
        </Provider>
      );
      for (const character of mockCharacters) {
        expect(await screen.findByText(character.name)).toBeInTheDocument();
      }
    });
  });

  describe('Error Handling Tests', () => {
    it('Displays error message when API call fails', async () => {
      mockedGetCharacters.mockReturnValue({
        data: {
          info: {
            count: 0,
            pages: 1,
            next: null,
            prev: null,
          },
          results: [],
        },
        error: undefined,
        isLoading: false,
        isFetching: false,
        refetch: vi.fn(),
      });
      const { rerender } = render(
        <MemoryRouter>
          <Provider store={store}>
            <CharacterList searchedTerm="rick" setTotalPages={setTotalPages} />
          </Provider>
        </MemoryRouter>
      );
      expect(mockedGetCharacters).toBeCalledTimes(1);
      await act(async () => {
        await rerender(
          <MemoryRouter>
            <Provider store={store}>
              <CharacterList
                searchedTerm="morty"
                setTotalPages={setTotalPages}
              />
            </Provider>
          </MemoryRouter>
        );
      });
      expect(mockedGetCharacters).toBeCalledTimes(2);
    });

    it('Displays unknown error message when non-error was thrown', async () => {
      mockedGetCharacters.mockReturnValueOnce({
        data: undefined,
        error: '123',
        isLoading: false,
        isFetching: false,
        refetch: vi.fn(),
      });
      render(
        <MemoryRouter>
          <Provider store={store}>
            <CharacterList searchedTerm="rick" setTotalPages={setTotalPages} />
          </Provider>
        </MemoryRouter>
      );
      const errorMessage = await screen.findByText(
        'Error: Unknown error occurred'
      );
      expect(errorMessage).toBeInTheDocument();
    });

    it('Set pages to 0 on 404 response', async () => {
      mockedGetCharacters.mockReturnValueOnce({
        data: undefined,
        error: { status: 404, data: undefined },
        isLoading: false,
        isFetching: false,
        refetch: vi.fn(),
      });
      render(
        <MemoryRouter>
          <Provider store={store}>
            <CharacterList searchedTerm="rick" setTotalPages={setTotalPages} />
          </Provider>
        </MemoryRouter>
      );
      expect(setTotalPages).toBeCalledWith(0);
    });

    it('Redirects to not-found page is pageId is invalid', async () => {
      render(
        <MemoryRouter initialEntries={['/abc']}>
          <Provider store={store}>
            <Routes>
              <Route
                path="/:pageId"
                element={
                  <CharacterList
                    searchedTerm=""
                    setTotalPages={setTotalPages}
                  />
                }
              />
            </Routes>
          </Provider>
        </MemoryRouter>
      );
      await expect(mockNavigate).toHaveBeenCalledWith('/not-found', {
        replace: true,
      });
    });
  });
});
