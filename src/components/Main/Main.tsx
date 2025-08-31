import { AVAILABLE_COLUMNS, LATEST_YEAR } from '@app/constants';
import type { TableColumn } from '@app/types';
import ControlsPanel from '@components/ControlsPanel';
import CountriesList from '@components/CountriesList';
import MainLoader from '@components/MainLoader';
import { Suspense, useCallback, useState } from 'react';

export default function Main() {
  const [selectedColumns, setSelectedColumns] = useState<TableColumn[]>(() => [
    AVAILABLE_COLUMNS[0],
    AVAILABLE_COLUMNS[1],
    AVAILABLE_COLUMNS[2],
  ]);
  const [selectedYear, setSelectedYear] = useState<number>(LATEST_YEAR);
  const [filterText, setFilterText] = useState('');
  const [sortKey, setSortKey] = useState<'name' | 'population'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleYearChange = useCallback((year: number) => {
    setSelectedYear(year);
  }, []);

  const handleFilterChange = useCallback((text: string) => {
    setFilterText(text);
  }, []);

  const handleColumnsChange = useCallback((cols: TableColumn[]) => {
    setSelectedColumns(cols);
  }, []);

  const handleSortKeyChange = useCallback((key: 'name' | 'population') => {
    setSortKey(key);
  }, []);

  const handleSortOrderChange = useCallback((order: 'asc' | 'desc') => {
    setSortOrder(order);
  }, []);

  return (
    <div className="flex flex-col bg-blue-100 dark:bg-blue-700 p-6 m-4 rounded-3xl gap-4 justify-center items-center max-w-full">
      <h2 className="text-2lx font-bold">
        OMG look! You van see the CO₂ emission by country! Global warming duh
      </h2>
      <ControlsPanel
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
        filterText={filterText}
        onFilterChange={handleFilterChange}
        selectedColumns={selectedColumns}
        onColumnsChange={handleColumnsChange}
        sortKey={sortKey}
        onSortKeyChange={handleSortKeyChange}
        sortOrder={sortOrder}
        onSortOrderChange={handleSortOrderChange}
      />
      <Suspense
        fallback={
          <div className="flex flex-col gap-4 justify-center items-center">
            <p>Loading CO₂ dataset...</p>
            <MainLoader />
          </div>
        }
      >
        <CountriesList
          selectedColumns={selectedColumns}
          selectedYear={selectedYear}
          filterText={filterText}
          sortKey={sortKey}
          sortOrder={sortOrder}
        />
      </Suspense>
    </div>
  );
}
