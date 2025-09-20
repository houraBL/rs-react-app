'use client';

import { useGetCharactersByNameQuery } from '@api/rickAndMorty';
import CharacterCard from '@components/CharacterCard';
import MainLoader from '@components/MainLoader';
import { notFound, useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

type CharacterListProps = {
  searchedTerm: string;
  setTotalPages: (n: number) => void;
};
export default function CharacterList({
  searchedTerm,
  setTotalPages,
}: CharacterListProps) {
  const params = useParams();
  const router = useRouter();
  const pageId = params?.pageId as string | undefined;
  const page = Number(pageId ?? '1');

  useEffect(() => {
    if (Number.isNaN(page) || typeof page !== 'number' || page < 1) {
      notFound();
    }
  }, [page, router]);

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
      notFound();
    }

    message = messages[status] ?? message;

    return <div className={containerClassName}>Error: {message}</div>;
  }

  if (data?.results.length === 0) {
    return <div className={containerClassName}>Error: No characters found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="flex flex-wrap flex-row gap-2 sm:gap-6 p-2 py-4 items-center justify-center "
        aria-label="characters-cards-container"
      >
        {data &&
          data.results.map((characterInfo) => (
            <CharacterCard
              key={characterInfo.id}
              characterInfo={characterInfo}
            />
          ))}
      </div>
      <button
        className="px-4 rounded-full h-10 w-fit border-2 border-white bg-cyan-400 dark:bg-cyan-600 hover:cursor-pointer text-lg font-bold"
        onClick={() => refetch()}
      >
        force new API call
      </button>
    </div>
  );
}
