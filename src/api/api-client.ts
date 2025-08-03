import type { CharacterInfo } from '../types/character';

export async function fetchCharacters(
  searchTerm?: string,
  page = 1
): Promise<{ results: CharacterInfo[]; totalPages: number }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const params = new URLSearchParams();
    if (searchTerm?.trim()) {
      params.set('name', searchTerm.trim());
    } else {
      params.delete('name');
    }

    params.set('page', page.toString());
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?${params.toString()}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('No characters found');
      }
      if (response.status === 500)
        throw new Error('Could not load your favorite characters');
      throw new Error('Could not load your favorite characters');
    }

    const parsed = await response.json();

    if (!parsed || !Array.isArray(parsed.results)) {
      throw new Error('Cannot retrieve characters');
    }

    return {
      results: parsed.results,
      totalPages: parsed.info.pages,
    };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(message);
  }
}
