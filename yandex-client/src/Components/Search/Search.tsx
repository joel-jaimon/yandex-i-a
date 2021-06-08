import styles from "./search.module.scss";
import React from "react";
import { StyleContext } from "../../context/StyleContext";
import INPUT_DATA from "../../data.json";

console.log(INPUT_DATA);

export const Search = () => {
  const { theme } = React.useContext(StyleContext);
  return (
    <div className={styles.SubSearchContainer}>
      <svg
        width="18"
        height="18"
        fill={theme.theme2}
        className={styles.svg}
        viewBox="0 0 16 16"
      >
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
      </svg>

      <input className={styles.input} placeholder="Search for anything..." />
    </div>
  );
};
