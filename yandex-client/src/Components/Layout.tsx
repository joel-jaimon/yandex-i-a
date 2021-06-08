import React from "react";
import { StyleContext, themes } from "../context/StyleContext";
import { Search } from "./Search/Search";
import { ListItems } from "./ListItems/ListItems";
import styles from "./layout.module.scss";
import { gql, useLazyQuery } from "@apollo/client";

export const Layout = () => {
  const { theme, setTheme } = React.useContext(StyleContext);
  const [searchQuery, setSearchQuery] = React.useState<null | string>();
  const [pagenationParams, setPagenationParams] = React.useState({
    skip: 0,
    take: 30,
  });
  const [loadResults, searchResults] = useLazyQuery(FETCH_SEARCH_RESULTS);

  const handleInputs = async (query: string) => {
    if (!query) {
      console.log("Please type an input to search.");
      return;
    }

    if (!/[A-Za-z]/.test(query)) {
      console.log("Please enter a valid input!.");
      return;
    }
    setSearchQuery(query);
    if (query.length > 2) {
      await loadResults({
        variables: {
          search_query: query,
          skip: pagenationParams.skip,
          take: pagenationParams.take,
        },
      });
    }
  };

  return (
    <div
      style={{
        backgroundColor: theme.theme4,
      }}
      className={styles.layout}
    >
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
          <strong>
            <p>&nbsp;Anime Info</p>
          </strong>
        </div>
        <div
          style={{
            width: "100px",
          }}
          className={styles.df_jc_ac}
        >
          {theme.type === "Dark" ? (
            <svg
              onClick={() => setTheme(themes.white)}
              width="25"
              height="30"
              // fill={theme.theme2}
              className="bi bi-toggle2-off"
              viewBox="0 0 16 16"
            >
              <path d="M9 11c.628-.836 1-1.874 1-3a4.978 4.978 0 0 0-1-3h4a3 3 0 1 1 0 6H9z" />
              <path d="M5 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1A5 5 0 1 0 5 3a5 5 0 0 0 0 10z" />
            </svg>
          ) : (
            <svg
              onClick={() => setTheme(themes.dark)}
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="30"
              // fill={theme.theme2}
              className="bi bi-toggle2-on"
              viewBox="0 0 16 16"
            >
              <path d="M7 5H3a3 3 0 0 0 0 6h4a4.995 4.995 0 0 1-.584-1H3a2 2 0 1 1 0-4h3.416c.156-.357.352-.692.584-1z" />
              <path d="M16 8A5 5 0 1 1 6 8a5 5 0 0 1 10 0z" />
            </svg>
          )}
          <p>&nbsp;{theme.type}</p>
        </div>
      </header>
      <div className={`${styles.main} ${styles.df_jc_ac}`}>
        <div
          className={styles.searchContainer}
          style={{
            boxShadow: `0px 0px 15px ${theme.theme3}`,
          }}
        >
          <Search setSearchQuery={handleInputs} />
          <ListItems
            searchedQuery={searchQuery}
            searchResults={searchResults}
            setPagenationParams={setPagenationParams}
          />
        </div>
      </div>
      <footer></footer>
    </div>
  );
};

const FETCH_SEARCH_RESULTS = gql`
  query FetchAnime($search_query: String!, $take: Float!, $skip: Float!) {
    searchAnime(search_query: $search_query, take: $take, skip: $skip) {
      id
      title
      type
      episodes
      status
      start_airing
      sources
      genres
      duration
      rating
      score
      favorites
    }
  }
`;
