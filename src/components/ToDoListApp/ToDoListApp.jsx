import React, { useEffect, useState } from "react";
import { todo_list } from "./ToDoListApp.module.css";
import Header from "../Header/Header";
import AddItem from "../AddItem/AddItem";
import ListItems from "../ListItems/ListItems";
import SearchPanel from "../SearchPanel/SearchPanel";
import {defaultTasks} from "../../defaultTasks"

export default function ToDoListApp() {
  const savedTasks = localStorage.getItem("tasks");

  const [tasks, setTasks] = useState(
    savedTasks
      ? JSON.parse(savedTasks)
      : defaultTasks
  );
  const [filterTasks, setFilterTasks] = useState([]);
  const [filtering, setFiltering] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(newTask) {
    const maxId = tasks.reduce((max, task) => Math.max(max, task.id), 0);
    const newId = maxId + 1;
    const newTaskWithId = { ...newTask, id: newId };

    if (newTask.title.trim() !== "") {
      const index = tasks.findIndex((task) => task.title === newTask.title);
      if (index === -1) {
        setTasks((prevTasks) => [...prevTasks, newTaskWithId]);
      }
    }
  }

  function toggleProperty(tasksArray, id, key) {
    return tasksArray.map((task) =>
      task.id === id ? { ...task, [key]: !task[key] } : task
    );
  }

  function onToggleCompleted(id) {
    setTasks((tasks) => {
      return toggleProperty(tasks, id, "completed");
    });
  }

  function onToggleImportant(id) {
    setTasks((tasks) => {
      return toggleProperty(tasks, id, "important");
    });
  }

  function onToggleEdit(id) {
    setTasks((tasks) => {
      return toggleProperty(tasks, id, "editing");
    });
  }

  function getCompletedAmount() {
    return tasks.filter((task) => task.completed).length;
  }

  function searchTasks(searchTitle, filterStatus) {
    let filteredTasks = tasks;

    if (filterStatus === "completed") {
      filteredTasks = filteredTasks.filter((task) => task.completed);
    } else if (filterStatus === "important") {
      filteredTasks = filteredTasks.filter((task) => task.important);
    } else if (filterStatus === "todo") {
      filteredTasks = filteredTasks.filter((task) => !task.completed);
    }

    if (searchTitle.trim() !== "") {
      filteredTasks = filteredTasks.filter((task) =>
        task.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }

    setFilterTasks(filteredTasks);
  }

  function sortTasks() {
    const sortedTasks = [...tasks].sort((a, b) => {
      if (a.completed && !b.completed) return 1;
      if (!a.completed && b.completed) return -1;
      if (!a.important && b.important) return 1;
      if (a.important && !b.important) return -1;
      return 0;
    });

    if (JSON.stringify(sortedTasks) !== JSON.stringify(tasks)) {
      setTasks(sortedTasks);
    }
  }

  useEffect(() => {
    getCompletedAmount;
    searchTasks;
    sortTasks();
  }, [tasks]);

  return (
    <div className={todo_list}>
      <Header doneTasks={getCompletedAmount()} allTasks={tasks.length} />
      <AddItem tasks={tasks} addTask={addTask} />
      <ListItems
        tasks={tasks}
        setTasks={setTasks}
        filterTasks={filterTasks}
        onToggleCompleted={onToggleCompleted}
        onToggleImportant={onToggleImportant}
        onToggleEdit={onToggleEdit}
        filtering={filtering}
      />
      <SearchPanel
        searchTasks={searchTasks}
        tasks={tasks}
        setFiltering={setFiltering}
      />
    </div>
  );
}
