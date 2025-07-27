import CharacterCard from '../CharacterCard/CharacterCard';
import MainLoader from '../MainLoader/MainLoader';
import { fetchCharacters } from '../../api/api-client';
import type { CharacterInfo } from '../../types/character';
import { useEffect, useState } from 'react';

export default function CharacterList({
  searchedTerm,
}: {
  searchedTerm: string;
}) {
  const [characters, setCharacters] = useState<CharacterInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const loadCharacters = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCharacters(searchedTerm);
        if (!isCancelled) {
          setCharacters(data);
        }
      } catch (err: unknown) {
        if (!isCancelled) {
          const message =
            err instanceof Error ? err.message : 'Unknown error occurred';
          setError(message);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    loadCharacters();

    return () => {
      isCancelled = true;
    };
  }, [searchedTerm]);

  const containerClassName =
    'bg-blue-900 flex-grow flex items-center justify-center text-white text-xl';

  if (loading)
    return (
      <div className="bg-blue-900 flex-grow flex items-center justify-center">
        <MainLoader />
      </div>
    );

  if (error) {
    return <div className={containerClassName}>Error: {error}</div>;
  }

  if (characters.length === 0) {
    return <div className={containerClassName}>No characters found.</div>;
  }

  return (
    <div className={containerClassName}>
      <div
        className="flex flex-wrap gap-6 p-2 py-4 items-center justify-center"
        aria-label="characters-cards-container"
      >
        {characters &&
          characters.map((characterInfo) => (
            <CharacterCard
              key={characterInfo.id}
              characterInfo={characterInfo}
            />
          ))}
      </div>
    </div>
  );
}
