import React from "react";
import { StyleContext, themes } from "../../context/StyleContext";
import Switch from "@material-ui/core/Switch";
import styles from "./header.module.scss";

const Header = () => {
  const { theme, setTheme } = React.useContext(StyleContext);

  return (
    <header className={styles.header}>
      <div className={styles.df_jc_ac}>
        <svg
          width="25"
          height="30"
          fill={theme.theme2}
          className="bi bi-tv-fill"
          viewBox="0 0 16 16"
        >
          <path d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zM2 2h12s2 0 2 2v6s0 2-2 2H2s-2 0-2-2V4s0-2 2-2z" />
        </svg>
        <strong
          style={{
            color: theme.theme1,
          }}
        >
          <p>&nbsp;Anime Info</p>
        </strong>
      </div>
      <div
        style={{
          width: "100px",
        }}
        className={styles.df_jc_ac}
      >
        <Switch
          checked={theme.type === "Dark"}
          onClick={() =>
            setTheme(theme.type === "Dark" ? themes.white : themes.dark)
          }
          color="primary"
          value="dynamic-class-name"
        />
        <p
          style={{
            color: theme.theme1,
          }}
        >
          &nbsp;{theme.type}
        </p>
      </div>
    </header>
  );
};

export default Header;
