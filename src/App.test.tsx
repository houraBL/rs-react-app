import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import type { ReactNode } from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('App Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  vi.mock('./components/Header/Header', () => ({
    default: ({
      onSearchSubmit,
    }: {
      onSearchSubmit: (searchTerm: string) => void;
    }) => (
      <button data-testid="mock-header" onClick={() => onSearchSubmit('mock')}>
        Submit
      </button>
    ),
  }));

  vi.mock('./components/Main/Main', () => ({
    default: ({ searchedTerm }: { searchedTerm: string }) => (
      <div data-testid="mock-main">{searchedTerm}</div>
    ),
  }));

  vi.mock('./components/Footer/Footer', () => ({
    default: () => <div data-testid="mock-footer" />,
  }));

  vi.mock('./components/ErrorButton/ErrorButton', () => ({
    default: () => <div data-testid="mock-error-button" />,
  }));

  vi.mock('./components/ErrorBoundary/ErrorBoundary', () => ({
    default: ({ children }: { children: ReactNode }) => (
      <div data-testid="mock-boundary">{children}</div>
    ),
  }));

  describe('Rendering Tests', () => {
    it('Renders all blocks', async () => {
      render(<App />);
      expect(screen.getByTestId('mock-header')).toBeInTheDocument();
      expect(screen.getByTestId('mock-main')).toBeInTheDocument();
      expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
      expect(screen.getByTestId('mock-error-button')).toBeInTheDocument();
      expect(screen.getByTestId('mock-boundary')).toBeInTheDocument();
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
