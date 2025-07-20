import Main from './Main';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Main', () => {
  vi.mock('../../api/api-client');
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering Tests', () => {
    it('Renders correct number of items when data is provided', async () => {
      render(<Main searchedTerm="" />);
      const cards = await screen.findAllByTestId('character-card');
      expect(cards).toHaveLength(3);
    });

    it('Displays "no results" message when data array is empty', async () => {
      const { fetchCharacters } = await import('../../api/api-client');
      const mockedFetchCharacters = vi.mocked(fetchCharacters);

      mockedFetchCharacters.mockImplementationOnce(
        () => new Promise((resolve) => setTimeout(() => resolve([]), 0))
      );
      render(<Main searchedTerm="" />);
      const emptyCharactersMessage = await screen.findByText(
        'No characters found.'
      );
      expect(emptyCharactersMessage).toBeInTheDocument();
    });

    it('Shows loading state while fetching data', async () => {
      const { fetchCharacters } = await import('../../api/api-client');
      const mockedFetchCharacters = vi.mocked(fetchCharacters);

      mockedFetchCharacters.mockImplementationOnce(
        () => new Promise((resolve) => setTimeout(() => resolve([]), 300))
      );
      render(<Main searchedTerm="" />);
      expect(screen.getByTestId('main-loader')).toBeInTheDocument();
    });
  });

  describe('Data Display Tests', () => {
    it('Correctly displays item names and descriptions', async () => {
      render(<Main searchedTerm="" />);
      expect(await screen.findByText('Test Name 1')).toBeInTheDocument();
      expect(await screen.findByText('Test Name 2')).toBeInTheDocument();
      expect(await screen.findByText('Test Name 3')).toBeInTheDocument();
    });

    it('Handles missing or undefined data gracefully', async () => {
      const { fetchCharacters } = await import('../../api/api-client');
      const mockedFetchCharacters = vi.mocked(fetchCharacters);

      mockedFetchCharacters.mockImplementationOnce(
        () =>
          new Promise((resolve) => setTimeout(() => resolve(undefined), 300))
      );
      render(<Main searchedTerm="" />);

      expect(
        await screen.findByText('Cannot retrieve characters.')
      ).toBeInTheDocument();
    });
  });

  describe('Error Handling Tests', () => {
    it('Displays error message when API call fails', async () => {
      const { fetchCharacters } = await import('../../api/api-client');
      const mockedFetchCharacters = vi.mocked(fetchCharacters);

      mockedFetchCharacters.mockRejectedValueOnce(new Error('Failed to fetch'));
      render(<Main searchedTerm="" />);
      const errorMessage = await screen.findByText('Error: Failed to fetch');
      expect(errorMessage).toBeInTheDocument();
    });

    it('Displays error message when API call fails', async () => {
      const { fetchCharacters } = await import('../../api/api-client');
      const mockedFetchCharacters = vi.mocked(fetchCharacters);

      mockedFetchCharacters.mockResolvedValueOnce([]);
      const { rerender } = render(<Main searchedTerm="rick" />);
      expect(mockedFetchCharacters).toBeCalledTimes(1);
      rerender(<Main searchedTerm="morty" />);
      expect(mockedFetchCharacters).toBeCalledTimes(2);
    });

    it('Displays unknown error message when non-error was thrown', async () => {
      const { fetchCharacters } = await import('../../api/api-client');
      const mockedFetchCharacters = vi.mocked(fetchCharacters);

      mockedFetchCharacters.mockRejectedValueOnce('123');
      render(<Main searchedTerm="rick" />);
      const errorMessage = await screen.findByText(
        'Error: Unknown error occurred'
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
