// Importações necessárias para o funcionamento do aplicativo React
import React from "react";
import "./index.css"; // Importação de um arquivo CSS (estilo)
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importações relacionadas à navegação

// Importações dos componentes criados para as páginas Home e Login
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";

// Obtém o elemento com o id "root" para renderização
const root = ReactDOM.createRoot(document.getElementById("root"));

// Renderiza o aplicativo com as rotas definidas
root.render(
  <Router>
    <Routes>
      {/* Define a rota para a página de Login */}
      <Route path="/" element={<Login />} />
      
      {/* Define a rota para a página Home */}
      <Route path="/home" element={<Home />} />
    </Routes>
  </Router>
);
