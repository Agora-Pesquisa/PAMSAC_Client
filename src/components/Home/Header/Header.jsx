import React from "react"; 
import User from "./User/User"; 
import UserCircle from "./UserCircle/UserCircle"; 
import styles from "./Header.module.css"; 

const Header = (props) => {
  const handleClick = (e) => {
    props.selecionarUser(e.target.id);
  };

  return (
    <div className={styles.Master}>
      <div
        id={props.userSelecionado} 
        onClick={handleClick} 
        className={`${styles.ContainerMasterHeader} , ${
          props.userSelecionado === "Bem-vindo!" ? styles.Loading : ""
        }`} 
      >
        <User user={props.userSelecionado} />
        <UserCircle user={props.userSelecionado} />
      </div>
    </div>
  );
};

export default Header;
