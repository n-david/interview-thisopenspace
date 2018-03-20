import React from 'react';
import './Pages.css';

const Pages = ({
  pageSize,
  total,
  currentPage,
  onClickChangePage,
  onClickJumpToPage,
}) => {
  const showingRecordsTo = total - (total - 10 * currentPage);
  const lastRecordsShowing = total <= showingRecordsTo;
  const lastPage = Math.ceil(total / 10);

  const getShowingRecordsFrom = () => {
    if (total <= 10 || currentPage === 1) return '1';
    else return (currentPage - 1) * 10 + 1;
  };

  const getShowingRecordsTo = () => {
    if (total <= 10) return total;
    else if (lastRecordsShowing) return total;
    else return showingRecordsTo;
  };

  const getPrevButtonClassnames = () => {
    return `page-button ${currentPage === 1 && 'disabled'}`;
  };

  const getNextButtonClassnames = () => {
    return `page-button ${pageSize !== 10 && 'disabled'}`;
  };

  return (
    <div>
      <span
        className={`no-margin ${getPrevButtonClassnames()}`}
        onClick={() => onClickJumpToPage(1)}
      >
        First
      </span>
      <span
        className={getPrevButtonClassnames()}
        onClick={() => onClickChangePage('PREV')}
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
        className={getNextButtonClassnames()}
        onClick={() => onClickChangePage('NEXT')}
      >
        &gt;
      </span>
      <span
        className={`no-margin ${getNextButtonClassnames()}`}
        onClick={() => onClickJumpToPage(lastPage)}
      >
        Last
      </span>
    </div>
  );
};

export default Pages;
