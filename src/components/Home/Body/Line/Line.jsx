import React from "react";
import styles from "./Line.module.css";

const Line = () => {
  return (
    <div className={styles.ContainerMasterLine}>
      <div className={styles.LineYellow}></div>
      <div className={styles.LineRed}></div>
    </div>
  );
};

export default Line;
