import { LATEST_YEAR } from '@app/constants';
import type { CO2Dataset, TableColumn } from '@app/types';
import TableRow from '@components/TableRow';
import { memo, useMemo } from 'react';

function TableBody({
  selectedColumns,
  data,
  selectedYear = LATEST_YEAR,
}: {
  selectedColumns: TableColumn[];
  data: CO2Dataset;
  selectedYear?: number;
}) {
  const countries = useMemo(() => Object.entries(data), [data]);
  return (
    <tbody>
      {countries.map(([countryName, countryData]) => {
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

export default memo(TableBody);
