import CharacterCard from '../CharacterCard/CharacterCard';
import MainLoader from '../MainLoader/MainLoader';
import { fetchCharacters } from '../../api/api-client';
import type { CharacterInfo } from '../../types/character';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type CharacterListProps = {
  searchedTerm: string;
  setTotalPages: (n: number) => void;
};
export default function CharacterList({
  searchedTerm,
  setTotalPages,
}: CharacterListProps) {
  const [characters, setCharacters] = useState<CharacterInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { pageId } = useParams();
  const navigate = useNavigate();

  const page = Number(pageId ?? '1');

  useEffect(() => {
    let isCancelled = false;

    const loadCharacters = async () => {
      setLoading(true);
      setError(null);
      try {
        if (Number.isNaN(page) || typeof page !== 'number') {
          navigate('/not-found', { replace: true });
          return;
        }
        const { results, totalPages } = await fetchCharacters(
          searchedTerm,
          page
        );

        if (!isCancelled) {
          setCharacters(results);
          setTotalPages(totalPages);
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
  }, [navigate, page, searchedTerm, setTotalPages]);

  const containerClassName =
    'flex flex-wrap flex-row gap-2 sm:gap-6 p-2 py-4 items-center justify-center mx-auto';

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
    return <div className={containerClassName}>Error: No characters found</div>;
  }

  return (
    <div
      className="flex flex-wrap flex-row gap-2 sm:gap-6 p-2 py-4 items-center justify-center "
      aria-label="characters-cards-container"
    >
      {characters &&
        characters.map((characterInfo) => (
          <CharacterCard key={characterInfo.id} characterInfo={characterInfo} />
        ))}
    </div>
  );
}
