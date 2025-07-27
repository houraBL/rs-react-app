import CharacterCard from '../CharacterCard/CharacterCard';
import MainLoader from '../MainLoader/MainLoader';
import { fetchCharacters } from '../../api/api-client';
import type { CharacterInfo } from '../../types/character';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';

type CharacterListProps = {
  searchedTerm: string;
};
export default function CharacterList({ searchedTerm }: CharacterListProps) {
  const [characters, setCharacters] = useState<CharacterInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);
  const { page: pageParam } = useParams();
  const navigate = useNavigate();

  const page = Number(pageParam ?? '1');

  useEffect(() => {
    let isCancelled = false;

    const loadCharacters = async () => {
      setLoading(true);
      setError(null);
      try {
        const { results, totalPages } = await fetchCharacters(
          searchedTerm,
          page
        );

        if (
          !results ||
          !Array.isArray(results) ||
          typeof totalPages !== 'number'
        ) {
          throw new Error('Cannot retrieve characters');
        }

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
  }, [page, searchedTerm]);

  const handlePageChange = (newPage: number) => {
    navigate(`/${newPage}`);
    setSearchParams({ name: searchedTerm });
  };

  const containerClassName =
    'bg-blue-900 flex-grow flex flex-col items-center justify-center text-white text-xl';

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
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
