import type { CountryYearData, TableColumn } from '@app/types';
import { memo, useLayoutEffect, useRef, useState } from 'react';

function TableRow({
  countryName,
  yearData,
  selectedColumns,
  isoCode,
}: {
  countryName: string;
  yearData: CountryYearData | undefined;
  selectedColumns: TableColumn[];
  isoCode: string | undefined;
}) {
  const prevDataRef = useRef<CountryYearData | undefined>(yearData);
  const [changedKeys, setChangedKeys] = useState<Set<keyof CountryYearData>>(
    new Set()
  );

  useLayoutEffect(() => {
    const prevData = prevDataRef.current;
    prevDataRef.current = yearData;

    if (prevData && yearData) {
      const changedCols = new Set<keyof CountryYearData>();

      for (const col of selectedColumns) {
        const prevVal = prevData[col.key] ?? 'N/A';
        const newVal = yearData[col.key] ?? 'N/A';

        if (prevVal !== newVal) {
          changedCols.add(col.key);
        }
      }

      if (changedCols.size > 0) {
        setChangedKeys(changedCols);

        const timer = setTimeout(() => {
          setChangedKeys(new Set());
        }, 200);

        return () => clearTimeout(timer);
      }
    }
  }, [yearData, selectedColumns]);

  return (
    <tr>
      <td className="border px-4 py-2 font-bold">{countryName}</td>
      <td className="border px-4 py-2">{isoCode || 'N/A'}</td>
      {selectedColumns.map((col) => (
        <td
          key={col.key}
          className={`border px-4 py-2 transition-colors duration-200 ${
            changedKeys.has(col.key) ? 'bg-blue-400' : ''
          }`}
        >
          {yearData ? (yearData[col.key] ?? 'N/A') : 'N/A'}
        </td>
      ))}
    </tr>
  );
}

export default memo(TableRow);
