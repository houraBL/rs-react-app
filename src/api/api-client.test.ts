import { fetchCharacters } from './api-client';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';

describe('API Integration Tests', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('Calls API with correct parameters', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: [] }),
    });
    globalThis.fetch = mockFetch;

    await fetchCharacters();
    expect(mockFetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character'
    );
  });

  it('Accepts search term and makes appropriate API call', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: [] }),
    });
    globalThis.fetch = mockFetch;

    await fetchCharacters('rick');
    expect(mockFetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/?name=rick'
    );
  });

  it('Handles successful API responses', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: [{ test: 123 }] }),
    });
    globalThis.fetch = mockFetch;
    const result = await fetchCharacters();
    expect(result).toEqual([{ test: 123 }]);
  });

  it('Returns empty array when status is 404', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });
    globalThis.fetch = mockFetch;

    const result = await fetchCharacters();
    expect(result).toEqual([]);
  });

  it('Handles API error responses', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });
    globalThis.fetch = mockFetch;

    await expect(fetchCharacters()).rejects.toThrow(
      'Could not load your favorite characters'
    );
  });

  it('Handles API response if returned value is nullable', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(null),
    });
    globalThis.fetch = mockFetch;

    await expect(fetchCharacters()).rejects.toThrow(
      'Cannot retrieve characters'
    );
  });

  it('Handles API response if returned value is not array', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve('123'),
    });
    globalThis.fetch = mockFetch;

    await expect(fetchCharacters()).rejects.toThrow(
      'Cannot retrieve characters'
    );
  });

  it('Handles if non error was thrown', async () => {
    const mockFetch = vi.fn().mockRejectedValueOnce('123');
    globalThis.fetch = mockFetch;

    await expect(fetchCharacters()).rejects.toThrow('Unknown error occurred');
  });
});
