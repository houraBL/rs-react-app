import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from './HomePage';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { Mock } from 'vitest';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

type SearchProps = {
  onSearchSubmit: (searchTerm: string) => void;
  searchQuery: string;
};

vi.mock('../../components/Search/Search', () => ({
  default: ({ onSearchSubmit, searchQuery }: SearchProps) => (
    <div>
      <p>Mock Search Component</p>
      <p>searchQuery: {searchQuery}</p>
      <button onClick={() => onSearchSubmit('123')} />
    </div>
  ),
}));

vi.mock('../../components/CharacterList/CharacterList', () => ({
  default: ({ searchedTerm }: { searchedTerm: string }) => (
    <div>Mock CharacterList with searchedTerm: {searchedTerm}</div>
  ),
}));

vi.mock('../../components/Pagination/Pagination', () => ({
  default: ({ onPageChange }: { onPageChange: (n: number) => void }) => (
    <button onClick={() => onPageChange(2)}>Page 2</button>
  ),
}));

vi.mock('../../hooks/useLocalStorage');

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

describe('HomePage', () => {
  const mockNavigate = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
    (useLocalStorage as Mock).mockReturnValue(['rick', vi.fn()]);
    (useNavigate as Mock).mockReturnValue(mockNavigate);
  });
  it('renders Search and CharacterList with correct props', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText('Mock Search Component')).toBeInTheDocument();
    expect(screen.getByText(/searchQuery: rick/i)).toBeInTheDocument();
    expect(
      screen.getByText(/mock characterlist with searchedterm: rick/i)
    ).toBeInTheDocument();
  });

  it('Redirects to /not-found if pageId is not a number', () => {
    render(
      <MemoryRouter initialEntries={['/abc']}>
        <Routes>
          <Route path="/:pageId" element={<HomePage />} />
          <Route path="/not-found" element={<div>404</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/not-found', {
      replace: true,
    });
  });

  it('Redirects to second page', async () => {
    render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path="/:pageId" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );
    await userEvent.click(screen.getByText('Page 2'));

    expect(mockNavigate).toHaveBeenCalledWith('/2');
  });
});
