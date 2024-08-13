import React, { useState } from "react";
import {
  edit_button,
  edit_item_input,
  edit_item,
  icon,
} from "./EditItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

export default function EditItem({ task, index, onToggleEdit, updateTask }) {
  const [updatedTask, setUpdatedTask] = useState(task);

  function handleInputChange(event) {
    setUpdatedTask((prevState) => ({
      ...prevState,
      title: event.target.value,
    }));
  }

  function handleEditClick() {
    updateTask(index, updatedTask);
    onToggleEdit(index);
  }

  return (
    <div className={edit_item}>
      <input
        type="text"
        value={updatedTask.title}
        onChange={handleInputChange}
        className={edit_item_input}
        required
      />
      <button className={edit_button} onClick={handleEditClick}>
        Update
        <FontAwesomeIcon icon={faFloppyDisk} className={icon} />
      </button>
    </div>
  );
}
