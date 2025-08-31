import type { TableColumn } from '@app/types';

export default function TableHeader({
  selectedColumns,
}: {
  selectedColumns: TableColumn[];
}) {
  return (
    <thead>
      <tr>
        {selectedColumns.map((col) => (
          <th key={col.key} className="border px-4 py-2">
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}
