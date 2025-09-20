import { useGetCharactersByNameQuery } from '@api/rickAndMorty';
import CharacterCard from '@components/CharacterCard';
import MainLoader from '@components/MainLoader';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type CharacterListProps = {
  searchedTerm: string;
  setTotalPages: (n: number) => void;
};
export default function CharacterList({
  searchedTerm,
  setTotalPages,
}: CharacterListProps) {
  const { pageId } = useParams();
  const navigate = useNavigate();

  const page = Number(pageId ?? '1');
  useEffect(() => {
    if (Number.isNaN(page) || typeof page !== 'number') {
      navigate('/not-found', { replace: true });
    }
  }, [page, navigate]);

  const { data, error, isLoading, isFetching, refetch } =
    useGetCharactersByNameQuery({
      name: searchedTerm,
      page: page,
    });

  useEffect(() => {
    if (data) {
      setTotalPages(data.info.pages);
    }
  }, [data, setTotalPages]);

  const containerClassName =
    'flex flex-wrap flex-row gap-2 sm:gap-6 p-2 py-4 items-center justify-center mx-auto';

  if (isLoading || isFetching)
    return (
      <div className="flex-grow flex items-center justify-center">
        <MainLoader />
      </div>
    );

  if (error) {
    const messages: Record<number, string> = {
      404: 'There is nothing here',
      500: 'Could not load your favorite characters',
    };
    let message = 'Unknown error occurred';
    const { status } = error as { status: number; data: unknown };

    if (status === 404) {
      setTotalPages(0);
    }

    message = messages[status] ?? message;

    return <div className={containerClassName}>Error: {message}</div>;
  }

  if (data?.results.length === 0) {
    return <div className={containerClassName}>Error: No characters found</div>;
  }

  return (
    <div
      className="flex flex-wrap flex-row gap-2 sm:gap-6 p-2 py-4 items-center justify-center "
      aria-label="characters-cards-container"
    >
      {data &&
        data.results.map((characterInfo) => (
          <CharacterCard key={characterInfo.id} characterInfo={characterInfo} />
        ))}
      <button
        className="px-4 rounded-full h-10 border-2 border-white bg-cyan-400 dark:bg-cyan-600 hover:cursor-pointer text-lg font-bold fixed z-50 bottom-16 right-4"
        onClick={() => refetch()}
      >
        force new API call
      </button>
    </div>
  );
}
