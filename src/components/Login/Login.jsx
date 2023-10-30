// Importações necessárias do React e do React Router DOM
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Importações dos estilos CSS e imagens
import styles from "./Login.module.css"; // Importação do módulo de estilos específico para o componente
import logoMinisterio from "../../assets/companias/Marca MPor assinatura.png"; // Importação da imagem do logo do Ministério
import logoAgora from "../../assets/companias/agora.svg"; // Importação da imagem do logo da empresa "Agora Pesquisas"

// Componente funcional para a página de Login
const Login = () => {
  // Hooks do React para gerenciar estado e navegação
  const navigate = useNavigate();
  const location = useLocation();
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  // Função para lidar com o envio do formulário de login
  function handleSubmit(event) {
    event.preventDefault();

    // Navega para a página de Home, passando os dados de login e senha como estado
    navigate("/home", {
      state: { login: login, senha: senha },
    });
  }
  console.log(location.state);

  // Funções para lidar com a alteração dos campos de login e senha
  const handleChangeLogin = (event) => {
    setLogin(event.target.value);
  };

  const handleChangeSenha = (event) => {
    setSenha(event.target.value);
  };

  // Renderização do componente de Login
  return (
    <div className={styles.MediaControler}>
      <div className={styles.LoginMasterContainer}>
        <img
          className={styles.logoAgora}
          src={logoAgora}
          alt="Logo Agora Pesquisas"
        />

        <div className={styles.valido}>
          {/* Condição para exibir mensagem de boas-vindas ou de login inválido */}
          {location.state === null ? (
            <div>Bem-vindo!</div>
          ) : (
            <div>Login ou senha inválido!</div>
          )}
        </div>

        <div className={styles.formContainer}>
          {/* Formulário de login */}
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

// Exportação do componente Login
export default Login;
