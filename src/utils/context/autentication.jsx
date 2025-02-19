import { useState, createContext } from "react";
import { apiFetch } from "../api/api";

export const CProvider = createContext([]);

export default function Context({ children }) {
  
  const [logged, setLogged] = useState(false)
  
    const Login=async (email, senha, )=>{
      try{
        const dados=await apiFetch.post("/cliente/login", {email,senha})
        .then(response=>{
          localStorage.setItem("myTokenUser", response.data.token)
          console.log(response.data)
          setLogged(!logged)
        })
      }catch(error){
        window.alert("Credenciais erradas")
      }
      
    }


  return (
    <CProvider.Provider value={{ logged, setLogged, Login}}>
      {children}
    </CProvider.Provider>
  );
}
