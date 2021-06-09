import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { useQuery } from "@apollo/client";
import styles from "./viewmodal.module.scss";
import { StyleContext } from "../../context/StyleContext";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import DateRangeIcon from "@material-ui/icons/DateRange";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { MODAL_DATA_TYPE } from "../../Apollo/queries/queries";

export const ViewModal = ({ open, setOpen, id, setViewId }: any) => {
  const { theme } = React.useContext(StyleContext);
  const { loading, data } = useQuery(MODAL_DATA_TYPE, {
    variables: {
      id,
    },
  });

  const modalData = data?.anime;
  console.log(data);
  const handleClose = () => {
    setViewId(null);
    setOpen(false);
  };

  return (
    <div className={styles.viewModalContainer}>
      <div
        className={styles.subContainer}
        style={{
          backgroundColor: theme.theme3,
          color: theme.theme1,
        }}
      >
        <div className={styles.mHeader}>
          {loading ? (
            <Skeleton
              style={{
                width: "200px",
                height: "34px",
              }}
            />
          ) : (
            <h2>{modalData?.title}</h2>
          )}
          <IconButton>
            <CloseIcon
              onClick={() => handleClose()}
              style={{ color: theme.theme1 }}
            />
          </IconButton>
        </div>
        <div className={styles.mMain}>
          <div className={styles.m1}>
            {loading ? (
              <Skeleton
                style={{
                  width: "50%",
                  height: "24px",
                }}
              />
            ) : (
              <div className={styles.info}>
                <small
                  style={{
                    backgroundColor: theme.theme5,
                  }}
                >
                  <StarBorderIcon fontSize="inherit" />
                  &nbsp;
                  {modalData?.score}
                </small>
                <small
                  style={{
                    backgroundColor: theme.theme5,
                  }}
                >
                  <DateRangeIcon fontSize="inherit" />
                  &nbsp;
                  {modalData?.start_airing.split("/")[2]}
                </small>
                <small
                  style={{
                    backgroundColor: theme.theme5,
                  }}
                >
                  {modalData?.rating}
                </small>
                <small
                  style={{
                    backgroundColor: theme.theme5,
                  }}
                >
                  <ThumbUpIcon fontSize="inherit" />
                  &nbsp;
                  {modalData?.favorites}
                </small>
              </div>
            )}
            {loading ? (
              <div>
                <Skeleton
                  style={{
                    marginTop: "10px",
                    width: "100%",
                    height: "20px",
                  }}
                />
                <Skeleton
                  style={{
                    width: "90%",
                    height: "20px",
                  }}
                />
                <Skeleton
                  style={{
                    width: "70%",
                    height: "20px",
                  }}
                />
              </div>
            ) : (
              <p>{modalData?.desc}</p>
            )}
            {loading ? (
              <Skeleton
                style={{
                  marginTop: "40px",
                  width: "30%",
                  height: "24px",
                }}
              />
            ) : (
              <div className={styles.bullets}>
                {modalData?.genres
                  .split(",")
                  .map((genre: string, i: number) => {
                    return (
                      <span
                        style={{
                          backgroundColor: theme.theme5,
                        }}
                        key={i}
                      >
                        {genre}
                      </span>
                    );
                  })}
              </div>
            )}
          </div>
          {loading ? (
            <div
              style={{
                width: "30%",
              }}
              className={styles.m2}
            >
              <Skeleton
                style={{
                  marginTop: "10px",
                  width: "100%",
                  height: "20px",
                }}
              />
              <Skeleton
                style={{
                  marginTop: "10px",
                  width: "90%",
                  height: "20px",
                }}
              />
              <Skeleton
                style={{
                  marginTop: "10px",
                  width: "70%",
                  height: "20px",
                }}
              />
              <Skeleton
                style={{
                  marginTop: "10px",
                  width: "90%",
                  height: "20px",
                }}
              />
            </div>
          ) : (
            <div className={styles.m2}>
              <p>
                <span
                  style={{
                    color: theme.theme1,
                  }}
                >
                  Episodes:{" "}
                </span>
                {modalData?.episodes}
              </p>
              <p>
                <span
                  style={{
                    color: theme.theme1,
                  }}
                >
                  Status:{" "}
                </span>
                {modalData?.status}
              </p>
              <p>
                <span
                  style={{
                    color: theme.theme1,
                  }}
                >
                  Duration:{" "}
                </span>
                {modalData?.duration}
              </p>
              <p>
                <span
                  style={{
                    color: theme.theme1,
                  }}
                >
                  Studios:{" "}
                </span>
                {modalData?.studios}
              </p>
              <p>
                <span
                  style={{
                    color: theme.theme1,
                  }}
                >
                  Duration:{" "}
                </span>
                {modalData?.duration}
              </p>
              <p>
                <span
                  style={{
                    color: theme.theme1,
                  }}
                >
                  Timings:{" "}
                </span>
                {modalData?.broadcast_time}
              </p>
            </div>
          )}
        </div>
        <div className={styles.mFooter}></div>
      </div>
    </div>
  );
};
