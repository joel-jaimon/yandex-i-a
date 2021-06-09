export interface THEME_TYPE {
  type: string;
  theme1: string;
  theme2: string;
  theme3: string;
  theme4: string;
  theme5: string;
}

export interface STYLE_CONTEXT_TYPE {
  theme: THEME_TYPE;
  setTheme: React.Dispatch<React.SetStateAction<any>>;
}

export interface PAGENATION_PARAM_TYPE {
  skip: number;
  take: number;
}

export interface LIST_ITEM_TYPE {
  id: number;
  title: string;
  type: string;
  status: string;
  start_airing: string;
  genres: string;
  duration: string;
}
