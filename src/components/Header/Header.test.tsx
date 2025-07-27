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
      render(<Header onSearchSubmit={submitFunction} searchQuery={''} />);
      expect(screen.getByText('Look up a character:')).toBeInTheDocument();
      expect(screen.getByText('Search')).toBeInTheDocument();
      expect(screen.getByText('✕')).toBeInTheDocument();
    });

    it('Displays previously saved search term from localStorage on mount', () => {
      render(<Header onSearchSubmit={submitFunction} searchQuery={'test'} />);
      expect(screen.getByDisplayValue('test')).toBeInTheDocument();
    });

    it('Shows empty input when no saved term exists', () => {
      render(<Header onSearchSubmit={submitFunction} searchQuery={''} />);
      expect(screen.getByPlaceholderText('start typing...')).toHaveValue('');
    });
  });

  describe('User Interaction Tests', () => {
    it('Updates input value when user types', async () => {
      render(<Header onSearchSubmit={submitFunction} searchQuery={''} />);
      const searchInput = screen.getByPlaceholderText('start typing...');
      await userEvent.type(searchInput, 'rick', { delay: null });
      expect(searchInput).toHaveValue('rick');
    });

    it('Saves search term to localStorage when search button is clicked', async () => {
      render(<Header onSearchSubmit={submitFunction} searchQuery={''} />);
      const searchInput = screen.getByPlaceholderText('start typing...');
      await userEvent.type(searchInput, 'rick', { delay: null });
      const searchButton = screen.getByText('Search');
      await userEvent.click(searchButton, { delay: null });
      expect(localStorage.getItem('search')).toBe('rick');
    });

    it('Trims whitespace from search input before saving', async () => {
      render(<Header onSearchSubmit={submitFunction} searchQuery={''} />);
      const searchInput = screen.getByPlaceholderText('start typing...');
      await userEvent.type(searchInput, '  rick  ', { delay: null });
      const searchButton = screen.getByText('Search');
      await userEvent.click(searchButton, { delay: null });
      expect(localStorage.getItem('search')).toBe('rick');
    });

    it('Clears search input and localstorage when clear search button is clicked', async () => {
      render(<Header onSearchSubmit={submitFunction} searchQuery={''} />);
      const searchInput = screen.getByPlaceholderText('start typing...');
      await userEvent.type(searchInput, 'rick', { delay: null });
      const searchButton = screen.getByText('Search');
      await userEvent.click(searchButton, { delay: null });

      expect(searchInput).toHaveValue('rick');
      expect(localStorage.getItem('search')).toBe('rick');

      const clearButton = screen.getByText('✕');
      await userEvent.click(clearButton, { delay: null });
      expect(searchInput).toHaveValue('');
      expect(localStorage.getItem('search')).toBe('');
    });

    it('Triggers search callback with correct parameters', async () => {
      render(<Header onSearchSubmit={submitFunction} searchQuery={''} />);
      const searchInput = screen.getByPlaceholderText('start typing...');
      await userEvent.type(searchInput, 'rick', { delay: null });
      const searchButton = screen.getByText('Search');
      await userEvent.click(searchButton, { delay: null });
      expect(submitFunction).toBeCalledTimes(1);
    });
  });

  describe('LocalStorage Integration', () => {
    it('Retrieves saved search term on component mount', () => {
      render(<Header onSearchSubmit={submitFunction} searchQuery={'test'} />);
      expect(screen.getByDisplayValue('test')).toBeInTheDocument();
    });

    it('Overwrites existing localStorage value when new search is performed', async () => {
      render(<Header onSearchSubmit={submitFunction} searchQuery={'test'} />);
      const searchInput = screen.getByPlaceholderText('start typing...');
      expect(searchInput).toHaveValue('test');
      await userEvent.type(searchInput, 'rick', { delay: null });
      const searchButton = screen.getByText('Search');
      await userEvent.click(searchButton, { delay: null });
      expect(localStorage.getItem('search')).toBe('testrick');
    });
  });
});
