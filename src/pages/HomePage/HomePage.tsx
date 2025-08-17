'use client';

import DetailsPanel from '@/components/DetailsPanel';
import CharacterList from '@components/CharacterList';
import FlyoutDownload from '@components/FlyoutDownload';
import Pagination from '@components/Pagination';
import Search from '@components/Search';
import useLocalStorage from '@hooks/useLocalStorage';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HomePage({
  pageId,
  detailsId,
}: {
  pageId: string;
  detailsId?: string;
}) {
  const [localSearchTerm, setLocalSearchTerm] = useLocalStorage('search', '');
  const router = useRouter();
  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams();

  const page = Number(pageId ?? '1');
  useEffect(() => {
    if (Number.isNaN(page) || typeof page !== 'number' || page < 1) {
      notFound();
    }
  }, [page, pageId, router]);

  const querySearchTerm = searchParams?.get('name') ?? localSearchTerm;

  useEffect(() => {
    if (querySearchTerm !== localSearchTerm) {
      setLocalSearchTerm(querySearchTerm);
    }
  }, [querySearchTerm, localSearchTerm, setLocalSearchTerm]);

  const buildUrl = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    if (localSearchTerm.trim() !== '') {
      params.set('name', localSearchTerm);
    } else {
      params.delete('name');
    }
    return params.toString() ? `/${page}?${params.toString()}` : `/${page}`;
  };

  const handlePageChange = (newPage: number) => {
    router.replace(buildUrl(newPage));
  };

  return (
    <div className="h-full min-h-[400px] flex flex-col relative w-full">
      <Search
        onSearchSubmit={setLocalSearchTerm}
        searchQuery={localSearchTerm}
      />
      <div className="flex flex-grow justify-between">
        <CharacterList
          searchedTerm={querySearchTerm}
          setTotalPages={setTotalPages}
        />
        {detailsId && <DetailsPanel detailsId={detailsId} pageId={pageId} />}
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <FlyoutDownload />
    </div>
  );
}
