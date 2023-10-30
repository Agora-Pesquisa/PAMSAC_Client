import React from "react"; // Importação do React
import styles from "./CompanyBox.module.css"; // Importação do módulo de estilos específico para o componente CompanyBox

const CompanyBox = (props) => {
  // Função de tratamento de clique para selecionar a companhia
  const handleClick = (e) => {
    e.preventDefault();

    // Chama a função passada como prop para selecionar a companhia e o logo
    props.selecionarCompania(e.target.id);
    props.selecionarLogo(props.logo);
  };

  // Renderiza o botão da companhia com base nas props recebidas
  return (
    <button
      onClick={handleClick}
      id={props.compania}
      // Adiciona classes de estilo com base nas props recebidas
      className={`${styles.ContainerMasterCompanyBox} ${
        props.compania === props.companiaSelecionada ? styles.Selected : ""
      } ${props.modelo === "Internacional" ? styles.Opaco : ""}`}
    >
      {/* Renderiza a imagem da companhia com base na prop logo */}
      <img id={props.compania} src={props.logo} alt={props.compania} />
    </button>
  );
};

// Exportação do componente CompanyBox
export default CompanyBox;
