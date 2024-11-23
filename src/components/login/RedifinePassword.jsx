import React from 'react'
import { Link} from "react-router-dom";

const RedifinePassword = () => {

  return (
    <div className="bg-white flex-col p-10">
      <header className="flex">
        <h1>
          <b className="text-botao">Sapritec</b>.service
        </h1>
      </header>

      <div className="flex justify-center">
        <img src={"/src/utils/image/redifine_password.png"}></img>
      </div>

      <section className="flex flex-col items-center justify-center">
        <h1 className="font-bold">Redifinir senha</h1>
        <p className="text-legenda">Por favor, defina a sua nova senha</p>

        <form className="bg-white p-15 flex-col w-[35%] mt-10 flex gap-5 rounded-2xl">
          <div className="flex flex-col gap-5">
            <label
              htmlFor="password"
              className="flex flex-col font-semibold gap-2"
            >
              Nova senha
              <input
                type="password"
                id="password"
                className="border-legenda border outline-none p-2 rounded-[26px]"
              />
            </label>
            <label
              htmlFor="current-password"
              className="flex flex-col font-semibold gap-2"
            >
              Digite novamente a senha
              <input
                type="password"
                id="current-password"
                className="border-legenda border outline-none p-2 rounded-[26px]"
              />
            </label>
          </div>

          <button
            className="p-2 w-[100%] text-white rounded-[26px] self-center bg-botao text-sm"
          >
            <Link to={"/password-checked"}>Enviar senha</Link>
          </button>
        </form>
      </section>
    </div>
  );
}

export default RedifinePassword