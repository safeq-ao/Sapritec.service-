import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className=" p-20 min-h-screen flex  justify-center bg-fundo">
    
    <h1 className="first-letter:text-botao text-5xl font-bold @keyframes animate-bounce">404</h1>
    <span className="absolute top-1/2 text-xl text-center">
        <p className="">Opps!! Página não encontrada</p>
        <Link to={"/home"}>
            <button className="bg-botao rounded-lg
            p-2 mt-5 text-white">Voltar para o Home</button>
        </Link>
    </span>
    
    </div>
  )
  
};

export default Error404;
