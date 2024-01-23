import React, { useEffect, useState } from "react"; 
import styles from "./CardGeralInfo.module.css"; 

const CardGeralInfo = (props) => {
  const [secondaryColorInfo, setSecondaryColorInfo] = useState("");

  useEffect(() => {
    if (props.real / props.diario <= 0.7) {
      setSecondaryColorInfo(styles.muitoAtrasadoSecondaryColor);
    }
    if (props.real / props.diario >= 0.5 && props.real / props.diario < 0.7) {
      setSecondaryColorInfo(styles.atrasadoSecondaryColor);
    }
    if (props.real / props.diario >= 0.7 && props.real / props.diario < 1.1) {
      setSecondaryColorInfo(styles.normalSecondaryColor);
    }
    if (props.real / props.diario >= 1.1 ||  props.diario === 0 && props.faltam >= 1) {
      setSecondaryColorInfo(styles.adiantadoSecondaryColor);
    }
    if (props.faltam === 0) {
      setSecondaryColorInfo(styles.concluidoSecondaryColor);
    }
  }, [props.real, props.diario]);

  return (
    <div className={`${styles.ContainerMasterText} ${secondaryColorInfo}`}>
      <div className={styles.ContainerCompania}>
        <img className={styles.image} src={props.compania} alt="Compania" />
      </div>
      <div className={styles.ContainerText}>
        <p>{props.meta}</p>
        <p>{props.realizados}</p>
        <p>{props.faltam}</p>
        <p>{props.diario < 0 || props.faltam === 0 ? 0 : props.diario === 0 && props.faltam >= 1 ? 1 : props.diario == Infinity ? props.faltam : props.diario}</p>
      </div>
    </div>
  );
};

// Exportação do componente CardGeralInfo
export default CardGeralInfo;
