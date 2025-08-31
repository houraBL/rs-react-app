import { AVAILABLE_COLUMNS, BUTTON_STYLE } from '@app/constants';
import type { TableColumn } from '@app/types';
import ColumnsPicker from '@components/ColumnsPicker';
import CountriesList from '@components/CountriesList';
import ModalDialog from '@components/ModalDialog';
import { useState } from 'react';

export default function Main() {
  const [selectedColumns, setSelectedColumns] = useState<TableColumn[]>([
    AVAILABLE_COLUMNS[0],
    AVAILABLE_COLUMNS[1],
    AVAILABLE_COLUMNS[2],
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="flex flex-col bg-blue-100 dark:bg-blue-700 p-6 m-2 rounded-3xl gap-4  justify-center items-center">
      <div className="flex flex-col gap-4 w-fit">
        <h2 className="text-2lx font-bold">
          OMG look! You van see the CO₂ emission by country! Global warming duh
        </h2>
        <div className="flex flex-col gap-4 justify-center items-center">
          <div className="flex gap-4 justify-center items-center">
            Customize visible columns:
            <button
              className={BUTTON_STYLE}
              onClick={() => setIsModalOpen(true)}
            >
              ⚙️
            </button>
          </div>
          <CountriesList selectedColumns={selectedColumns} />
          {isModalOpen && (
            <ModalDialog
              title={'Customize visible columns'}
              closeModal={() => setIsModalOpen(false)}
            >
              <ColumnsPicker
                availableColumns={AVAILABLE_COLUMNS}
                selectedColumns={selectedColumns}
                onApply={(cols) => {
                  setSelectedColumns(cols);
                  setIsModalOpen(false);
                }}
              />
            </ModalDialog>
          )}
        </div>
      </div>
    </div>
  );
}
