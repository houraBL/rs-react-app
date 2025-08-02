import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useNavigate, MemoryRouter, Routes, Route } from 'react-router-dom';
import Search from './Search';
import { type Mock } from 'vitest';
import '@testing-library/jest-dom';

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

describe('Search', () => {
  const submitFunction = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useNavigate as Mock).mockReturnValue(mockNavigate);
  });

  describe('Search Component Tests', () => {
    it('Renders with initial searchQuery', () => {
      render(
        <MemoryRouter>
          <Search onSearchSubmit={submitFunction} searchQuery="rick" />
        </MemoryRouter>
      );
      expect(screen.getByDisplayValue('rick')).toBeInTheDocument();
    });

    it('Shows empty input when no searchQuery exists', async () => {
      render(
        <MemoryRouter>
          <Search onSearchSubmit={submitFunction} searchQuery="" />
        </MemoryRouter>
      );
      expect(await screen.getByPlaceholderText('start typing...')).toHaveValue(
        ''
      );
    });

    it('Gets name value from the url', async () => {
      render(
        <MemoryRouter initialEntries={['/?name=Rick']}>
          <Routes>
            <Route
              path="/"
              element={
                <Search searchQuery="" onSearchSubmit={submitFunction} />
              }
            />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(async () => {
        const input = await screen.findByRole('textbox');
        expect(input).toHaveValue('Rick');
      });
    });
  });

  describe('User Interaction Tests', () => {
    it('Updates input value when user types', async () => {
      render(
        <MemoryRouter>
          <Search onSearchSubmit={submitFunction} searchQuery="" />
        </MemoryRouter>
      );
      const input = screen.getByPlaceholderText('start typing...');
      await userEvent.type(input, 'rick');
      expect(input).toHaveValue('rick');
    });

    it('Calls onSearchSubmit with trimmed input on submit', async () => {
      render(
        <MemoryRouter>
          <Search onSearchSubmit={submitFunction} searchQuery="" />
        </MemoryRouter>
      );
      const input = screen.getByPlaceholderText('start typing...');
      const button = screen.getByText('Search');

      await userEvent.type(input, '  morty  ');
      await userEvent.click(button);

      //expect(mockSetSearchParams).toHaveBeenCalledWith({});
      expect(mockNavigate).toHaveBeenCalledWith('/1');
      expect(submitFunction).toHaveBeenCalledWith('morty');
    });

    it('Clears search input when ✕ is clicked', async () => {
      render(
        <MemoryRouter>
          <Search onSearchSubmit={submitFunction} searchQuery="rick" />
        </MemoryRouter>
      );
      const clearButton = screen.getByRole('button', { name: /clear search/i });

      await userEvent.click(clearButton);
      expect(screen.getByPlaceholderText('start typing...')).toHaveValue('');
      expect(submitFunction).toHaveBeenCalledWith('');
    });

    it('Triggers search callback with correct parameters', async () => {
      render(
        <MemoryRouter>
          <Search onSearchSubmit={submitFunction} searchQuery="" />
        </MemoryRouter>
      );
      const input = screen.getByPlaceholderText('start typing...');
      const button = screen.getByText('Search');
      await userEvent.type(input, 'rick');
      await userEvent.click(button);
      expect(submitFunction).toHaveBeenCalledWith('rick');
    });
  });
});
