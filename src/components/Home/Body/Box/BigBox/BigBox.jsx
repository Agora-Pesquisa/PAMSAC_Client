import React, { useEffect, useState } from "react"; 
import styles from "./BigBox.module.css"; 

const BigBox = (props) => {
  const [primaryColor, setPrimaryColor] = useState("");
  const [secondaryColor, setSecondaryColor] = useState(""); 

  useEffect(() => {
    if (props.real / props.diario <= 0.6) {
      setPrimaryColor(styles.muitoAtrasadoPrimaryColor);
      setSecondaryColor(styles.muitoAtrasadoSecondaryColor);
    }
    if (props.real / props.diario >= 0.6 && props.real / props.diario < 0.8) {
      setPrimaryColor(styles.atrasadoPrimaryColor);
      setSecondaryColor(styles.atrasadoSecondaryColor);
    }
    if (props.real / props.diario >= 0.8 && props.real / props.diario < 1.1) {
      setPrimaryColor(styles.normalPrimaryColor);
      setSecondaryColor(styles.normalSecondaryColor);
    }
    if (props.real / props.diario >= 1.1 ||  props.diario === 0 && props.faltam >= 1) {
      setPrimaryColor(styles.adiantadoPrimaryColor);
      setSecondaryColor(styles.adiantadoSecondaryColor);
    }
    if (props.real / props.diario === Infinity || props.subPercentageTotal - props.subPercentageFeito <= 0) {
      setPrimaryColor(styles.concluidoPrimaryColor);
      setSecondaryColor(styles.concluidoSecondaryColor);
    }
  }, [props.diario, props.real]);

  return (
    <div className={styles.ContainerMasterBigBox}>
      <div className={`${styles.BigBox} ${secondaryColor}`}>
        <div className={`${styles.Title} ${primaryColor}`}>{props.Title}</div>
        <div className={styles.PercentagemContainer}>
          <div className={styles.Percentage}>{props.Percentage}%</div>
          <div className={styles.line}></div>
          <div
            className={`${styles.subPercentage} ${styles.subPercentageEspaco}`}
          >
            {props.subPercentageFeito}
            <div className={styles.subPercentage}>
              de {props.subPercentageTotal}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigBox;
