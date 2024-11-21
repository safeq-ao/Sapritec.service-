import { Outlet } from "react-router-dom";
import { Footer } from "./components/footer/Footer";
import Header from "./components/header/Header";
import { useContext, useState } from "react";
import { C_Provider } from "./utils/context/autentication";
import Sidebar from "./components/administrador/sidebar-admin/Sidebar";
import Cadastrar from "./components/login/Cadastrar";


function App() {
  // const {Role}=useContext(C_Provider)
  const Role="cliente"
  return (
    <>
      {Role === "cliente" && (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}

      {Role === "empresa" && (
        <div className="flex">
          <Cadastrar />
        </div>
      )}
    </>
  );
}

export default App;
