import React, { useState } from "react";

interface PaginateProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Paginate({ currentPage, totalPages, onPageChange }: PaginateProps) {
  const [inputPage, setInputPage] = useState<number>(currentPage);

  function handlePageInput(event: React.ChangeEvent<HTMLInputElement>) {
    let page = parseInt(event.target.value);
    page = isNaN(page) ? 1 : Math.max(1, Math.min(page, totalPages));
    setInputPage(page);
  }

  function handlePageSubmit(event: React.FormEvent) {
    event.preventDefault();
    onPageChange(inputPage);
  }

  function getPageNumbers() {
    const pages = [];
    const maxPageVisible = 5;
    const maxPage = Math.min(totalPages, maxPageVisible);

    if (totalPages <= maxPageVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxPage; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - maxPage + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  }
  return (
    <div>
      Este es el Paginado
      <div>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>

        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            disabled={currentPage === page}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>

        <form onSubmit={handlePageSubmit}>
          <input
            type="number"
            min={1}
            max={totalPages}
            value={inputPage}
            onChange={handlePageInput}
          />

          <button type="submit">Ir</button>
        </form>
      </div>
    </div>
  );
}

export default Paginate;
