import React from "react";
import { StyleContext, themes } from "../context/StyleContext";
import { Search } from "./Search/Search";
import { ITEM_TYPE, ListItems } from "./ListItems/ListItems";
import styles from "./layout.module.scss";
import { gql, useLazyQuery } from "@apollo/client";
import Switch from "@material-ui/core/Switch";

export interface PAGENATION_PARAM_TYPE {
  skip: number;
  take: number;
}

const initialPagenationParam = {
  skip: 0,
  take: 10,
};

export const Layout = () => {
  const { theme, setTheme } = React.useContext(StyleContext);
  const [searchQuery, setSearchQuery] = React.useState<null | string>();
  const [pagenationParams, setPagenationParams] =
    React.useState<PAGENATION_PARAM_TYPE>(initialPagenationParam);
  const [loadResults, searchResults] = useLazyQuery(FETCH_SEARCH_RESULTS, {
    notifyOnNetworkStatusChange: true,
  });
  const [getQueryCount, totalQueryCount] = useLazyQuery(FTECH_SEARCH_COUNTS, {
    notifyOnNetworkStatusChange: true,
  });

  const [hasMore, setHasMore] = React.useState(false);

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
    setPagenationParams(initialPagenationParam);
    if (query.length > 1) {
      await getQueryCount({
        variables: {
          search_query: query,
        },
      });

      await loadResults({
        variables: {
          search_query: query,
          skip: pagenationParams.skip,
          take: pagenationParams.take,
        },
      });

      return;
    }
  };

  React.useEffect(() => {
    (async () => {
      try {
        if (pagenationParams.skip === 0) {
        } else {
          //@ts-ignore
          const _fetch = await searchResults.fetchMore({
            variables: {
              skip: pagenationParams.skip,
              take: pagenationParams.take,
            },
          });
          return _fetch;
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [pagenationParams]);

  React.useEffect(() => {
    (async () => {
      const { called, loading, data } = await searchResults;
      const items: ITEM_TYPE[] = await data?.searchAnime;

      if (items && totalQueryCount?.data) {
        if (items.length >= totalQueryCount.data.countAnimes) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      }
    })();
  }, [searchResults.data, totalQueryCount.data]);

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
          <Switch
            checked={theme.type === "Dark"}
            onClick={() =>
              setTheme(theme.type === "Dark" ? themes.white : themes.dark)
            }
            color="primary"
            value="dynamic-class-name"
          />
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
            hasMore={hasMore}
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

const FTECH_SEARCH_COUNTS = gql`
  query FetchCount($search_query: String!) {
    countAnimes(search_query: $search_query)
  }
`;

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
