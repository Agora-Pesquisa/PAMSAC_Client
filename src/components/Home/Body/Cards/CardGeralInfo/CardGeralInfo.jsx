import React, { useEffect, useState } from "react"; // Importação do React e hooks
import styles from "./CardGeralInfo.module.css"; // Importação do módulo de estilos específico para o componente CardGeralInfo

const CardGeralInfo = (props) => {
  // Estado para armazenar a cor secundária das informações
  const [secondaryColorInfo, setSecondaryColorInfo] = useState("");

  useEffect(() => {
    // Lógica para determinar a cor secundária com base na proporção real/diário e no valor de faltam
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
    // Contêiner principal das informações gerais
    <div className={`${styles.ContainerMasterText} ${secondaryColorInfo}`}>
      {/* Contêiner para a imagem da companhia */}
      <div className={styles.ContainerCompania}>
        <img className={styles.image} src={props.compania} alt="Compania" />
      </div>
      {/* Contêiner para os textos das informações */}
      <div className={styles.ContainerText}>
        <p>{props.meta}</p>
        <p>{props.realizados}</p>
        <p>{props.faltam}</p>
        <p>{props.diario < 0 || props.faltam === 0 ? 0 : props.diario === 0 && props.faltam >= 1 ? 1 : props.diario === Infinity ? 0 : props.diario}</p>

      </div>
    </div>
  );
};

// Exportação do componente CardGeralInfo
export default CardGeralInfo;
