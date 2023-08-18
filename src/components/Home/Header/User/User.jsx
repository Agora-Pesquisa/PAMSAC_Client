import React from "react"; // Importação do React
import styles from "./User.module.css"; // Importação do módulo de estilos específico para o componente

// Componente funcional para exibir o nome do usuário
const User = (props) => {
  // Renderização do componente User
  return (
    <div
      id={props.user} // Define o ID do elemento com base no usuário recebido via propriedade
      className={styles.ContainerMasterUser} // Aplica a classe de estilo ao contêiner do nome do usuário
    >
      {props.user}{/* Exibe o nome do usuário */}
    </div>
  );
};

// Exportação do componente User
export default User;
