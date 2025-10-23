import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import "./Filters.css";

function Filters(props) {
  const { t } = useTranslation();
  
  const filters = [
    {
      name: t('todo.all'),
      key: 'all',
      is_completed: null,
    },
    {
      name: t('todo.active'),
      key: 'active',
      is_completed: false,
    },
    {
      name: t('todo.completed'),
      key: 'completed',
      is_completed: true,
    },
  ];
  
  const [filteredBy, setFilteredBy] = useState(filters[0].key);
  
  const filterTodoList = (event) => {
    const newFilterKey = event.target.dataset.filterKey;
    const filter = filters.find((f) => f.key === newFilterKey);
    setFilteredBy(newFilterKey);
    props.callFilterByStatus(filter.is_completed);
  };
  
  return (
    <ul className="filter-list">
      {filters.map((filter, index) => {
        return (
          <li
            key={index}
            onClick={filterTodoList}
            data-filter-key={filter.key}
            className={filteredBy === filter.key ? "highlight" : ""}
            data-testid={`filter-${filter.key}`}
          >
            {filter.name}
          </li>
        );
      })}
    </ul>
  );
}

export default Filters;
