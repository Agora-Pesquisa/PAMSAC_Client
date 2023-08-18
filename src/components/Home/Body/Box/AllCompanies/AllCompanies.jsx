import React from "react"; // Importação do React
import styles from "./AllCompanies.module.css"; // Importação do módulo de estilos específico para o componente AllCompanies

const AllCompanies = (props) => {
  // Função de clique para limpar o filtro de companhia
  const handleClick = (e) => {
    e.preventDefault();

    // Chama a função selecionarCompania para limpar a seleção da companhia
    props.selecionarCompania(e.target.id);
    
    // Chama a função selecionarLogo para definir o logo como indefinido (undefined)
    props.selecionarLogo(undefined);
  };

  // Renderização do componente AllCompanies
  return (
    <button
      onClick={handleClick}
      id={props.compania}
      className={`${styles.ContainerMasterAllCompanies} ${
        // Verifica se a companhia está selecionada e adiciona a classe Selected se estiver
        props.compania === props.companiaSelecionada ? styles.Selected : ""
      } ${
        // Verifica se o modelo é Internacional e adiciona a classe Opaco se for
        props.modelo === "Internacional" ? styles.Opaco : ""
      }`}
    >
      Limpar Filtro
    </button>
  );
};

// Exportação do componente AllCompanies
export default AllCompanies;
