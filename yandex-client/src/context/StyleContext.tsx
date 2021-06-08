import React from "react";

const themes = {
  dark: {
    type: "dark",
    theme1: "",
    theme2: "",
    theme3: "",
  },
  white: {
    type: "white",
    theme1: "",
    theme2: "",
    theme3: "",
  },
};

interface THEME {
  type: string;
  theme1: string;
  theme2: string;
  theme3: string;
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
