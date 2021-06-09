import styles from "./footer.module.scss";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import LanguageIcon from "@material-ui/icons/Language";
import { IconButton } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";

export const Footer = () => {
  const handleClick = (url: string) => {
    if (location) {
      location.href = url;
    }
  };
  const style = {
    color: "white",
    fontSize: "30px",
  };
  return (
    <div className={styles.footer}>
      <IconButton
        onClick={() => handleClick("https://www.linkedin.com/in/joel-jaimon/")}
      >
        <LinkedInIcon style={style} fontSize="inherit" />
      </IconButton>
      <IconButton onClick={() => handleClick("https://joeljaimon.com/")}>
        <LanguageIcon style={style} fontSize="inherit" />
      </IconButton>
      <IconButton onClick={() => handleClick("https://github.com/joel-jaimon")}>
        <GitHubIcon style={style} fontSize="inherit" />
      </IconButton>
    </div>
  );
};
