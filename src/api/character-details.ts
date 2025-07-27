export async function fetchCharacterDetails(characterID: string) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${characterID.trim()}`
    );

    if (!response.ok) {
      if (response.status === 404) return { result: null };
      if (response.status === 500)
        throw new Error('Could not load your favorite character');
      throw new Error('Could not load your favorite character');
    }

    const parsed = await response.json();

    if (!parsed) {
      throw new Error('Cannot retrieve character');
    }
    return {
      result: parsed,
    };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(message);
  }
}
