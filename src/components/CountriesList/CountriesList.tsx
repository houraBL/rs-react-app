import { ALWAYS_SHOW_COLUMNS } from '@app/constants';
import type { TableColumn } from '@app/types';
import TableBody from '@components/TableBody';
import TableHeader from '@components/TableHeader';
import useCO2Data from '@hooks/useCO2Data';
import { memo } from 'react';
import { useMemo } from 'react';

function CountriesList({
  selectedColumns,
  selectedYear,
  filterText,
  sortKey,
  sortOrder,
}: {
  selectedColumns: TableColumn[];
  selectedYear: number;
  filterText: string;
  sortKey: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
}) {
  const data = useCO2Data();

  const filteredAndSortedCountries = useMemo(() => {
    let list = Object.entries(data);

    if (filterText) {
      const lowercased = filterText.toLowerCase();
      list = list.filter(([name]) => name.toLowerCase().includes(lowercased));
    }

    list.sort(([aName, aData], [bName, bData]) => {
      if (sortKey === 'name') {
        return sortOrder === 'asc'
          ? aName.localeCompare(bName)
          : bName.localeCompare(aName);
      } else {
        const aPop =
          aData.data.find((d) => d.year === selectedYear)?.population ?? 0;
        const bPop =
          bData.data.find((d) => d.year === selectedYear)?.population ?? 0;
        return sortOrder === 'asc' ? aPop - bPop : bPop - aPop;
      }
    });
    return list;
  }, [data, filterText, sortKey, sortOrder, selectedYear]);

  const filteredCountriesObject = useMemo(
    () => Object.fromEntries(filteredAndSortedCountries),
    [filteredAndSortedCountries]
  );

  const headerColumns = useMemo(
    () => [...ALWAYS_SHOW_COLUMNS, ...selectedColumns],
    [selectedColumns]
  );

  return (
    <div className="max-w-full w-full overflow-x-auto">
      <table className="table-auto border-collapse text-sm sm:text-lg overflow-auto m-auto">
        <TableHeader selectedColumns={headerColumns} />

        <TableBody
          selectedColumns={selectedColumns}
          data={filteredCountriesObject}
          selectedYear={selectedYear}
        />
      </table>
    </div>
  );
}

export default memo(CountriesList);
