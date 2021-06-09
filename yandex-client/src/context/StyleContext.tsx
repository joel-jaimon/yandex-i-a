import React from "react";

export const themes = {
  dark: {
    type: "Dark",
    theme1: "white",
    theme2: "rgb(200,200,200)",
    theme3: "gray",
    theme4: "rgb(21,21,21)",
  },
  white: {
    type: "White",
    theme1: "#0C0D14",
    theme2: "#4d4f59",
    theme3: "#BEC1CE",
    theme4: "#CFD1DD",
  },
};

interface THEME {
  type: string;
  theme1: string;
  theme2: string;
  theme3: string;
  theme4: string;
}

interface STYLE_TYPE {
  theme: THEME;
  setTheme: React.Dispatch<React.SetStateAction<any>>;
}

export const StyleContext = React.createContext<STYLE_TYPE>({
  theme: themes.white,
  setTheme: (x: string) => {},
});

export const StyleContextProvider = ({ children }: any) => {
  const [theme, setTheme] = React.useState<THEME>(themes.white);
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
