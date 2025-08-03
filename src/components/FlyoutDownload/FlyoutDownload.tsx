import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { unselectAll } from '../../store/selectionSlice';
import { useRef } from 'react';

export default function FlyoutDownload() {
  const selectedItems = useSelector((state: RootState) =>
    Object.values(state.selection.selectedItems)
  );
  const dispatch = useDispatch();
  const hiddenLink = useRef<HTMLAnchorElement | null>(null);

  const handleDownload = () => {
    const csvRows = [
      [
        'Name',
        'Image URL',
        'Status',
        'Species',
        'Gender',
        'Origin',
        'Character URL',
      ],
      ...selectedItems.map((character) => [
        character.name,
        character.image,
        character.status,
        character.species,
        character.gender,
        character.origin?.name,
        character.url,
      ]),
    ];

    const csvContent = csvRows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = hiddenLink.current;
    if (link) {
      link.href = url;
      link.click();
    }
    dispatch(unselectAll());
  };

  if (!selectedItems.length) return null;

  const buttonClassName =
    'px-4 py-2 rounded-3xl bg-blue-500 disabled:bg-blue-700 hover:bg-blue-600 hover:cursor-pointer disabled:cursor-default';

  return (
    <div className="fixed bottom-0 left-0 w-full bg-blue-900 text-white p-2 flex gap-4 sm:gap-8 items-center justify-center z-10 shadow-[0_-9px_9px_rgba(22,36,86,0.9)]">
      <span className="text-sm sm:text-base sm:font-bold">
        {selectedItems.length} item(s) selected
      </span>
      <div className="flex gap-2 sm:gap-4 text-sm sm:font-bold sm:text-base">
        <button
          className={buttonClassName}
          onClick={() => dispatch(unselectAll())}
        >
          Unselect all
        </button>
        <button className={buttonClassName} onClick={handleDownload}>
          Download
        </button>
        <a
          ref={hiddenLink}
          className="hidden"
          download={`${selectedItems.length}_items.csv`}
        ></a>
      </div>
    </div>
  );
}
