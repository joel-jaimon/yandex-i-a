import React from "react";
import { StyleContext } from "../context/StyleContext";
import { Search } from "./Search/Search";
import { ListItems } from "./ListItems/ListItems";
import styles from "./layout.module.scss";
import { useLazyQuery } from "@apollo/client";
import { debounce } from "./Debounce";
import Header from "./Header/Header";
import {
  FETCH_SEARCH_RESULTS,
  FTECH_SEARCH_COUNTS,
} from "../Apollo/queries/queries";
import {
  LIST_ITEM_TYPE,
  PAGENATION_PARAM_TYPE,
} from "../types/customInterfaces";
import whiteBk from "../Assets/white-back.jpg";
import blackBk from "../Assets/dark-back.jpg";

const white_background = whiteBk;
const black_background = blackBk;

const initialPagenationParam = {
  skip: 0,
  take: 10,
};

export const Layout = () => {
  const { theme } = React.useContext(StyleContext);
  const [searchQuery, setSearchQuery] = React.useState<null | string>();
  const [pagenationParams, setPagenationParams] =
    React.useState<PAGENATION_PARAM_TYPE>(initialPagenationParam);

  const [loadResults, searchResults] = useLazyQuery(FETCH_SEARCH_RESULTS, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
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

    if (!/^[a-zA-Z ]*$/.test(query)) {
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
    }
  };

  React.useEffect(() => {
    (async () => {
      const { fetchMore } = await searchResults;
      try {
        if (pagenationParams.skip === 0) {
          console.log("");
        } else {
          //@ts-ignore
          const _fetch = await fetchMore({
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagenationParams]);

  React.useEffect(() => {
    (async () => {
      const { data } = await searchResults;
      const items: LIST_ITEM_TYPE[] = await data?.searchAnime;

      if (items && totalQueryCount?.data) {
        if (items.length >= totalQueryCount.data.countAnimes) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResults.data, totalQueryCount.data]);

  return (
    <div
      style={{
        background: `linear-gradient(180deg,rgba(0,0,0,0.3), ${
          theme.type === "White" ? "transparent" : "rgba(0,0,0,0.6)"
        }),url(${
          theme.type === "White" ? white_background : black_background
        })`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
      className={styles.layout}
    >
      <Header />
      <div className={`${styles.main} ${styles.df_jc_ac}`}>
        <div
          className={styles.searchContainer}
          style={{
            boxShadow: `0px 0px ${theme.type === "Dark" ? 200 : 0}px black`,
            backgroundColor: theme.theme3,
          }}
        >
          <Search setSearchQuery={debounce(handleInputs, 400)} />
          <ListItems
            hasMore={hasMore}
            searchedQuery={searchQuery}
            searchResults={searchResults}
            setPagenationParams={setPagenationParams}
          />
        </div>
      </div>
    </div>
  );
};
