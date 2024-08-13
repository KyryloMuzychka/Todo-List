import React from "react";
import "./ManageButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ManageButton({
  typeButton,
  onClickButton,
  icon,
  index,
}) {
  return (
    <button
      className={`${typeButton}`}
      onClick={() => {
        onClickButton(index);
      }}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}
