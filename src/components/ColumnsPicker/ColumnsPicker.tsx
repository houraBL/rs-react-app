import { ALWAYS_SHOW_COLUMNS } from '@app/constants';
import type { TableColumn } from '@app/types';
import { useState } from 'react';

export default function ColumnsPicker({
  availableColumns,
  selectedColumns,
  onApply,
}: {
  availableColumns: TableColumn[];
  selectedColumns: TableColumn[];
  onApply: (cols: TableColumn[]) => void;
}) {
  const [tempColumns, setTempColumns] =
    useState<TableColumn[]>(selectedColumns);

  const toggleColumn = (col: TableColumn, checked: boolean) => {
    setTempColumns((prev) =>
      checked ? [...prev, col] : prev.filter((c) => c.key !== col.key)
    );
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-start">
      {availableColumns.map((col) => (
        <label
          className={`flex items-center gap-2 ${ALWAYS_SHOW_COLUMNS.some((c) => c.key === col.key) ? 'cursor-default' : 'cursor-pointer'}`}
          key={col.key}
        >
          <input
            type="checkbox"
            checked={tempColumns.some((c) => c.key === col.key)}
            onChange={(e) => toggleColumn(col, e.target.checked)}
            disabled={
              ALWAYS_SHOW_COLUMNS.some((c) => c.key === col.key) || false
            }
            className="cursor-pointer disabled:cursor-default"
          />
          {col.label}
        </label>
      ))}
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={() => onApply(tempColumns)}
          className="px-3 py-1 rounded bg-blue-500 text-white"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
