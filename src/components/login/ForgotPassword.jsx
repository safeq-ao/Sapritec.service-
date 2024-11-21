import React from 'react'
import { SlArrowLeft } from "react-icons/sl";
import { Link} from "react-router-dom";


const ForgotPassword = () => {

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

      <div className='flex justify-center'>
        <img src={"/src/utils/image/esqueci_senha.png"}></img>
      </div>

      <section className="flex flex-col items-center justify-center text-sm">
        <h1 className="font-bold">Esqueceu sua senha?</h1>
        <p className="text-legenda">
          Digite seu e-mail para que possamos enviar o link de redefinição de
          senha
        </p>

        <form className="bg-white p-15 flex-col mt-10 w-[35%] flex gap-5 rounded-2xl">
          <div className="flex flex-col gap-5">
            <label
              htmlFor="email"
              className="flex flex-col font-semibold gap-2"
            >
              Email
              <input
                type="email"
                id="email"
                className="border-legenda border outline-none p-2 rounded-[26px]"
              />
            </label>
          </div>

          <button
            className="p-2 w-[100%] text-white rounded-[26px] self-center bg-botao text-sm"
          >
            <Link to={"/verify"}>Enviar e-mail</Link>
          </button>

          <div className="flex justify-center">
            <Link to={"/login"}>
              <p className="flex text-sm items-center gap-2">
                <SlArrowLeft /> Voltar ao login
              </p>
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}

export default ForgotPassword