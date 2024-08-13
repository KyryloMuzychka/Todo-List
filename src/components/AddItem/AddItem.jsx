import React, { useState } from "react";
import {
  add_button,
  add_item_input,
  add_item,
  icon,
} from "./AddItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function AddItem({ addTask }) {
  const defaultTask = { title: "", completed: false };
  const [newTask, setNewTask] = useState(defaultTask);

  function handleInputChange(event) {
    setNewTask((prevState) => ({
      ...prevState,
      title: event.target.value,
    }));
  }

  function handleAddClick() {
    addTask(newTask);
    setNewTask(defaultTask);
  }

  return (
    <div className={add_item}>
      <input
        type="text"
        placeholder="Enter a task..."
        value={newTask.title}
        onChange={handleInputChange}
        className={add_item_input}
        required
      />
      <button className={add_button} onClick={handleAddClick}>
        Add
        <FontAwesomeIcon icon={faPlus} className={icon} />
      </button>
    </div>
  );
}
