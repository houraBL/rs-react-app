import { LATEST_YEAR } from '@app/constants';
import type { CO2Dataset, SortKey, SortOrder, TableColumn } from '@app/types';
import TableRow from '@components/TableRow';

export default function TableBody({
  selectedColumns,
  data,
  selectedYear = LATEST_YEAR,
  sortKey = 'name',
  sortOrder = 'asc',
}: {
  selectedColumns: TableColumn[];
  data: CO2Dataset;
  selectedYear?: number;
  sortKey?: SortKey;
  sortOrder?: SortOrder;
}) {
  const countries = Object.entries(data);
  const sortedCountries = [...countries].sort(
    ([nameA, dataA], [nameB, dataB]) => {
      if (sortKey === 'name') {
        return sortOrder === 'asc'
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      }

      if (sortKey === 'population') {
        const yearDataA = dataA.data.find((d) => d.year === selectedYear);
        const yearDataB = dataB.data.find((d) => d.year === selectedYear);

        const popA = yearDataA?.population ?? 0;
        const popB = yearDataB?.population ?? 0;

        return sortOrder === 'asc' ? popA - popB : popB - popA;
      }

      return 0;
    }
  );
  return (
    <tbody>
      {sortedCountries.map(([countryName, countryData]) => {
        const yearData = countryData.data.find((d) => d.year === selectedYear);
        return (
          <TableRow
            key={countryName}
            countryName={countryName}
            isoCode={countryData.iso_code || undefined}
            yearData={yearData}
            selectedColumns={selectedColumns}
          />
        );
      })}
    </tbody>
  );
}
