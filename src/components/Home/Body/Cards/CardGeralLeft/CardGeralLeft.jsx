import React, { useEffect, useState } from "react"; // Importação do React e hooks
import styles from "./CardGeralLeft.module.css"; // Importação do módulo de estilos específico para o componente CardGeralLeft
import CardGeralInfo from "../CardGeralInfo/CardGeralInfo"; // Importação do componente CardGeralInfo
import concluido from "../../../../../assets/faces/concluido.svg"; // Importação da imagem de conclusão
import adiantado from "../../../../../assets/faces/adiantado.svg"; // Importação da imagem de adiantamento
import normal from "../../../../../assets/faces/normal.svg"; // Importação da imagem normal
import muitoAtrasado from "../../../../../assets/faces/muito-atrasado.svg"; // Importação da imagem de muito atraso
import atrasado from "../../../../../assets/faces/atrasado.svg"; // Importação da imagem de atraso

const CardGeralLeft = (props) => {
  // Estado para armazenar a cor secundária e a imagem facial correspondente
  const [secondaryColor, setSecondaryColor] = useState("");
  const [face, setFace] = useState("");

  useEffect(() => {
    // Lógica para determinar a cor e a imagem facial com base nas proporções das companhias e nos valores de faltam
    if (
      props.realAzul / props.diarioAzul > 1.1 ||
      props.realGol / props.diarioGol > 1.1 ||
      props.realLatam / props.diarioLatam > 1.1
    ) {
      setSecondaryColor(styles.adiantadoSecondaryColor);
      setFace(adiantado);
    } if (
      props.realAzul / props.diarioAzul === Infinity ||
      props.realGol / props.diarioGol === Infinity ||
      props.realLatam / props.diarioLatam === Infinity ||
      props.faltamAzul === 0 ||
      props.faltamGol === 0 ||
      props.faltamLatam === 0
    ) {
      setSecondaryColor(styles.concluidoSecondaryColor);
      setFace(concluido);
    }  if (
      (props.realAzul / props.diarioAzul >= 0.8 &&
        props.realAzul / props.diarioAzul < 1.1) ||
      (props.realGol / props.diarioGol >= 0.8 &&
        props.realGol / props.diarioGol < 1.1) ||
      (props.realLatam / props.diarioLatam >= 0.8 &&
        props.realLatam / props.diarioLatam < 1.1)
    ) {
      setSecondaryColor(styles.normalSecondaryColor);
      setFace(normal);
    }  if (
      (props.realAzul / props.diarioAzul <= 0.8 && props.faltamAzul > 0) ||
      (props.realGol / props.diarioGol <= 0.8 && props.faltamGol > 0) ||
      (props.realLatam / props.diarioLatam <= 0.8 && props.faltamLatam > 0)
    ) {
      setSecondaryColor(styles.muitoAtrasadoSecondaryColor);
      setFace(muitoAtrasado);
    } if (
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
    // Contêiner principal do componente CardGeralLeft
    <div className={`${styles.ContainerMasterCardGeralLeft} ${secondaryColor}`}>
      {/* Contêiner do processo e da opção "Todos" */}
      <div className={`${styles.ContainerProcesso}`}>
        <p>{props.processo}</p>
        <p>Todos</p>
      </div>
      
      {/* Contêiner para as informações gerais */}
      <div className={styles.ContainerInfo}>
        <div className={styles.ContainerMasterText}>
          {/* Contêiner para a imagem facial */}
          <div className={styles.ContainerText}>
            <div className={styles.ImageBox}>
              <img className={styles.face} src={face} alt={face} />
            </div>
            {/* Títulos das informações */}
            <p>· Meta </p>
            <p>· Realizados </p>
            <p>· Faltam </p>
            <p>· Diário </p>
          </div>
        </div>
        
        {/* Componente CardGeralInfo para exibir informações da companhia Azul */}
        <CardGeralInfo
          compania={props.companiaAzul}
          realizados={props.realizadoAzul}
          faltam={props.faltamAzul}
          diario={props.diarioAzul}
          real={props.realAzul}
          meta={props.metaAzul}
        />
        
        {/* Componente CardGeralInfo para exibir informações da companhia Gol */}
        <CardGeralInfo
          compania={props.companiaGol}
          realizados={props.realizadoGol}
          faltam={props.faltamGol}
          diario={props.diarioGol}
          real={props.realGol}
          meta={props.metaGol}
        />
        
        {/* Componente CardGeralInfo para exibir informações da companhia Latam */}
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

// Exportação do componente CardGeralLeft
export default CardGeralLeft;
