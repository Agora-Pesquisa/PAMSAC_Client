import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import styles from "./Login.module.css"; 
import logoMinisterio from "../../assets/companias/Marca MPor assinatura.png"; 
import logoAgora from "../../assets/companias/agora.svg"; 

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    navigate("/home", {
      state: { login: login, senha: senha },
    });
  }

  const handleChangeLogin = (event) => {
    setLogin(event.target.value);
  };

  const handleChangeSenha = (event) => {
    setSenha(event.target.value);
  };

  return (
    <div className={styles.MediaControler}>
      <div className={styles.LoginMasterContainer}>
        <img
          className={styles.logoAgora}
          src={logoAgora}
          alt="Logo Agora Pesquisas"
        />

        <div className={styles.valido}>
          {location.state === null ? (
            <div>Bem-vindo!</div>
          ) : (
            <div>Login ou senha inválido!</div>
          )}
        </div>

        <div className={styles.formContainer}>
          <form
            className={styles.formLogin}
            onSubmit={handleSubmit}
            action="POST"
          >
            <label>
              <input
                className={styles.inputLogin}
                type="text"
                name="login"
                value={login}
                placeholder="Login"
                onChange={handleChangeLogin}
              />
              <input
                className={styles.inputLogin}
                type="password"
                name="senha"
                value={senha}
                placeholder="Senha"
                onChange={handleChangeSenha}
              />
            </label>
            <input
              className={styles.submitLogin}
              type="submit"
              value="Submit"
            />
          </form>
        </div>
        <img
          className={styles.logoMinisterio}
          src={logoMinisterio}
          alt="Logo Ministério de Portos e Aeroportos"
        />
      </div>
    </div>
  );
};

export default Login;
