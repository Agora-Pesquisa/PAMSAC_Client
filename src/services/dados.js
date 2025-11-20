const url = "https://e4dae4708f1c.ngrok-free.app";

async function getDados(login, senha) {
  const data = await fetch(`${url}/PAMSAC/login/${login}/${senha}`, {
    method: "get",
    headers: new Headers({
      "ngrok-skip-browser-warning": "69420",
    }),
  });
  // console.log("services/dados: ", data);

  const newData = await data.json();

  return newData;
}

export { getDados };
