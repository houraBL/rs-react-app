import selectionReducer from '@/utils/selectionSlice';
import { mockCharacter } from '@api/__mocks__/character-details';
import { rickAndMortyAPI, useGetCharacterByIdQuery } from '@api/rickAndMorty';
import { configureStore } from '@reduxjs/toolkit/react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { type Mock, beforeEach, describe, expect, it, vi } from 'vitest';

import DetailsPanel from './DetailsPanel';

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useParams: vi.fn(),
    useNavigate: vi.fn(),
  };
});

const mockedUseParams = vi.mocked((await import('react-router-dom')).useParams);
const mockNavigate = vi.fn();

const mockedGetCharacter = vi.mocked(useGetCharacterByIdQuery);
vi.mock('@api/rickAndMorty', async () => {
  const actual =
    await vi.importActual<typeof import('@api/rickAndMorty')>(
      '@api/rickAndMorty'
    );
  return { ...actual, useGetCharacterByIdQuery: vi.fn() };
});

const store = configureStore({
  reducer: {
    selection: selectionReducer,
    [rickAndMortyAPI.reducerPath]: rickAndMortyAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rickAndMortyAPI.middleware),
});

describe('Details Panel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as Mock).mockReturnValue(mockNavigate);
  });

  describe('Rendering Tests', () => {
    it('Does not render anything when detailsId is missing', () => {
      mockedUseParams.mockReturnValue({ pageId: '1' });
      mockedGetCharacter.mockReturnValueOnce({
        data: undefined,
        error: undefined,
        isLoading: false,
        isFetching: false,
        refetch: vi.fn(),
      });
      const { container } = render(
        <MemoryRouter>
          <Provider store={store}>
            <DetailsPanel />
          </Provider>
        </MemoryRouter>
      );

      expect(container).toBeEmptyDOMElement();
    });

    it('Displays item name and image correctly', async () => {
      mockedUseParams.mockReturnValue({ pageId: '1', detailsId: '1' });
      mockedGetCharacter.mockReturnValueOnce({
        data: mockCharacter,
        error: undefined,
        isLoading: false,
        isFetching: false,
        refetch: vi.fn(),
      });
      render(
        <MemoryRouter>
          <Provider store={store}>
            <DetailsPanel />
          </Provider>
        </MemoryRouter>
      );
      expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Status: Alive')).toBeInTheDocument();
      expect(screen.getByText('Species: Human')).toBeInTheDocument();
      expect(screen.getByText('Gender: Male')).toBeInTheDocument();
      expect(screen.getByText('Origin: Earth (C-137)')).toBeInTheDocument();
      expect(screen.getByAltText('Rick Sanchez')).toBeInTheDocument();
    });

    it('Handles outside of range 404', async () => {
      mockedUseParams.mockReturnValue({ pageId: '1', detailsId: '999' });

      mockedGetCharacter.mockReturnValueOnce({
        data: undefined,
        error: { status: 404, data: undefined },
        isLoading: false,
        isFetching: false,
        refetch: vi.fn(),
      });
      render(
        <MemoryRouter>
          <Provider store={store}>
            <DetailsPanel />
          </Provider>
        </MemoryRouter>
      );
      expect(
        await screen.findByText('Error: Character not found')
      ).toBeInTheDocument();
    });

    it('Shows loading state while fetching data', async () => {
      mockedUseParams.mockReturnValue({ pageId: '1', detailsId: '999' });

      mockedGetCharacter.mockReturnValueOnce({
        data: mockCharacter,
        error: undefined,
        isLoading: true,
        isFetching: true,
        refetch: vi.fn(),
      });
      render(
        <MemoryRouter>
          <Provider store={store}>
            <DetailsPanel />
          </Provider>
        </MemoryRouter>
      );
      expect(screen.getByTestId('main-loader')).toBeInTheDocument();
    });
  });

  describe('Handles Errors', () => {
    it('Handles Errors gracefully', async () => {
      mockedUseParams.mockReturnValue({ pageId: '1', detailsId: '15' });
      mockedGetCharacter.mockReturnValueOnce({
        data: undefined,
        error: { status: 500, data: {} },
        isLoading: false,
        isFetching: false,
        refetch: vi.fn(),
      });
      render(
        <MemoryRouter>
          <Provider store={store}>
            <DetailsPanel />
          </Provider>
        </MemoryRouter>
      );

      expect(
        await screen.findByText(
          /Error: Could not load your favorite character/i
        )
      ).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('Closes the card after click outside', async () => {
      mockedUseParams.mockReturnValueOnce({ pageId: '1', detailsId: '1' });
      mockedGetCharacter.mockReturnValueOnce({
        data: mockCharacter,
        error: undefined,
        isLoading: false,
        isFetching: false,
        refetch: vi.fn(),
      });
      render(
        <MemoryRouter>
          <Provider store={store}>
            <DetailsPanel />
          </Provider>
        </MemoryRouter>
      );

      expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();

      await userEvent.click(document.body);

      await expect(mockNavigate).toHaveBeenCalledWith('/1', {
        replace: true,
      });
    });

    it('Ignores navigation if pagination or checkbox was clicked', async () => {
      mockedUseParams.mockReturnValueOnce({ pageId: '1', detailsId: '1' });
      mockedGetCharacter.mockReturnValueOnce({
        data: mockCharacter,
        error: undefined,
        isLoading: false,
        isFetching: false,
        refetch: vi.fn(),
      });
      render(
        <MemoryRouter>
          <Provider store={store}>
            <DetailsPanel />
            <div data-role="pagination">Pagination</div>
            <div role="selection-checkbox">Checkbox</div>
          </Provider>
        </MemoryRouter>
      );

      const pagination = screen.getByText('Pagination');

      const checkbox = screen.getByText('Checkbox');
      await userEvent.click(pagination);
      await expect(mockNavigate).not.toHaveBeenCalled();

      await userEvent.click(checkbox);
      await expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    it('Handles missing data gracefully', async () => {
      mockedUseParams.mockReturnValue({ pageId: '1', detailsId: '15' });
      mockedGetCharacter.mockReturnValueOnce({
        data: undefined,
        error: undefined,
        isLoading: false,
        isFetching: false,
        refetch: vi.fn(),
      });
      render(
        <MemoryRouter>
          <Provider store={store}>
            <DetailsPanel />
          </Provider>
        </MemoryRouter>
      );

      expect(
        await screen.findByText(/Error: Unknown error occurred/i)
      ).toBeInTheDocument();
    });
  });
});
