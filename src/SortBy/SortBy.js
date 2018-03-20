import React from 'react';
import './SortBy.css';

const SortBy = ({ onClickSortBy }) => (
  <select className="dropdown">
    <option>all</option>
    <option>popular</option>
    <option>large capacity</option>
    <option>price/day</option>
    <option>price/hour</option>
    <option>sqft</option>
  </select>
);

export default SortBy;
