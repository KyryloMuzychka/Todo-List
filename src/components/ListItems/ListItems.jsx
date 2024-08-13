import React from "react";
import ToDoItem from "../ToDoItem/ToDoItem";
import "./ListItems.module.css";
import EditItem from "../EditItem/EditItem";

export default function ListItems({
  tasks,
  setTasks,
  filterTasks,
  onToggleCompleted,
  onToggleImportant,
  onToggleEdit,
  filtering,
}) {
  function deleteTask(id) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function updateTask(id, updatedTask) {
    if (updatedTask.title.trim() === "") {
      return;
    }

    const isTitleUnique = !tasks.some(
      (task) => task.id !== id && task.title === updatedTask.title
    );

    if (!isTitleUnique) {
      return;
    }

    const updatedTasks = tasks.map((task) => {
      return task.id === id
        ? {
            ...task,
            title: updatedTask.title,
          }
        : task;
    });

    setTasks(updatedTasks);
  }

  return (
    <ol>
      {filterTasks.map((task, index) => (
        <li key={index}>
          {task.editing && (
            <EditItem
              task={task}
              onToggleEdit={() => onToggleEdit(task.id)}
              updateTask={updateTask}
            />
          )}
          {!task.editing && (
            <ToDoItem
              tasks={tasks}
              task={task}
              deleteTask={() => deleteTask(task.id)}
              onToggleCompleted={() => onToggleCompleted(task.id)}
              onToggleImportant={() => onToggleImportant(task.id)}
              moveTaskDown={() => {
                moveTaskDown(index);
              }}
              moveTaskUp={() => moveTaskUp(index)}
              onToggleEdit={() => onToggleEdit(task.id)}
              filtering={filtering}
            />
          )}
        </li>
      ))}
    </ol>
  );
}
