import styles from "./search.module.scss";
import React from "react";
import { StyleContext } from "../../context/StyleContext";
import SearchIcon from "@material-ui/icons/Search";

export function Search({ setSearchQuery }: any) {
  const { theme } = React.useContext(StyleContext);
  return (
    <div className={styles.SubSearchContainer}>
      <SearchIcon
        className={styles.svg}
        style={{
          color: theme.theme2,
        }}
      />
      <input
        onChange={(e) => setSearchQuery(e.target.value.toLowerCase().trim())}
        className={styles.input}
        style={{
          color: theme.theme1,
        }}
        placeholder="Search for anything..."
      />
    </div>
  );
}
