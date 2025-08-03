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
    'px-4 py-2 rounded-3xl bg-blue-500 disabled:bg-blue-700 hover:bg-blue-600 hover:cursor-pointer disabled:cursor-default';
  return (
    <div
      className="flex items-center gap-2 justify-center p-2 text-white sm:p-4 sm:gap-4"
      data-role="pagination"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={paginationButtonClassName}
      >
        Prev
      </button>

      <span className="text-sm font-bold sm:text-lg">
        Page {currentPage} of {totalPages}
      </span>

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
