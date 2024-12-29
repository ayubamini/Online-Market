import React, { useState } from "react";
import _ from "lodash";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const [page, setPage] = useState(currentPage);

  //total pages
  const pageCount = Math.ceil(itemsCount / pageSize);

  const minPage = Math.max(Math.min(currentPage - 1, pageCount - 2), 1)

  const pages = _.range(minPage, Math.min(pageCount + 1, currentPage + 2));

  const changePage = (delta) => {
    setPage(page + delta);
    onPageChange(page + delta);
  };

  const jumpPage = (pageNumber) => {
    setPage(pageNumber);
    onPageChange(pageNumber);
  };

  return (
    <div className="row">
      <div className="col">
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <button
                className="page-link"
                onClick={(e) => changePage(-1)}
                disabled={page === 1}
              >
                Previous
              </button>
            </li>

            {currentPage !== 1 && currentPage !== 2 && (
              <li className="page-item">
                <button className="page-link" onClick={(e) => jumpPage(1)}>
                  {1}
                </button>
              </li>
            )}

            {currentPage - 1 > 1 && (
              <li className="page-item">
                <button className="page-link" disabled>
                  ...
                </button>
              </li>
            )}

            {pages.map((ele) => (
              <li className="page-item" key={ele}>
                <button
                  className={page === ele ? " active page-link" : "page-link"}
                  onClick={(e) => jumpPage(ele)}
                >
                  {ele}
                </button>
              </li>
            ))}
            {pageCount >= 3 &&
              pages.find((e) => e >= pageCount) === undefined && (
                <>
                  <li className="page-item">
                    <button className="page-link" disabled>
                      ...
                    </button>
                  </li>
                  <li className="page-item">
                    <button
                      className={
                        page === pageCount ? " active page-link" : "page-link"
                      }
                      onClick={(e) => jumpPage(pageCount)}
                    >
                      {pageCount}
                    </button>
                  </li>
                </>
              )}
            <li className="page-item">
              <button
                className="page-link"
                onClick={(e) => changePage(1)}
                disabled={page === pageCount}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
