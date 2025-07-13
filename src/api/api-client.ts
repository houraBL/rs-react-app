export async function fetchCharacters(searchTerm?: string) {
  try {
    const searchParams = searchTerm?.trim()
      ? `/?name=${searchTerm.trim()}`
      : '';
    const request = await fetch(
      `https://rickandmortyapi.com/api/character${searchParams}`
    );
    if (!request.ok) {
      if (request.status === 404) return [];
      throw new Error('Could not load your favorite characters');
    }
    const parsed = await request.json();
    return parsed.results;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(message);
  }
}
