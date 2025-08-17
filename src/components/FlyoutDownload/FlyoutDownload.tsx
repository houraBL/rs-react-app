'use client';

import createCVSDownloadURL from '@/utils/createCVSDownloadURL';
import { unselectAll } from '@/utils/selectionSlice';
import type { RootState } from '@app/store';
import Link from 'next/link';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function FlyoutDownload() {
  const selectedItems = useSelector(
    (state: RootState) => state.selection.selectedItems
  );
  const dispatch = useDispatch();
  const hiddenLink = useRef<HTMLAnchorElement | null>(null);

  const handleDownload = () => {
    const url = createCVSDownloadURL(selectedItems);

    const link = hiddenLink.current;
    if (link) {
      link.href = url;
      link.click();
    }
  };

  if (!selectedItems.length) return null;

  const buttonClassName =
    'px-4 py-2 rounded-3xl hover:cursor-pointer disabled:cursor-default disabled:bg-blue-200 text-blue-900 bg-blue-300 hover:bg-blue-500 dark:disabled:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white';

  return (
    <div className="fixed bottom-0 left-0 w-full bg-blue-400 dark:bg-blue-900 p-2 flex gap-4 sm:gap-8 items-center justify-center z-10 shadow-[0_-9px_9px_rgba(59,130,246,0.8)] dark:shadow-[0_-9px_9px_rgba(22,36,86,0.9)]">
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
        <Link
          data-testid="download-link"
          ref={hiddenLink}
          className="hidden"
          download={`${selectedItems.length}_items.csv`}
          href={''}
        />
      </div>
    </div>
  );
}
