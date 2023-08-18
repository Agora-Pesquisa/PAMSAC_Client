import React from "react"; // Importação do React
import styles from "./User.module.css"; // Importação do módulo de estilos específico para o componente

// Componente funcional para exibir o nome do usuário
const User = (props) => {
  // Renderização do componente User
  return (
    <div
      id={props.user} // Define o ID do elemento com base no usuário recebido via propriedade
      className={`${styles.ContainerMasterUser} , ${
        props.user === "Bem-vindo!" ? styles.Loading : ""
      }`} // Aplica a classe de estilo ao contêiner do nome do usuário
    >
      {props.user === "Bem-vindo!" ? (
        <div className={styles.Welcome}>
          <h3>Bem-vindo(a) !</h3>
          <h4>Carregando dados...</h4>
          <div className={styles.ldsellipsis}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        props.user
      )}
      {/* Exibe o nome do usuário */}
    </div>
  );
};

// Exportação do componente User
export default User;
