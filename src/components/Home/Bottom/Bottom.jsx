import React from "react"; // Importação do React
import styles from "./Bottom.module.css"; // Importação do módulo de estilos específico para o componente Bottom
import upArrow from "../../../assets/outros/up-arrow-svgrepo-com.svg"; // Importação da imagem da seta para cima

// Função que é chamada ao clicar no componente Bottom para rolar para o topo da página
const handleClick = () => {
  document.body.scrollTop = 0; // Rola o corpo da página para o topo (para navegadores Safari)
  document.documentElement.scrollTop = 0; // Rola o elemento raiz (HTML) da página para o topo (para navegadores Chrome, Firefox, IE e Opera)
};

// Componente funcional para exibir a seta que leva de volta ao topo da página
const Bottom = () => {
  return (
    <div
      onClick={handleClick} // Define o manipulador de evento para o clique no contêiner do componente
      className={styles.ContainerMasterBottom} // Aplica a classe de estilo ao contêiner do componente Bottom
    >
      <img
        onClick={handleClick} // Define o manipulador de evento para o clique na imagem da seta
        className={styles.arrow} // Aplica a classe de estilo à imagem da seta
        src={upArrow} // Define a origem da imagem da seta para cima
        alt="Up Arrow" // Texto alternativo para a imagem
      />
    </div>
  );
};

// Exportação do componente Bottom
export default Bottom;
