import React from "react"; // Importação do React
import styles from "./UserCircle.module.css"; // Importação do módulo de estilos específico para o componente

// Componente funcional para exibir o círculo do usuário
const UserCircle = (props) => {
  // Renderização do componente UserCircle
  return (
    <div>
      {/* Retirar essa DIV quando  */}
    </div>
    /*
    <div
     
      id={props.user} // Define o ID do elemento com base no usuário recebido via propriedade
      className={styles.ContainerMasterUserCircle} // Aplica a classe de estilo ao contêiner do círculo do usuário
    >
      <div
        id={props.user} // Define o ID do elemento com base no usuário recebido via propriedade
        className={styles.User} // Aplica a classe de estilo ao elemento de texto do usuário
      >
      {props.user} Exibe o nome do usuário 
      </div>
    </div>
    */
  );
};

// Exportação do componente UserCircle
export default UserCircle;
