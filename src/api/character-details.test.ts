import { beforeEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { fetchCharacterDetails } from './character-details';

describe('Character Details API Integration Tests', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('Calls API with correct parameter', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ result: '123' }),
    });
    globalThis.fetch = mockFetch;

    await fetchCharacterDetails('1');
    expect(mockFetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/1'
    );
  });

  it('Handles successful API responses', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve('123'),
    });
    globalThis.fetch = mockFetch;
    const result = await fetchCharacterDetails('1');
    expect(result).toEqual({
      result: '123',
    });
  });

  it('Returns null when status is 404', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });
    globalThis.fetch = mockFetch;

    const result = await fetchCharacterDetails('1');
    expect(result).toEqual({
      result: null,
    });
  });

  it('Handles API error responses', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });
    globalThis.fetch = mockFetch;

    await expect(fetchCharacterDetails('1')).rejects.toThrow(
      'Could not load your favorite character'
    );
  });

  it('Handles API unknown error responses', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 600,
    });
    globalThis.fetch = mockFetch;

    await expect(fetchCharacterDetails('1')).rejects.toThrow(
      'Could not load your favorite character'
    );
  });

  it('Handles API response if returned value is nullable', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(null),
    });
    globalThis.fetch = mockFetch;

    await expect(fetchCharacterDetails('1')).rejects.toThrow(
      'Cannot retrieve character'
    );
  });

  it('Handles if non error was thrown', async () => {
    const mockFetch = vi.fn().mockRejectedValueOnce('123');
    globalThis.fetch = mockFetch;

    await expect(fetchCharacterDetails('1')).rejects.toThrow(
      'Unknown error occurred'
    );
  });
});
