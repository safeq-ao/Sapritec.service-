import { Outlet } from "react-router-dom";
import SidebarPrestadora from "../sidebar/SidebarPrestadora";

function HomePrestadora() {
  return <SidebarPrestadora><Outlet /></SidebarPrestadora>;
}

export default HomePrestadora;