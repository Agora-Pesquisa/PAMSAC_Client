/* URL da API gerada pelo executável do Ngrok */
const url = "https://ebbb-186-192-177-234.ngrok-free.app";

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
  return newData;
}

export { getDados };
