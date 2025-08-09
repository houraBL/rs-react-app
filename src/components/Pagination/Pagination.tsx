type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (n: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const paginationButtonClassName =
    'px-4 py-2 rounded-3xl hover:cursor-pointer disabled:cursor-default disabled:bg-blue-200 text-blue-900 bg-blue-400 hover:bg-blue-500 dark:disabled:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white';
  return (
    <div
      className="flex items-center gap-2 justify-center p-2 sm:p-4 sm:gap-4"
      data-role="pagination"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={paginationButtonClassName}
      >
        Prev
      </button>

      {totalPages > 0 && (
        <span className="text-sm font-bold sm:text-lg">
          Page {currentPage} of {totalPages}
        </span>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={paginationButtonClassName}
      >
        Next
      </button>
    </div>
  );
}
