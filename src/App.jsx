import { Link, Outlet } from "react-router-dom";
import { Footer } from "./components/footer/Footer";
import Header from "./components/header/Header";
import { useContext, useEffect, useState } from "react";
import { CProvider } from "./utils/context/autentication";
import Sidebar from "./components/administrador/sidebar-admin/Sidebar";
import SidebarAdm from "./components/adm/SidebarAdm";
import MainContentAdm from "./components/adm/MainContentAdm";
import { SProvider } from "./utils/context/sizes";
import { FaHome, FaSearch } from "react-icons/fa";
import { MdOutline10K, MdChat } from "react-icons/md";

function App() { 
  const { logged, setLogged } = useContext(CProvider);

  
  // useEffect(() => {
    
  //   const token = localStorage.getItem("myTokenUser");
  //   const GetUserInLocalStorage = localStorage.getItem("role");
  //  }, []);

  return (
    <div>
      <div>
        {logged ? (
          <>
            <Header />
            <Outlet />
            <Footer />
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}

export default App;
