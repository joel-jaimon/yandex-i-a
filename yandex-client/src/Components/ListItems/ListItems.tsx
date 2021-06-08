import styles from "./listitem.module.scss";
import React from "react";
import { StyleContext } from "../../context/StyleContext";

interface ITEM_TYPE {
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

export const ListItems = ({ searchResults, searchedQuery }: any) => {
  const { theme } = React.useContext(StyleContext);
  const { called, loading, data } = searchResults;
  const items: ITEM_TYPE[] = data?.searchAnime;

  const observer = React.useRef();
  //@ts-ignore
  const lastItemCallback = React.useCallback(
    (node) => {
      if (loading) return;
      //@ts-ignore
      if (observer.current) observer.current.disconnect();
      //@ts-ignore
      observer.current = new IntersectionObserver((items) => {
        //@ts-ignore
        if (items[0].isIntersecting) {
          console.log("Visible");
        }
      });
      //@ts-ignore
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
    <div className={styles.resultContainer}>
      {items && searchedQuery?.length > 2
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
                    {res.status === "Finished Airing" ? "Completed" : "Ongoing"}
                  </small>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};
