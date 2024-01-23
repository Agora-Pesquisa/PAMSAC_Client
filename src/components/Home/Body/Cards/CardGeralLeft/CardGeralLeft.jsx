import React, { useEffect, useState } from "react"; 
import styles from "./CardGeralLeft.module.css"; 
import CardGeralInfo from "../CardGeralInfo/CardGeralInfo"; 
import concluido from "../../../../../assets/faces/concluido.svg"; 
import adiantado from "../../../../../assets/faces/adiantado.svg"; 
import normal from "../../../../../assets/faces/normal.svg"; 
import muitoAtrasado from "../../../../../assets/faces/muito-atrasado.svg";
import atrasado from "../../../../../assets/faces/atrasado.svg"; 

const CardGeralLeft = (props) => {
  const [secondaryColor, setSecondaryColor] = useState("");
  const [face, setFace] = useState("");

  useEffect(() => {
    if (
      props.realAzul / props.diarioAzul > 1.1 ||
      props.realGol / props.diarioGol > 1.1 ||
      props.realLatam / props.diarioLatam > 1.1 ||
      (props.diarioAzul === 0 && props.faltamAzul >= 1) ||
      (props.diarioGol === 0 && props.faltamGol >= 1) ||
      (props.diarioLatam === 0 && props.faltamLatam >= 1)
    ) {
      setSecondaryColor(styles.adiantadoSecondaryColor);
      setFace(adiantado);
    }
    if (
      props.faltamAzul === 0 ||
      props.faltamGol === 0 ||
      props.faltamLatam === 0
    ) {
      setSecondaryColor(styles.concluidoSecondaryColor);
      setFace(concluido);
    }
    if (
      (props.realAzul / props.diarioAzul >= 0.8 &&
        props.realAzul / props.diarioAzul < 1.1) ||
      (props.realGol / props.diarioGol >= 0.8 &&
        props.realGol / props.diarioGol < 1.1) ||
      (props.realLatam / props.diarioLatam >= 0.8 &&
        props.realLatam / props.diarioLatam < 1.1)
    ) {
      setSecondaryColor(styles.normalSecondaryColor);
      setFace(normal);
    }
    if (
      (props.realAzul / props.diarioAzul <= 0.8 &&
        props.faltamAzul > 0 &&
        !(props.diarioAzul === 0 && props.faltamAzul >= 1)) ||
      (props.realGol / props.diarioGol <= 0.8 &&
        props.faltamGol > 0 &&
        !(props.diarioGol === 0 && props.faltamGol >= 1)) ||
      (props.realLatam / props.diarioLatam <= 0.8 &&
        props.faltamLatam > 0 &&
        !(props.diarioLatam === 0 && props.faltamLatam >= 1))
    ) {
      setSecondaryColor(styles.muitoAtrasadoSecondaryColor);
      setFace(muitoAtrasado);
    }
    if (
      (props.realAzul / props.diarioAzul >= 0.6 &&
        props.realAzul / props.diarioAzul < 0.8) ||
      (props.realGol / props.diarioGol >= 0.6 &&
        props.realGol / props.diarioGol < 0.8) ||
      (props.realLatam / props.diarioLatam >= 0.6 &&
        props.realLatam / props.diarioLatam < 0.8)
    ) {
      setSecondaryColor(styles.atrasadoSecondaryColor);
      setFace(atrasado);
    }
  }, [
    props.diarioAzul,
    props.diarioGol,
    props.diarioLatam,
    props.realAzul,
    props.realGol,
    props.realLatam,
  ]);

  return (
    <div className={`${styles.ContainerMasterCardGeralLeft} ${secondaryColor}`}>
      <div className={`${styles.ContainerProcesso}`}>
        <p>{props.processo}</p>
      </div>

      <div className={styles.ContainerInfo}>
        <div className={styles.ContainerMasterText}>
          <div className={styles.ContainerText}>
            <div className={styles.ImageBox}>
              <img className={styles.face} src={face} alt={face} />
            </div>
            <p>· Meta </p>
            <p>· Realizados </p>
            <p>· Faltam </p>
            <p>· Diário </p>
          </div>
        </div>

        <CardGeralInfo
          compania={props.companiaAzul}
          realizados={props.realizadoAzul}
          faltam={props.faltamAzul}
          diario={props.diarioAzul}
          real={props.realAzul}
          meta={props.metaAzul}
        />

        <CardGeralInfo
          compania={props.companiaGol}
          realizados={props.realizadoGol}
          faltam={props.faltamGol}
          diario={props.diarioGol}
          real={props.realGol}
          meta={props.metaGol}
        />

        <CardGeralInfo
          processo={props.processoLatam}
          compania={props.companiaLatam}
          realizados={props.realizadoLatam}
          faltam={props.faltamLatam}
          diario={props.diarioLatam}
          real={props.realLatam}
          meta={props.metaLatam}
        />
      </div>
    </div>
  );
};

export default CardGeralLeft;
