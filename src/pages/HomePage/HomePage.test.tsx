import { mockCharacter } from '@api/__mocks__/character-details';
import useLocalStorage from '@hooks/useLocalStorage';
import { configureStore } from '@reduxjs/toolkit';
import selectionReducer from '@store/selectionSlice';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Mock } from 'vitest';

import HomePage from './HomePage';

type SearchProps = {
  onSearchSubmit: (searchTerm: string) => void;
  searchQuery: string;
};

vi.mock('@components/Search/Search', () => ({
  default: ({ onSearchSubmit, searchQuery }: SearchProps) => (
    <div>
      <p>Mock Search Component</p>
      <p>searchQuery: {searchQuery}</p>
      <button onClick={() => onSearchSubmit('123')} />
    </div>
  ),
}));

vi.mock('@components/CharacterList/CharacterList', () => ({
  default: ({ searchedTerm }: { searchedTerm: string }) => (
    <div>Mock CharacterList with searchedTerm: {searchedTerm}</div>
  ),
}));

vi.mock('@components/Pagination/Pagination', () => ({
  default: ({ onPageChange }: { onPageChange: (n: number) => void }) => (
    <button onClick={() => onPageChange(2)}>Page 2</button>
  ),
}));

vi.mock('@hooks/useLocalStorage');

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

let store = configureStore({
  reducer: { selection: selectionReducer },
  preloadedState: {
    selection: {
      selectedItems: [mockCharacter],
    },
  },
});

describe('HomePage', () => {
  const mockNavigate = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
    (useLocalStorage as Mock).mockReturnValue(['rick', vi.fn()]);
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    store = configureStore({
      reducer: { selection: selectionReducer },
      preloadedState: {
        selection: {
          selectedItems: [mockCharacter],
        },
      },
    });
  });
  it('renders Search and CharacterList with correct props', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Mock Search Component')).toBeInTheDocument();
    expect(screen.getByText(/searchQuery: rick/i)).toBeInTheDocument();
    expect(
      screen.getByText(/mock characterlist with searchedterm: rick/i)
    ).toBeInTheDocument();
  });

  it('Redirects to /not-found if pageId is not a number', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/abc']}>
          <Routes>
            <Route path="/:pageId" element={<HomePage />} />
            <Route path="/not-found" element={<div>404</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/not-found', {
      replace: true,
    });
  });

  it('Redirects to second page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/1?name=Rick']}>
          <Routes>
            <Route path="/:pageId" element={<HomePage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    await userEvent.click(screen.getByText('Page 2'));

    expect(mockNavigate).toHaveBeenCalledWith('/2');
    expect(window.location.search).toBe('');
  });
});
