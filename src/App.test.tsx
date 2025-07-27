import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('App Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  vi.mock('./components/Header/Header', () => ({
    default: ({
      onSearchSubmit,
      searchQuery,
    }: {
      onSearchSubmit: (searchTerm: string) => void;
      searchQuery: string;
    }) => (
      <div>
        search tearm: {searchQuery}
        <button
          data-testid="mock-header"
          onClick={() => onSearchSubmit('mock')}
        >
          Submit
        </button>
      </div>
    ),
  }));

  vi.mock('./components/CharacterList/CharacterList', () => ({
    default: ({ searchedTerm }: { searchedTerm: string }) => (
      <div data-testid="mock-main">{searchedTerm}</div>
    ),
  }));

  vi.mock('./components/Footer/Footer', () => ({
    default: () => <div data-testid="mock-footer" />,
  }));

  describe('Rendering Tests', () => {
    it('Renders all blocks', async () => {
      render(<App />);
      expect(screen.getByTestId('mock-header')).toBeInTheDocument();
      expect(screen.getByTestId('mock-main')).toBeInTheDocument();
      expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    });
  });

  describe('Integration tests', () => {
    it('Handles search term from localStorage on initial load', () => {
      localStorage.setItem('search', 'rick');
      render(<App />);
      expect(screen.getByTestId('mock-main')).toHaveTextContent('rick');
    });

    it('Updates Main state when Header triggers onSearchSubmit', async () => {
      render(<App />);
      const headerButton = screen.getByTestId('mock-header');
      await userEvent.click(headerButton);
      expect(screen.getByTestId('mock-main')).toHaveTextContent('mock');
    });
  });
});
