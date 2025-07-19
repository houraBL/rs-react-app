import Header from './Header';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

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
    it('Updates input value when user types', async () => {
      render(<Header onSearchSubmit={submitFunction} />);
      const searchInput = screen.getByPlaceholderText('start typing...');
      await userEvent.type(searchInput, 'rick');
      expect(searchInput).toHaveValue('rick');
    });

    it('Saves search term to localStorage when search button is clicked', async () => {
      render(<Header onSearchSubmit={submitFunction} />);
      const searchInput = screen.getByPlaceholderText('start typing...');
      await userEvent.type(searchInput, 'rick');
      const searchButton = screen.getByText('Search');
      await userEvent.click(searchButton);
      expect(localStorage.getItem('search')).toBe('rick');
    });

    it('Does not trim whitespace from search input before saving', async () => {
      render(<Header onSearchSubmit={submitFunction} />);
      const searchInput = screen.getByPlaceholderText('start typing...');
      await userEvent.type(searchInput, '  rick  ');
      const searchButton = screen.getByText('Search');
      await userEvent.click(searchButton);
      expect(localStorage.getItem('search')).toBe('  rick  ');
    });

    it('Clears search input and localstorage when clear search button is clicked', async () => {
      render(<Header onSearchSubmit={submitFunction} />);
      const searchInput = screen.getByPlaceholderText('start typing...');
      await userEvent.type(searchInput, 'rick');
      const searchButton = screen.getByText('Search');
      await userEvent.click(searchButton);

      expect(searchInput).toHaveValue('rick');
      expect(localStorage.getItem('search')).toBe('rick');

      const clearButton = screen.getByText('✕');
      await userEvent.click(clearButton);
      expect(searchInput).toHaveValue('');
      expect(localStorage.getItem('search')).toBe('');
    });

    it('Triggers search callback with correct parameters', async () => {
      render(<Header onSearchSubmit={submitFunction} />);
      const searchInput = screen.getByPlaceholderText('start typing...');
      await userEvent.type(searchInput, 'rick');
      const searchButton = screen.getByText('Search');
      await userEvent.click(searchButton);
      expect(submitFunction).toBeCalledTimes(1);
    });
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
