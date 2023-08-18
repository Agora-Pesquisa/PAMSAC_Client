import React from "react"; // Importação do React
import styles from "./SwitchCategory.module.css"; // Importação do módulo de estilos específico para o componente SwitchCategory
import sideLine from "../../../../assets/outros/SideBar.svg"; // Importação da imagem da linha lateral

// Componente funcional para alternar entre as categorias "Doméstico" e "Internacional"
const SwitchCategory = (props) => {
  // Função chamada ao clicar em um botão de categoria
  const handleClick = (e) => {
    e.preventDefault(); // Evita o comportamento padrão do clique em um link
    props.selecionarModelo(e.target.id); // Chama a função selecionarModelo passada como prop
  };

  return (
    <div className={styles.ContainerMasterSwitchCategory}> {/* Contêiner principal do componente */}
      {/* Botão para a categoria "Doméstico" */}
      <div
        className={`${styles.ContainerButton} ${
          props.modeloSelecionado === "Doméstico" ? styles.Selected : ""
        }`} // Adiciona a classe "Selected" se a categoria atual for "Doméstico"
        onClick={handleClick} // Define o manipulador de evento para o clique no botão
        id={"Doméstico"} // Define o ID da categoria "Doméstico"
      >
        <img className={styles.SideLine} src={sideLine} /> {/* Imagem da linha lateral */}
        <button
          className={`${styles.Button} ${
            props.modeloSelecionado === "Doméstico" ? styles.Selected : ""
          }`} // Adiciona a classe "Selected" se a categoria atual for "Doméstico"
          id={"Doméstico"} // Define o ID da categoria "Doméstico"
        >
          DOMÉSTICO {/* Texto exibido no botão */}
        </button>
      </div>

      {/* Botão para a categoria "Internacional" */}
      <div
        className={`${styles.ContainerButton} ${
          props.modeloSelecionado === "Internacional" ? styles.Selected : ""
        }`} // Adiciona a classe "Selected" se a categoria atual for "Internacional"
        onClick={handleClick} // Define o manipulador de evento para o clique no botão
        id={"Internacional"} // Define o ID da categoria "Internacional"
      >
        <img className={styles.SideLine} src={sideLine} /> {/* Imagem da linha lateral */}
        <button
          className={`${styles.Button} ${
            props.modeloSelecionado === "Internacional" ? styles.Selected : ""
          }`} // Adiciona a classe "Selected" se a categoria atual for "Internacional"
          id={"Internacional"} // Define o ID da categoria "Internacional"
        >
          INTERNACIONAL {/* Texto exibido no botão */}
        </button>
      </div>
    </div>
  );
};

// Exportação do componente SwitchCategory
export default SwitchCategory;
