import { ALWAYS_SHOW_COLUMNS } from '@app/constants';
import type { TableColumn } from '@app/types';
import TableBody from '@components/TableBody';
import TableHeader from '@components/TableHeader';
import useCO2Data from '@hooks/useCO2Data';

export default function CountriesList({
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

  const normalizedFilter = filterText.toLowerCase();

  const filteredCountries = Object.entries(data).filter(([countryName]) =>
    countryName.toLowerCase().includes(normalizedFilter)
  );

  return (
    <div className="max-w-full w-full overflow-x-auto">
      <table className="table-auto border-collapse text-sm sm:text-lg overflow-auto m-auto">
        <TableHeader
          selectedColumns={[...ALWAYS_SHOW_COLUMNS, ...selectedColumns]}
        />

        <TableBody
          selectedColumns={selectedColumns}
          data={Object.fromEntries(filteredCountries)}
          selectedYear={selectedYear}
          sortKey={sortKey}
          sortOrder={sortOrder}
        />
      </table>
    </div>
  );
}
