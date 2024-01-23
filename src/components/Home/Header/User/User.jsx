import React from "react";
import styles from "./User.module.css"; 

const User = (props) => {
  return (
    <div
      id={props.user} 
      className={`${styles.ContainerMasterUser} , ${
        props.user === "Bem-vindo!" ? styles.Loading : ""
      }`} 
    >
      {props.user === "Bem-vindo!" ? (
        <div className={styles.Welcome}>
          <h3>Bem-vindo(a)!</h3>
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
    </div>
  );
};

export default User;
