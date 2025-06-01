
interface Props {
  totalResults: number;
  page: number;
  setPage: (p: number) => void;
}

export const Paginator = ({ totalResults, page, setPage }: Props) => {
  const resultsPerPage = 10; // Sayfa başına gösterilecek sonuç sayısı
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1); // İlk sayfa
      if (page > 3) pages.push("start-ellipsis"); // Benzersiz key için string kullan
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
        pages.push(i);
      }
      if (page < totalPages - 2) pages.push("end-ellipsis"); // Benzersiz key için string kullan
      pages.push(totalPages); // Son sayfa
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={handlePrevious}
        disabled={page === 1}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Previous
      </button>
      {getPageNumbers().map((p) =>
        p === "start-ellipsis" || p === "end-ellipsis" ? (
          <span key={p} className="px-2">
            ...
          </span>
        ) : (
          <button
            key={p} // Burada sayfa numarası veya string benzersizdir
            onClick={() => setPage(p as number)}
            className={`px-3 py-1 rounded ${
              p === page ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};
