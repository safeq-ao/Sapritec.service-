import React from "react";
import { SlArrowLeft } from "react-icons/sl";
import { Link } from "react-router-dom";

const PasswordChanged = () => {
  return (
    <div className="bg-white flex-col p-10">
      <header className="flex">
        <h1>
          <b className="text-botao">Sapritec</b>.service
        </h1>

      </header>

      <div className="flex justify-center">
        <img src={"/src/utils/image/chave.png"}></img>
      </div>

      <section className="flex flex-col items-center justify-center text-sm">
        <h1 className="font-bold">Senha alterada!</h1>
        <p className="text-legenda break-word w-[50%] text-center">
          Você concluiu com sucesso sua redefinição de senha!
        </p>

        <form className="bg-white p-15 flex-col mt-10 w-[35%] flex gap-5 rounded-2xl">
          <button className="p-2 w-[100%] text-white rounded-[26px] self-center bg-botao text-sm">
            <Link to={"/login"}>Faça login agora</Link>
          </button>
        </form>
      </section>
    </div>
  );
};

export default PasswordChanged;
