import React from "react";
import { StyleContext, themes } from "../../context/StyleContext";
import Switch from "@material-ui/core/Switch";
import styles from "./header.module.scss";
import DetailsIcon from "@material-ui/icons/Details";

const Header = () => {
  const { theme, setTheme } = React.useContext(StyleContext);

  return (
    <header className={styles.header}>
      <div className={styles.df_jc_ac}>
        <DetailsIcon
          style={{
            color: theme.type === "Dark" ? theme.theme2 : "white",
            fontSize: 30,
          }}
        />
        <strong
          style={{
            color: "white",
          }}
        >
          <p>ANIME INFO</p>
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
            color: "white",
            fontWeight: 500,
          }}
        >
          &nbsp;{theme.type}
        </p>
      </div>
    </header>
  );
};

export default Header;
