'use client';

import { useGetCharacterByIdQuery } from '@api/rickAndMorty';
import MainLoader from '@components/MainLoader';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

export default function DetailsPanel({
  detailsId,
  pageId,
}: {
  detailsId: string;
  pageId: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data, error, isLoading, isFetching, refetch } =
    useGetCharacterByIdQuery(detailsId?.toString() || '1');

  const getBaseUrl = useCallback(() => {
    const params = searchParams?.toString();
    return params ? `/${pageId}?${params}` : `/${pageId}`;
  }, [pageId, searchParams]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      const clickedOutsidePanel =
        panelRef.current && !panelRef.current.contains(target);
      const clickedCard = target.closest('[role="character-card"]');
      const clickedCheckbox = target.closest('[role="selection-checkbox"]');
      const clickedPagination = target.closest('[data-role="pagination"]');
      if (clickedPagination) {
        return;
      }

      if ((clickedOutsidePanel && !clickedCard) || clickedCheckbox) {
        router.replace(getBaseUrl());
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [getBaseUrl, pageId, router]);

  const detailsClassName =
    'relative sticky top-20 my-4 mx-2 sm:mx-6 p-4 px-4 sm:px-6 h-fit bg-blue-100 dark:bg-blue-600 rounded-3xl flex flex-col gap-2 min-w-40 w-60 sm:min-w-60';

  if (!detailsId) return null;
  if (isLoading || isFetching)
    return (
      <div
        className={detailsClassName + ' items-center justify-center'}
        ref={panelRef}
      >
        <MainLoader color="bg-blue-400 dark:bg-white" />
      </div>
    );

  if (error) {
    const messages: Record<number, string> = {
      404: 'Character not found',
      500: 'Could not load your favorite character',
    };
    let message = 'Unknown error occurred';

    const { status } = error as { status: number; data: unknown };
    message = messages[status] ?? message;

    return (
      <div className={detailsClassName} ref={panelRef}>
        Error: {message}
      </div>
    );
  }

  if (!data)
    return (
      <div className={detailsClassName} ref={panelRef}>
        Error: Unknown error occurred
      </div>
    );

  return (
    <div className={detailsClassName} ref={panelRef}>
      <button
        type="button"
        onClick={() => router.replace(getBaseUrl())}
        className={
          'w-6 h-6 flex items-center justify-center text-lg font-bold cursor-pointer rounded-full absolute -right-1.5 -top-1.5 ' +
          'text-white bg-blue-400 hover:bg-blue-500 dark:text-blue-900 dark:bg-blue-400 dark:hover:bg-blue-500'
        }
        aria-label="Close details"
      >
        ✕
      </button>
      <h2 className="text-sm sm:text-xl font-bold">{data.name}</h2>
      <img src={data.image} className="rounded-3xl" alt={data.name} />
      <p className="text-sm sm:text-lg">Status: {data.status}</p>
      <p className="text-sm sm:text-lg">Species: {data.species}</p>
      <p className="text-sm sm:text-lg">Gender: {data.gender}</p>
      <p className="text-sm sm:text-lg">Origin: {data.origin?.name}</p>
      <button
        className="px-4 rounded-full h-10 border-2 border-white bg-cyan-400 dark:bg-cyan-600 hover:cursor-pointer text-lg font-bold z-50"
        onClick={() => refetch()}
      >
        refetch details
      </button>
    </div>
  );
}
