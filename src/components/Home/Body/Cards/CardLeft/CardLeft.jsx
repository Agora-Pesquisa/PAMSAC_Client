import React, { useEffect, useState } from "react"; 
import styles from "./CardLeft.module.css"; 
import concluido from "../../../../../assets/faces/concluido.svg"; 
import adiantado from "../../../../../assets/faces/adiantado.svg"; 
import normal from "../../../../../assets/faces/normal.svg"; 
import atrasado from "../../../../../assets/faces/atrasado.svg";
import muitoAtrasado from "../../../../../assets/faces/muito-atrasado.svg"; 

const CardLeft = (props) => {
  const [secondaryColor, setSecondaryColor] = useState("");
  const [face, setFace] = useState("");

  useEffect(() => {
    if (props.real / props.diario <= 0.6) {
      setSecondaryColor(styles.muitoAtrasadoSecondaryColor);
      setFace(muitoAtrasado);
    }
    if (props.real / props.diario >= 0.6 && props.real / props.diario < 0.8) {
      setSecondaryColor(styles.atrasadoSecondaryColor);
      setFace(atrasado);
    }
    if (props.real / props.diario >= 0.8 && props.real / props.diario < 1.1) {
      setSecondaryColor(styles.normalSecondaryColor);
      setFace(normal);
    }
    if (props.real / props.diario >= 1.1 ||  props.diario === 0 && props.faltam >= 1) {
      setSecondaryColor(styles.adiantadoSecondaryColor);
      setFace(adiantado);
    }
    if (props.faltam === 0) {
      setSecondaryColor(styles.concluidoSecondaryColor);
      setFace(concluido);
    }
  }, [props.diario, props.real]);

  return (
    <div className={`${styles.ContainerMasterCardLeft} ${secondaryColor} `}>
      <div
        className={`${styles.TopCardContainer} ${
          props.processo === "Desembarque" || props.processo === "Embarque"
            ? styles.Pesquisa
            : ""
        }`}
      >
        <p>{props.processo}</p> 
      </div>
      <div className={styles.subContainerMasterCardLeft}>
        <div className={styles.ContainerImage}>
          <img className={styles.face} src={face} alt={face} />
          {props.imageCompaniaSrc !== undefined &&
          props.estrato === "Doméstico" ? (
            <img
              className={styles.compania}
              src={props.imageCompaniaSrc}
              alt={props.imageCompaniaSrc}
            />
          ) : (
            ""
          )}
        </div>
        <div className={` ${styles.ContainerMasterInfo}`}>
          <div className={styles.ContainerInfo}>
            <p>· Meta</p>
            <p>{props.meta}</p>
          </div>
          <div className={styles.ContainerInfo}>
            <p>· Realizados</p>
            <p>{props.realizados}</p>
          </div>
          <div className={styles.ContainerInfo}>
            <p>· Faltam</p>
            <p>{props.faltam}</p>
          </div>
          <div className={styles.ContainerInfo}>
            <p>· Diário</p>
            <p>{props.diario < 0 || props.faltam === 0 ? 0 : props.diario === 0 && props.faltam >= 1 ? 1 : props.diario == Infinity ? props.faltam : props.diario}</p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CardLeft;
