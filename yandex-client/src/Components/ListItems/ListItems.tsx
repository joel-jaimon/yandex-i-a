import styles from "./listitem.module.scss";
import React from "react";
import { StyleContext } from "../../context/StyleContext";

export const ListItems = () => {
  const theme = React.useContext(StyleContext);
  return (
    <div className={styles.resultContainer}>
      <div className={styles.listItems}>
        <span>
          <p>Jackets</p>
        </span>
        <p>What should be done to rectify this?</p>
      </div>
    </div>
  );
};
