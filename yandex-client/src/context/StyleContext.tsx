import React from "react";
import { STYLE_CONTEXT_TYPE, THEME_TYPE } from "../types/customInterfaces";

export const themes = {
  dark: {
    type: "Dark",
    theme1: "white",
    theme2: "#544fbb",
    theme3: "rgb(30,30,30)",
    theme4: "black",
    theme5: "#423bc8",
  },
  white: {
    type: "White",
    theme1: "#0C0D14",
    theme2: "#4d4f59",
    theme3: "white",
    theme4: "#CFD1DD",
    theme5: "#f1f1fb",
  },
};

export const StyleContext = React.createContext<STYLE_CONTEXT_TYPE>({
  theme: themes.white,
  setTheme: (x: string) => {},
});

export const StyleContextProvider = ({ children }: any) => {
  const [theme, setTheme] = React.useState<THEME_TYPE>(themes.white);

  React.useEffect(() => {
    const persistedTheme = localStorage.getItem("_theme");
    if (persistedTheme) {
      try {
        setTheme(JSON.parse(persistedTheme));
      } catch {
        console.log("");
      } finally {
        console.log("");
      }
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("_theme", JSON.stringify(theme));
  }, [theme]);

  return (
    <StyleContext.Provider
      value={{
        theme: theme,
        setTheme: setTheme,
      }}
    >
      {children}
    </StyleContext.Provider>
  );
};
