import styles from "./listitem.module.scss";
import React from "react";
import { StyleContext } from "../../context/StyleContext";
import { LinearProgress } from "@material-ui/core";
import { ViewModal } from "../Modal/ViewModal";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import DoneIcon from "@material-ui/icons/Done";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import {
  LIST_ITEM_TYPE,
  PAGENATION_PARAM_TYPE,
} from "../../types/customInterfaces";

export const ListItems = ({
  hasMore,
  searchResults,
  searchedQuery,
  setPagenationParams,
}: any) => {
  const { theme } = React.useContext(StyleContext);
  const { loading, data } = searchResults;
  const [viewModal, setViewModal] = React.useState(false);
  const [viewId, setViewId] = React.useState<null | number>(null);

  const items: any[] = [
    ...new Set(
      data?.searchAnime?.filter((item: LIST_ITEM_TYPE) => {
        return (
          item.genres.toLowerCase().includes(searchedQuery) ||
          item.type.toLowerCase().includes(searchedQuery) ||
          item.title.toLowerCase().includes(searchedQuery)
        );
      })
    ),
  ];

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loading, hasMore]
  );

  return (
    <React.Fragment>
      <div className={styles.resultContainer}>
        {viewModal ? (
          <ViewModal
            setViewId={setViewId}
            setOpen={setViewModal}
            open={viewModal}
            id={viewId}
          />
        ) : null}
        {items && searchedQuery?.length > 1
          ? items.map((res: LIST_ITEM_TYPE, index: number) => {
              return (
                <div
                  onClick={() => {
                    setViewId(res.id);
                    setViewModal(true);
                  }}
                  ref={items.length === index + 1 ? lastItemCallback : null}
                  key={res.id}
                  className={`${styles.listItems} ${
                    theme.type === "Dark"
                      ? styles.listItems_hv_dark
                      : styles.listItems_hv_white
                  }`}
                >
                  <div>
                    <strong
                      style={{
                        color: theme.theme1,
                      }}
                    >
                      <p>
                        {res.title.slice(0, 50)}
                        {res.title[50] ? "..." : ""}
                      </p>
                    </strong>
                    <div className={styles.listSubInfo}>
                      <small
                        style={{
                          backgroundColor: theme.theme5,
                          color: theme.theme1,
                        }}
                      >
                        <AccessTimeIcon fontSize="inherit" />
                        &nbsp;{res.duration.split(".")[0]}
                      </small>
                      <small
                        style={{
                          backgroundColor: theme.theme5,
                          color: theme.theme1,
                        }}
                      >
                        <CalendarTodayIcon fontSize="inherit" />
                        &nbsp;{res.start_airing}
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
                    <small
                      style={{
                        color:
                          theme.type === "White" ? theme.theme3 : theme.theme1,
                      }}
                    >
                      {res.status === "Finished Airing" ? (
                        <>
                          <DoneIcon fontSize="inherit" />
                          &nbsp;{"Completed"}
                        </>
                      ) : (
                        <>
                          <HourglassEmptyIcon fontSize="inherit" />
                          &nbsp;{"Ongoing"}
                        </>
                      )}
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
            height: "2px",
          }}
        />
      ) : null}
    </React.Fragment>
  );
};
