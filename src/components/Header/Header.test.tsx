import Header from './Header';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Header', () => {
  const submitFunction = vi.fn();
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('Search Component Tests', () => {
    it('Renders search input and search button', () => {
      render(<Header onSearchSubmit={submitFunction} />);
      expect(screen.getByText('Look up a character:')).toBeInTheDocument();
      expect(screen.getByText('Search')).toBeInTheDocument();
      expect(screen.getByText('✕')).toBeInTheDocument();
    });

    it('Displays previously saved search term from localStorage on mount', () => {
      localStorage.setItem('search', 'test');
      render(<Header onSearchSubmit={submitFunction} />);
      expect(screen.getByDisplayValue('test')).toBeInTheDocument();
    });

    it('Shows empty input when no saved term exists', () => {
      render(<Header onSearchSubmit={submitFunction} />);
      expect(screen.getByPlaceholderText('start typing...')).toHaveValue('');
    });
  });

  describe('User Interaction Tests', () => {
    it('Updates input value when user types', async () => {});

    it('Saves search term to localStorage when search button is clicked', async () => {});

    it('Trims whitespace from search input before saving', async () => {});

    it('Clears search input and localstorage when clear search button is clicked', async () => {});

    it('Triggers search callback with correct parameters', async () => {});
  });

  describe('LocalStorage Integration', () => {
    it('Retrieves saved search term on component mount', () => {});

    it('Overwrites existing localStorage value when new search is performed', () => {});
  });
});

/*
  describe('testBlock', () => {
    it('testName', () => {});
  });
*/
