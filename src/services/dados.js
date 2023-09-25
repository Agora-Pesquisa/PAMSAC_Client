/* URL da API gerada pelo executável do Ngrok */

/* cd C:\Codes\plataforma-aeroporto\client */
/* cd C:\Codes\plataforma-aeroporto\server */

const url = "https://4f8b-20-168-42-226.ngrok-free.app";

/* Função que pega as informações dos parametros de Login e senha digitados pelo client e
faz uma requisição para a API com esses parametros*/
async function getDados(login, senha) {
  const data = await fetch(`${url}/${login}/${senha}`, {
    method: "get",
    headers: new Headers({
      "ngrok-skip-browser-warning": "69420",
    }),
  });

  const newData = await data.json();
  console.log("services/dados: ", newData);

  return newData;
}

export { getDados };
