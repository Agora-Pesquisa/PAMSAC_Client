const url = "https://1c271e624633.ngrok-free.app";

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
