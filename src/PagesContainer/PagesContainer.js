import React from 'react';
import './PagesContainer.css';

const PagesContainer = ({
  pageSize,
  total,
  currentPage,
  onClickNextPage,
  onClickPrevPage,
}) => {
  const showingRecordsTo = total - (total - 10 * currentPage);
  const lastRecordsShowing = total <= showingRecordsTo;

  const getShowingRecordsFrom = () => {
    if (total <= 10 || currentPage === 1) return '1';
    else return (currentPage - 1) * 10 + 1;
  };

  const getShowingRecordsTo = () => {
    if (total <= 10) return total;
    else if (lastRecordsShowing) return total;
    else return showingRecordsTo;
  };

  return (
    <div>
      <span
        className={`page-button ${currentPage === 1 && 'disabled'}`}
        onClick={onClickPrevPage}
      >
        &lt;
      </span>
      <span className="page-indicator">
        Showing{' '}
        <strong>
          {getShowingRecordsFrom()}-{getShowingRecordsTo()}
        </strong>{' '}
        of <strong> {total}</strong>
      </span>
      <span
        className={`page-button ${pageSize !== 10 && 'disabled'}`}
        onClick={onClickNextPage}
      >
        &gt;
      </span>
    </div>
  );
};

export default PagesContainer;
