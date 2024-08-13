import React from "react";
import styles from "./ToDoItem.module.css";
import classNames from "classnames";

import {
  faTrash,
  faAngleUp,
  faAngleDown,
  faCheck,
  faExclamation,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import ManageButton from "../ManageButton/ManageButton";

export default function ToDoItem({
  task,
  index,
  deleteTask,
  onToggleCompleted,
  onToggleImportant,
  moveTaskDown,
  moveTaskUp,
  onToggleEdit,
}) {
  const itemStyle = classNames({
    [styles.completed]: task.completed, // added if task.completed === true
    [styles.important]: task.important, // added if task.important === true
  });

  return (
    <div className={styles.item}>
      <span className={itemStyle}>{task.title}</span>
      <div className={styles.management}>
        <ManageButton
          typeButton={"delete_button"}
          onClickButton={deleteTask}
          icon={faTrash}
          index={index}
        />
        <ManageButton
          typeButton={"move_button"}
          onClickButton={moveTaskUp}
          icon={faAngleUp}
        />
        <ManageButton
          typeButton={"move_button"}
          onClickButton={moveTaskDown}
          icon={faAngleDown}
        />
        <ManageButton
          typeButton={"important_button"}
          onClickButton={onToggleImportant}
          icon={faExclamation}
        />
        <ManageButton
          typeButton={"edit_button"}
          onClickButton={onToggleEdit}
          icon={faPen}
        />
        <ManageButton
          typeButton={"completed_button"}
          onClickButton={onToggleCompleted}
          icon={faCheck}
        />
      </div>
    </div>
  );
}
