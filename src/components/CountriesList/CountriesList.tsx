import type { TableColumn } from '@app/types';
import TableBody from '@components/TableBody';
import TableHeader from '@components/TableHeader';

export default function CountriesList({
  selectedColumns,
}: {
  selectedColumns: TableColumn[];
}) {
  return (
    <div className="flex flex-col  w-full">
      <table className="table-auto border-collapse max-w-full text-sm sm:text-lg overflow-auto">
        <TableHeader selectedColumns={selectedColumns} />

        <TableBody selectedColumns={selectedColumns} />
      </table>
    </div>
  );
}
