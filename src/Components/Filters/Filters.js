import React, { useState } from "react";
import "./Filters.css";

const filters = [
  {
    name: "All",
    is_completed: null,
  },
  {
    name: "Active",
    is_completed: false,
  },
  {
    name: "Completed",
    is_completed: true,
  },
];
function Filters(props) {
  const [filteredBy, setFilteredBy] = useState(filters[0].name);
  const filterTodoList = (event) => {
    const newFilter = event.target.textContent;
    const isCompleted = filters.find((filter) => filter.name === newFilter)[
      "is_completed"
    ];
    setFilteredBy(newFilter);
    props.callFilterByStatus(isCompleted);
  };
  return (
    <ul className="filter-list">
      {filters.map((filter, index) => {
        return (
          <li
            key={index}
            onClick={filterTodoList}
            className={filteredBy === filter["name"] ? "highlight" : ""}
          >
            {filter["name"]}
          </li>
        );
      })}
    </ul>
  );
}

export default Filters;
