import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  indexOfFirstItem,
  indexOfLastItem,
  totalItems,
}) => {
  if (totalPages <= 1) return null;

  const getPaginatedRange = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const blockIndex = Math.floor((currentPage - 1) / 3);
    const startPage = blockIndex * 3 + 1;

    const endPage = Math.min(startPage + 2, totalPages);

    const range = [];
    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }
    return range;
  };

  const paginatedPagesRange = getPaginatedRange();

  return (
    <div className="flex items-center justify-between bg-white border border-slate-100 rounded-2xl px-6 py-4 shadow-sm shadow-slate-100/50">
      <p className="text-[11px] font-bold text-slate-500 hidden sm:block">
        Showing <span className="text-purple-600">{indexOfFirstItem + 1}</span>{" "}
        -{" "}
        <span className="text-purple-600">
          {Math.min(indexOfLastItem, totalItems)}
        </span>{" "}
        of <span className="text-slate-700">{totalItems}</span> Updates
      </p>

      <div className="flex items-center gap-2 mx-auto sm:mx-0">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex items-center gap-1">
          {paginatedPagesRange.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                currentPage === pageNumber
                  ? "bg-purple-600 text-white shadow-sm shadow-purple-500/20"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {pageNumber}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
