import React from "react";
import { SlArrowLeft } from "react-icons/sl";
import { Link } from "react-router-dom";

const VerifyEmail = () => {
  return (
    <div className="bg-white flex-col p-10">
      <header className="flex justify-between">
        <h1>
          <b className="text-botao">Sapritec</b>.service
        </h1>
        <p>
          Não tem uma conta?
          <Link to={"/"}>
            <b className="text-botao"> Cadastre-se agora</b>
          </Link>
        </p>
      </header>

      <div className="flex justify-center">
        <img src={"/src/utils/image/verify_email.png"}></img>
      </div>

      <section className="flex flex-col items-center justify-center text-sm">
        <h1 className="font-bold">Verifique seu e-mail!</h1>
        <p className="text-legenda break-word w-[50%] text-center">
          Obrigado! Foi enviado um e-mail solicitando que você clique em um link
          para verificar que você possui esta conta. Se você não receber o
          e-mail, entre em contato com suporte@sapritec.com
        </p>

        <form className="bg-white p-15 flex-col mt-10 w-[35%] flex gap-5 rounded-2xl">
          <button className="p-2 w-[100%] text-white rounded-[26px] self-center bg-botao text-sm">
            <Link to={""}>Abrir caixa de entrada de e-mail</Link>
          </button>

          <div className="flex justify-center">
            <Link to={"/forgot-password"}>
              <p className="flex text-sm items-center gap-2">
                <SlArrowLeft /> Reenviar e-mail
              </p>
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default VerifyEmail;
