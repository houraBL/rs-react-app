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
    <div className="flex items-center gap-4 justify-center p-4 text-white">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={paginationButtonClassName}
      >
        Prev
      </button>

      <span className="text-lg font-bold">
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
