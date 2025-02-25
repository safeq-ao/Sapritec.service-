
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar-prestadora/Sidebar";
function HomePrestadora(){
    return(
        <div className="flex">  
        <Sidebar />
        <Outlet/>  
        </div>
    ) 
}

export default HomePrestadora