import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./Home.module.css"; 
import { getDados } from "../../services/dados"; 
import Header from "./Header/Header"; 
import Body from "./Body/Body"; 
import Bottom from "./Bottom/Bottom";
import Admin from "./Admin/Admin";

const Home = () => {
  const { state } = useLocation();
  const { login, senha } = state;
  const [dadosDaAPI, setDadosDaAPI] = useState([]);
  const [userSelecionado, setUserSelecionado] = useState("Bem-vindo!"); 
  const [pesquisador, setPesquisador] = useState(""); 
  const [aeroporto, setAeroporto] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchDados();
  }, []);

  async function fetchDados() {
    try {
      const dadosDaAPI = await getDados(login, senha);
      const ids = [...new Set(dadosDaAPI.map((item) => item.id_pesquisador))];
      const nomes = [...new Set(dadosDaAPI.map((item) => item.Pesquisador))];
      const indexNome = ids.indexOf(Number(senha));
      const aeroporto = [...new Set(dadosDaAPI.map((item) => item.ICAO))];

      setDadosDaAPI(dadosDaAPI);
      setAeroporto(aeroporto[0]);

      if (login === "admin" && senha === "admin") {
        setPesquisador("Admin");
        selecionarUser("Admin");
      } else {
        setPesquisador(nomes[indexNome]);
        selecionarUser(nomes[indexNome]);
      }
    } catch (error) {
      console.error("Deu erro no Home - fetchDados", error);
      navigate("/", {
        state: { valido: false },
      });
    }
  }
  const selecionarUser = (user) => {
    if (userSelecionado === pesquisador && userSelecionado !== "Admin") {
      setUserSelecionado(aeroporto);
    } else {
      setUserSelecionado(pesquisador);
    }
    if (userSelecionado === "Bem-vindo!") {
      setUserSelecionado(user);
    }
  };

  return (
    <div key={Date.getTime} className={styles.Home}>
      <Header
        selecionarUser={selecionarUser}
        userSelecionado={userSelecionado}
      />
      {userSelecionado === "Admin" ? (
        <Admin dadosDaAPI={dadosDaAPI} />
      ) : (
        <Body userSelecionado={userSelecionado} dadosDaAPI={dadosDaAPI} />
      )}

      <Bottom />
    </div>
  );
};

export default Home;
