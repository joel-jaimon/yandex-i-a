import styles from "./listitem.module.scss";
import React from "react";
import { StyleContext } from "../../context/StyleContext";
import { LinearProgress } from "@material-ui/core";
import { PAGENATION_PARAM_TYPE } from "../Layout";

export interface ITEM_TYPE {
  id: number;
  title: string;
  type: string;
  episodes: string;
  status: string;
  start_airing: string;
  sources: string;
  genres: string;
  duration: string;
  rating: number;
  score: number;
  favorites: number;
}

export const ListItems = ({
  hasMore,
  searchResults,
  searchedQuery,
  setPagenationParams,
}: any) => {
  const { theme } = React.useContext(StyleContext);
  const { called, loading, data, fetchMore } = searchResults;
  const items: any[] = data?.searchAnime;

  const observer = React.useRef();
  //@ts-ignore
  const lastItemCallback = React.useCallback(
    (node) => {
      if (loading) return;
      //@ts-ignore
      if (observer.current) observer.current.disconnect();
      //@ts-ignore
      observer.current = new IntersectionObserver((items) => {
        if (items[0].isIntersecting && hasMore) {
          setPagenationParams((pagenationParams: PAGENATION_PARAM_TYPE) => {
            return {
              skip: pagenationParams.skip + 10,
              take: pagenationParams.take,
            };
          });
        }
      });
      //@ts-ignore
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <React.Fragment>
      <div className={styles.resultContainer}>
        {items && searchedQuery?.length > 1
          ? items.map((res: ITEM_TYPE, index: number) => {
              return (
                <div
                  ref={items.length === index + 1 ? lastItemCallback : null}
                  key={res.id}
                  className={styles.listItems}
                >
                  <div>
                    <strong>
                      <p>
                        {res.title.slice(0, 50)}
                        {res.title[50] ? "..." : ""}
                      </p>
                    </strong>
                    <div className={styles.listSubInfo}>
                      <small
                        style={{
                          backgroundColor: theme.theme4,
                        }}
                      >
                        {res.duration.split(".")[0]}
                      </small>
                      <small
                        style={{
                          backgroundColor: theme.theme4,
                        }}
                      >
                        {res.start_airing}
                      </small>
                    </div>
                  </div>
                  <div
                    style={{
                      backgroundColor: theme.theme2,
                      color: theme.theme4,
                    }}
                    className={styles.bullets}
                  >
                    <small>
                      {res.status === "Finished Airing"
                        ? "Completed"
                        : "Ongoing"}
                    </small>
                  </div>
                </div>
              );
            })
          : null}
      </div>
      {loading ? (
        <LinearProgress
          color="primary"
          style={{
            width: "100%",
          }}
        />
      ) : null}
    </React.Fragment>
  );
};
