import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import './styles/App.css';
import './styles/Buscador.css';
import './styles/Home.css';
import './styles/HomeAcercaDe.css';
import './styles/HomeNavegacion.css';
import './styles/HeaderText.css';
import './styles/Show.css';
import './styles/Create.css';
import './styles/Edit.css';
import './styles/Responsive.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)