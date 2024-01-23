import React from "react";
import styles from "./SwitchCategory.module.css"; 
import sideLine from "../../../../assets/outros/SideBar.svg"; 

const SwitchCategory = (props) => {
  const handleClick = (e) => {
    e.preventDefault(); 
    props.selecionarModelo(e.target.id); 
  };

  return (
    <div className={styles.ContainerMasterSwitchCategory}> 
      <div
        className={`${styles.ContainerButton} ${
          props.modeloSelecionado === "Doméstico" ? styles.Selected : ""
        }`} 
        onClick={handleClick} 
        id={"Doméstico"} 
      >
        <img className={styles.SideLine} src={sideLine} />
        <button
          className={`${styles.Button} ${
            props.modeloSelecionado === "Doméstico" ? styles.Selected : ""
          }`} 
          id={"Doméstico"} 
        >
          DOMÉSTICO
        </button>
      </div>

      <div
        className={`${styles.ContainerButton} ${
          props.modeloSelecionado === "Internacional" ? styles.Selected : ""
        }`} 
        onClick={handleClick} 
        id={"Internacional"} 
      >
        <img className={styles.SideLine} src={sideLine} /> 
        <button
          className={`${styles.Button} ${
            props.modeloSelecionado === "Internacional" ? styles.Selected : ""
          }`} 
          id={"Internacional"} 
        >
          INTERNACIONAL
        </button>
      </div>
    </div>
  );
};

export default SwitchCategory;
