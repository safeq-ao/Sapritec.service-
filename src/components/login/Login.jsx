import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { CProvider } from "../../utils/context/autentication";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../../utils/api/api";

const Login = () => {
  // credenciais de login
  const [dados, setDados] = useState({
    email: "",
    senha: "",
  });

  // verificao estado de login do user
  const { Login } = useContext(CProvider);
  const navigate = useNavigate();

  //funcao que redirectiona o tela home ao fazer login convencional
  async function HandleLogin(event) {

    console.log(e.target)
    event.preventDefault();

    if (dados.email.trim() && dados.senha.trim()) {
 
      await Login(dados.email, dados.senha);
      if (localStorage.getItem("myTokenUser")) {
        navigate("/home");
      }
    } else {
      window.alert("Preencha todos os campos correctamente");
    }
  }

  // google authentication

  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const result = await googleAuth(authResult.code);
        console.log(result);
        navigate("/home");
      } else {
        console.log(authResult);
        throw new Error(authResult);
      }
    } catch (e) {
      console.log("Erro ao carregar o Google Login para autenticação...", e);
    }
  };

  const HandleLoginGoogle = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center">
      <header className="">
        <h1>
          <b className="text-botao">Sapritec</b>.service
        </h1>
      </header>

      <section className="w-[50%] justify-center items-center">
        <form className="bg-white p-10 flex flex-col items-center gap-5 rounded-2xl">
          <div className="flex flex-col items-center gap-5">
            <input
              type="email"
              id="email"
              className="border-legenda border outline-none p-2 w-56
              rounded-[26px]
              "
              placeholder="email"
              onChange={(e) => setDados({ ...dados, email: e.target.value })}
            />
            <input
              type="password"
              id="password"
              className="border-legenda border outline-none p-2 w-56 
              rounded-[26px]"
              placeholder="password"
              onChange={(e) => setDados({ ...dados, senha: e.target.value })}
            />
            <span className="flex">
              <p>
                <Link to={"/forgot-password"}>
                  <b className="text-botao">Esqueceu a sua senha?</b>
                </Link>
              </p>
            </span>
          </div>

          <button
            className="
            p-2  w-56 bg-botao hover:bg-blue-600
           text-white text-sm font-medium rounded-3xl"
            onClick={HandleLogin}
            type="submit"
          >
            Continuar
          </button>

          <div className="flex items-center justify-center gap-1"></div>
          <span className="flex justify-center w-56 cursor-pointer">
            <FcGoogle size={"40px"} onClick={HandleLoginGoogle} />
          </span>
        </form>
      </section>
    </div>
  );
};

export default Login;
