import { Outlet } from "react-router-dom";
import { Footer } from "./components/footer/Footer";
import Header from "./components/header/Header";
import { useContext} from "react";
import { CProvider } from "./utils/context/autentication";
import Sidebar from "./components/administrador/sidebar-admin/Sidebar";
import SidebarAdm from "./components/adm/SidebarAdm";
import MainContentAdm from "./components/adm/MainContentAdm";



function App() {

  const role="adm"
  const {logged}=useContext(CProvider)
  return (
    <>
     
      {role === "cliente" && (
        <>
          {logged == true && <Header />}
          <Outlet />
          {logged == true && <Footer />}
        </>
      )}

      {role === "empresa" && (
        <div className="flex">
          <Sidebar />
          <Outlet />
        </div>
      )}
      {role==="adm" &&(
        <div className="flex">
        
        <SidebarAdm/>
        <MainContentAdm/>
        
        </div>
        
      )}
    </>
  );
}

export default App;
