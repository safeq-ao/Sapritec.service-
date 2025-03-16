import {Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CProvider } from "./utils/context/autentication";
import { SProvider } from "./utils/context/sizes";


function App() { 

  const { logged, setLogged } = useContext(CProvider);

  // useEffect(() => {
    
  //   const token = localStorage.getItem("myTokenUser");
  //   const GetUserInLocalStorage = localStorage.getItem("role");
  //  }, []);

  return (
    <div>
      <div>
        {/* {logged ? (
          <>
            <Header />
            <Outlet />
            <Footer />
          </>
        ) : (
          <Outlet />
        )} */}
        <Outlet/>
      </div>
    </div>
  );
}

export default App;
