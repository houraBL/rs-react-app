import {
  AVAILABLE_COLUMNS,
  BUTTON_STYLE,
  EARLIEST_YEAR,
  LATEST_YEAR,
} from '@app/constants';
import type { SortKey, SortOrder, TableColumn } from '@app/types';
import ColumnsPicker from '@components/ColumnsPicker';
import ModalDialog from '@components/ModalDialog';
import { useState } from 'react';

type ControlsPanelProps = {
  selectedYear: number;
  onYearChange: (year: number) => void;
  filterText: string;
  onFilterChange: (text: string) => void;
  selectedColumns: TableColumn[];
  onColumnsChange: (cols: TableColumn[]) => void;
  sortKey: SortKey;
  onSortKeyChange: (key: SortKey) => void;
  sortOrder: SortOrder;
  onSortOrderChange: (order: SortOrder) => void;
};

export default function ControlsPanel({
  selectedYear,
  onYearChange,
  filterText,
  onFilterChange,
  selectedColumns,
  onColumnsChange,
  sortKey,
  onSortKeyChange,
  sortOrder,
  onSortOrderChange,
}: ControlsPanelProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex gap-4 justify-center items-center flex-wrap">
      <label className="font-semibold">Customize columns:</label>
      <button className={BUTTON_STYLE} onClick={() => setIsModalOpen(true)}>
        ⚙️
      </button>
      <label htmlFor="name" className="font-semibold">
        Filter by name:
      </label>
      <input
        id="name"
        type="text"
        value={filterText}
        onChange={(e) => onFilterChange(e.target.value)}
        className="border rounded-md p-2 w-40"
        placeholder="start typing..."
      />
      <label htmlFor="year" className="font-semibold">
        Select Year:
      </label>
      <input
        id="year"
        type="number"
        value={selectedYear}
        onChange={(e) => onYearChange(Number(e.target.value))}
        min={EARLIEST_YEAR}
        max={LATEST_YEAR}
        className="border rounded-md p-2 w-40"
      />
      <label htmlFor="sortKey" className="font-semibold">
        Sort by:
      </label>
      <select
        id="sortKey"
        value={sortKey}
        onChange={(e) => onSortKeyChange(e.target.value as SortKey)}
        className="border rounded-md p-2"
      >
        <option value="name">Country Name</option>
        <option value="population">Population</option>
      </select>
      <label htmlFor="sortOrder" className="font-semibold">
        Order:
      </label>
      <select
        id="sortOrder"
        value={sortOrder}
        onChange={(e) => onSortOrderChange(e.target.value as SortOrder)}
        className="border rounded-md p-2"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      {isModalOpen && (
        <ModalDialog
          title="Customize visible columns"
          closeModal={() => setIsModalOpen(false)}
        >
          <ColumnsPicker
            availableColumns={AVAILABLE_COLUMNS}
            selectedColumns={selectedColumns}
            onApply={(cols) => {
              onColumnsChange(cols);
              setIsModalOpen(false);
            }}
          />
        </ModalDialog>
      )}
    </div>
  );
}
