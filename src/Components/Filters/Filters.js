import React from "react";
import './Filters.css';

function Filters(props) {
  return <ul className="filter-list">
    <li>All</li>
    <li>Active</li>
    <li>Completed</li>
  </ul>;
}

export default Filters;