import React, { useEffect, useState } from "react";
import { search_panel, search_item_input } from "./SearchPanel.module.css";

export default function SearchPanel({ searchTasks, tasks, setFiltering }) {
  const [findTaskTitle, setFindTaskTitle] = useState("");

  function handleInputChange(event) {
    const value = event.target.value
    setFindTaskTitle(value);
    setFiltering(value.length > 0);
  }

  useEffect(() => {
    searchTasks(findTaskTitle);
  }, [findTaskTitle, tasks]);

  return (
    <div className={search_panel}>
      <input
        type="text"
        placeholder="Find a task..."
        value={findTaskTitle}
        onChange={handleInputChange}
        className={search_item_input}
      />      
    </div>
  );
}
