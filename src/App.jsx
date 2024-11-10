import { Outlet } from "react-router-dom";
import { Footer } from "./components/footer/Footer";
import Header from "./components/header/Header";
import Sidebar from "./components/administrador/sidebar-admin/Sidebar";
import HomeAdmin from "./components/administrador/Home-admin/HomeAdmin";
import MenuMensagem from "./components/chat/MenuMensagem";
import { ChatUser } from "./components/tela-chat-usuario/chatUser";
import CorpoChat from "./components/chat/CorpoChat";
import Detalhe from "./components/chat/Detalhe";
import { useContext, useState } from "react";
import { C_Provider } from "./utils/context/autentication";
import Dashboard from "./components/administrador/dashboard-admin/Dashboard";
import Resumo from "./components/administrador/resumo-pedidos/Resumo";
import Pedidos from "./components/administrador/pedidos-recebidos/Pedidos";
import Historico from "./components/administrador/historico-pedidos/Historico";
import Pagamentos from "./components/administrador/pagamentos-transacoes/Pagamentos";


function App() {
  const {ShowSom, setShowSom} = useContext(C_Provider)
  const role = "empresa";

  return (
    <>
      {role == "empresa" ? (
        <div className="flex">
          <Sidebar />

          {
          ShowSom === 1 ? (
            <Dashboard />
          ) : ShowSom === 2 ? (
            <Resumo />
          ) : ShowSom === 3 ? (
            <Pedidos />
          ) : ShowSom === 4 ?(
            <Historico /> 
          ):ShowSom===5 ?(
            <HomeAdmin/>
          ):ShowSom===6?(
            <Pagamentos/>
          ):(
            <Dashboard/>
          )
          }
        </div>
      ) : (
        <div className="">
          <Header />
          <Outlet />
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
