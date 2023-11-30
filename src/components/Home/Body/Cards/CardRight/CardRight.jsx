import React, { useEffect, useState } from "react"; // Importação do React e hooks
import styles from "./CardRight.module.css"; // Importação do módulo de estilos específico para o componente CardRight
import concluido from "../../../../../assets/faces/concluido.svg"; // Importação da imagem de conclusão
import adiantado from "../../../../../assets/faces/adiantado.svg"; // Importação da imagem de adiantamento
import normal from "../../../../../assets/faces/normal.svg"; // Importação da imagem normal
import atrasado from "../../../../../assets/faces/atrasado.svg"; // Importação da imagem de atraso
import muitoAtrasado from "../../../../../assets/faces/muito-atrasado.svg"; // Importação da imagem de muito atraso

// Componente funcional para exibir informações de um processo
const CardRight = (props) => {
  // Estado para armazenar a cor secundária e a imagem facial correspondente
  const [secondaryColor, setSecondaryColor] = useState("");
  const [face, setFace] = useState("");

  // Efeito para determinar a cor e a imagem facial com base nas proporções de realização e diário
  useEffect(() => {
    // Definindo a cor secundária e a imagem facial com base nas proporções
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
    // Contêiner principal do componente CardRight
    <div className={`${styles.ContainerMasterCardRight} ${secondaryColor}`}>
      {/* Contêiner do topo do cartão */}
      <div
        className={`${styles.TopCardContainer} ${
          props.processo === "Desembarque" || props.processo === "Embarque"
            ? styles.Pesquisa
            : ""
        }`}
      >
        <p>{props.processo}</p> {/* Título do processo */}
      </div>
      {/* Subcontêiner para as informações do cartão */}
      <div className={styles.subContainerMasterCardRight}>
        {/* Contêiner para a imagem facial */}
        <div className={styles.ContainerImage}>
          {/* Imagem facial */}
          <img className={styles.face} src={face} alt={face} />
          {/* Imagem da companhia (se disponível) para o estrato Doméstico */}
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
        {/* Contêiner para as informações do cartão */}
        <div className={` ${styles.ContainerMasterInfo}`}>
          {/* Informações sobre a meta */}
          <div className={styles.ContainerInfo}>
            <p>· Meta</p>
            <p>{props.meta}</p>
          </div>
          {/* Informações sobre realizados */}
          <div className={styles.ContainerInfo}>
            <p>· Realizados</p>
            <p>{props.realizados}</p>
          </div>
          {/* Informações sobre o que falta */}
          <div className={styles.ContainerInfo}>
            <p>· Faltam</p>
            <p>{props.faltam}</p>
          </div>
          {/* Informações sobre o diário */}
          <div className={styles.ContainerInfo}>
            <p>· Diário</p>
            <p>{props.diario < 0 || props.faltam === 0 ? 0 : props.diario === 0 && props.faltam >= 1 ? 1 : props.diario}</p>

          </div>
        </div>
      </div>
    </div>
  );
};

// Exportação do componente CardRight
export default CardRight;
