import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from './HomePage';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { Mock } from 'vitest';

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

vi.mock('../../hooks/useLocalStorage');

beforeEach(() => {
  (useLocalStorage as Mock).mockReturnValue(['rick', vi.fn()]);
});

describe('HomePage', () => {
  it('renders Search and CharacterList with correct props', () => {
    render(<HomePage />);

    expect(screen.getByText('Mock Search Component')).toBeInTheDocument();
    expect(screen.getByText(/searchQuery: rick/i)).toBeInTheDocument();
    expect(
      screen.getByText(/mock characterlist with searchedterm: rick/i)
    ).toBeInTheDocument();
  });
});
