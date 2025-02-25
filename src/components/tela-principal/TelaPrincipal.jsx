import { Outlet } from "react-router-dom";
import { TelaImagem } from "../tela-de-imagem/TelaImagem";
import { PaginaDeBusca } from "../tela-de-pesquisa/PaginaDeBusca.";


function TelaPrincipal() {

  return (
    <>
    <TelaImagem />
    <PaginaDeBusca />
     
    </>
  );
}

export default TelaPrincipal