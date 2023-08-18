import React from "react";
import styles from "./Line.module.css";

const Line = (props) => {
  return (
    <div className={styles.ContainerMasterLine}>
      <div className={`${props.loading === true ? styles.LineYellowLoading : styles.LineYellow}`}></div>
      <div className={`${props.loading === true ? styles.LineRedLoading : styles.LineRed}`}></div>
    </div>
  );
};

export default Line;
