// Importações necessárias do React e React Router DOM
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Importações dos estilos CSS e componentes internos
import styles from "./Home.module.css"; // Importação do módulo de estilos específico para o componente
import { getDados } from "../../services/dados"; // Importação da função para buscar dados da API
import Header from "./Header/Header"; // Importação do componente de cabeçalho
import Body from "./Body/Body"; // Importação do componente de corpo
import Bottom from "./Bottom/Bottom"; // Importação do componente inferior
import Admin from "./Admin/Admin";

// Componente funcional para a página de Home
const Home = () => {
  // Hooks do React para obter dados de localização e navegação
  const { state } = useLocation();

  // Extração dos dados de login e senha do estado
  const { login, senha } = state;

  // Estados para armazenar dados da API e informações de usuário
  const [dadosDaAPI, setDadosDaAPI] = useState([]); // Estado para os dados da API
  const [userSelecionado, setUserSelecionado] = useState("Bem-vindo!"); // Estado para o usuário selecionado
  const [pesquisador, setPesquisador] = useState(""); // Estado para o nome do pesquisador
  const [aeroporto, setAeroporto] = useState(""); // Estado para o código do aeroporto
  const navigate = useNavigate();

  // Efeito para buscar dados da API quando o componente é montado
  useEffect(() => {
    fetchDados();
  }, []);

  // Função assíncrona para buscar dados da API
  async function fetchDados() {
    try {
      // Chama a função para obter dados da API
      const dadosDaAPI = await getDados(login, senha);
      console.log("Dados da API - Home: ", dadosDaAPI);

      // Cria um conjunto de IDs de pesquisadores únicos
      const ids = [...new Set(dadosDaAPI.map((item) => item.id_pesquisador))];
      // Cria um conjunto de nomes de pesquisadores únicos
      const nomes = [...new Set(dadosDaAPI.map((item) => item.Pesquisador))];

      // Encontra o índice do pesquisador atual no conjunto de IDs
      const indexNome = ids.indexOf(Number(senha));
      // Cria um conjunto de códigos de aeroportos únicos
      const aeroporto = [...new Set(dadosDaAPI.map((item) => item.ICAO))];

      // Atualiza os estados com os dados obtidos da API
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
      // Navega de volta para a página de Login com estado inválido
      navigate("/", {
        state: { valido: false },
      });
    }
  }

  // Função para alternar entre exibir nome do pesquisador e código do aeroporto
  const selecionarUser = (user) => {
    // Verifica se o usuário atual é igual ao pesquisador atual
    if (userSelecionado === pesquisador && userSelecionado !== "Admin") {
      // Se sim, exibe o código do aeroporto
      setUserSelecionado(aeroporto);
    } else {
      // Se não, exibe o nome do pesquisador
      setUserSelecionado(pesquisador);
    }

    // Caso o usuário selecionado seja "Bem-vindo!", atualiza para o usuário escolhido
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

// Exportação do componente Home
export default Home;
