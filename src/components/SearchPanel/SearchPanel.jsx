import React, { useEffect, useState } from "react";
import { search_panel, search_item_input } from "./SearchPanel.module.css";
import FilterButtons from "../FilterButtons/FilterButtons";

export default function SearchPanel({ searchTasks, tasks, setFiltering }) {
  const [findTaskTitle, setFindTaskTitle] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  function handleInputChange(event) {
    const value = event.target.value;
    setFindTaskTitle(value);
    setFiltering(value.length > 0);
  }

  useEffect(() => {
    searchTasks(findTaskTitle, filterStatus);
  }, [findTaskTitle, tasks, filterStatus]);

  return (
    <div className={search_panel}>
      <input
        type="text"
        placeholder="Find a task..."
        value={findTaskTitle}
        onChange={handleInputChange}
        className={search_item_input}
      />
      <FilterButtons
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />
    </div>
  );
}
