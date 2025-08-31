import type { TableColumn } from '@app/types';

export default function TableBody({
  selectedColumns,
}: {
  selectedColumns: TableColumn[];
}) {
  return (
    <tbody>
      <tr>
        {selectedColumns.map((col) => (
          <td key={col.key} className="border px-4 py-2">
            {col.label}
          </td>
        ))}
      </tr>
    </tbody>
  );
}
