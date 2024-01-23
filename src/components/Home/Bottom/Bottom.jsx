import React from "react"; 
import styles from "./Bottom.module.css"; 
import upArrow from "../../../assets/outros/up-arrow-svgrepo-com.svg"; 

const handleClick = () => {
  document.body.scrollTop = 0; // Rola o corpo da página para o topo (para navegadores Safari)
  document.documentElement.scrollTop = 0; // Rola o elemento raiz (HTML) da página para o topo (para navegadores Chrome, Firefox, IE e Opera)
};

const Bottom = () => {
  return (
    <div
      onClick={handleClick} 
      className={styles.ContainerMasterBottom}
    >
      <img
        onClick={handleClick} 
        className={styles.arrow} 
        src={upArrow}
        alt="Up Arrow" 
      />
    </div>
  );
};

export default Bottom;
