import React, { useEffect, useState } from "react";
import styles from "./FilterButtons.module.css";
import classNames from "classnames";

export default function FilterButtons({ filterStatus, setFilterStatus }) {
  let buttons = [
    { status: "all", caption: "All" },
    { status: "important", caption: "Important" },
    { status: "completed", caption: "Done" },
    { status: "todo", caption: "To Do" },
  ];

  return (
    <div>
      {buttons.map((btn) => {
        const buttonStyle = classNames({
          [styles.filterButton]: true,
          [styles.active]: btn.status === filterStatus,
        });

        return (
          <button
            key={btn.status}
            onClick={() => setFilterStatus(btn.status)}
            className={buttonStyle}
          >
            {btn.caption}
          </button>
        );
      })}
    </div>
  );
}
