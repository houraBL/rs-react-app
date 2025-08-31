import { AVAILABLE_COLUMNS, LATEST_YEAR } from '@app/constants';
import type { TableColumn } from '@app/types';
import ControlsPanel from '@components/ControlsPanel';
import CountriesList from '@components/CountriesList';
import MainLoader from '@components/MainLoader';
import { Suspense, useState } from 'react';

export default function Main() {
  const [selectedColumns, setSelectedColumns] = useState<TableColumn[]>([
    AVAILABLE_COLUMNS[0],
    AVAILABLE_COLUMNS[1],
    AVAILABLE_COLUMNS[2],
  ]);
  const [selectedYear, setSelectedYear] = useState<number>(LATEST_YEAR);
  const [filterText, setFilterText] = useState('');
  const [sortKey, setSortKey] = useState<'name' | 'population'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  return (
    <div className="flex flex-col bg-blue-100 dark:bg-blue-700 p-6 m-4 rounded-3xl gap-4 justify-center items-center max-w-full">
      <h2 className="text-2lx font-bold">
        OMG look! You van see the CO₂ emission by country! Global warming duh
      </h2>
      <ControlsPanel
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        filterText={filterText}
        onFilterChange={setFilterText}
        selectedColumns={selectedColumns}
        onColumnsChange={setSelectedColumns}
        sortKey={sortKey}
        onSortKeyChange={setSortKey}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
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
