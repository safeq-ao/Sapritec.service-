import React, { useContext, useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { CProvider } from '../../utils/context/autentication';
const Login = () => {
  // credenciais de login
  const [dados, setDados] = useState({
    email: "",
    senha: "",
  });

  // verificao estado de login do user
  const { logged, setLogged } = useContext(CProvider);
  const navigate = useNavigate();

  //funcao que redirectiona o tela home
  function HandleLogin(event) {
    event.preventDefault();

    if(dados.email.trim() && dados.senha.trim()){
      //funcao que redirectiona o tela home
      setLogged(true);
      navigate("/home");
    }else{
        window.alert("Preencha todos os campos correctamente");
    }



  }

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

      <section className="flex flex-col items-center justify-center">
        <h1 className="font-bold">Bem-vindo de volta</h1>

        <form className="bg-white p-15 flex-col w-[35%] flex gap-5 rounded-2xl">
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
                onChange={(e) => setDados({ ...dados, email: e.target.value })}
              />
            </label>
            <label
              htmlFor="password"
              className="flex flex-col font-semibold gap-2"
            >
              Senha
              <input
                type="password"
                id="password"
                className="border-legenda border outline-none p-2 rounded-[26px]"
                onChange={(e) => setDados({ ...dados, senha: e.target.value })}
              />
              <span className="flex">
                <p>
                  <Link to={"/forgot-password"}>
                    <b className="text-botao">Esqueceu a sua senha?</b>
                  </Link>
                </p>
              </span>
            </label>
          </div>

          <button
            className="p-2 w-full text-white rounded-3xl bg-botao hover:bg-blue-600 text-sm font-medium"
            onClick={HandleLogin}
            type="submit"
          >
            Continuar
          </button>

          <div className="flex items-center justify-center gap-1">
            <hr className="bg-black w-[10%]" />
            ou faça login com
            <hr className="text-black w-[10%]" />
          </div>
          <span className="flex justify-center">
            <FcGoogle size={"40px"} />
          </span>
        </form>
      </section>
    </div>
  );
}

export default Login