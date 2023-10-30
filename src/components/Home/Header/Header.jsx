import React from "react"; // Importação do React
import User from "./User/User"; // Importação do componente User
import UserCircle from "./UserCircle/UserCircle"; // Importação do componente UserCircle
import styles from "./Header.module.css"; // Importação do módulo de estilos específico para o componente

// Componente funcional para o cabeçalho
const Header = (props) => {
  // Função para lidar com o clique nos elementos do cabeçalho
  const handleClick = (e) => {
    props.selecionarUser(e.target.id); // Chama a função passada via propriedade para atualizar o usuário selecionado
  };

  // Renderização do componente de cabeçalho
  return (
    <div className={styles.Master}>
      <div
        id={props.userSelecionado} // Define o ID do elemento com base no usuário selecionado
        onClick={handleClick} // Define a função de clique para o elemento
        className={`${styles.ContainerMasterHeader} , ${
          props.userSelecionado === "Bem-vindo!" ? styles.Loading : ""
        }`} // Aplica a classe de estilo ao contêiner do cabeçalho
      >
        {/* Componente User para exibir o nome do usuário */}
        <User user={props.userSelecionado} />
        {/* Componente UserCircle para exibir o círculo do usuário */}
        <UserCircle user={props.userSelecionado} />
      </div>
    </div>
  );
};

// Exportação do componente Header
export default Header;
