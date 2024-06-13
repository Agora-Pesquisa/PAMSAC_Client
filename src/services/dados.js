const url = "https://15a0-20-168-42-226.ngrok-free.app";
//const url = "http://localhost:3000";
//const url = "http://localhost:7000"
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