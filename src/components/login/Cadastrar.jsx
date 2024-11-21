import React, { useContext } from 'react'
import { FcGoogle } from "react-icons/fc";
import { BiPointer } from "react-icons/bi";
import { FaCalendarCheck, FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
// import { C_Provider } from '../../utils/context/autentication';


const Cadastrar = () => {
    const navigate= useNavigate();

    function HandleLogin(){
       navigate("/login")
    }

  return (
    <div className="bg-fundo flex-col p-10">
      <header>
        <h1>
          <b className="text-botao">Sapritec</b>.service
        </h1>
      </header>

      {/* -------*/}

      <div className="flex items-center gap-20 mt-10 justify-center">
        <section>
          <form className="bg-white p-5 flex-col flex gap-5 rounded-2xl">
            <div>
              <p className="font-bold text-sm">Comece a sua jornada</p>
            </div>
            <div className="flex gap-5">
              <label
                htmlFor="Pnome"
                className="flex flex-col rounded-2xl font-semibold gap-2"
              >
                Primeiro nome
                <input
                  type="text"
                  id="Pnome"
                  className="bg-pesquisar outline-none p-2 w-[250px] rounded-[4px]"
                />
              </label>
              <label
                htmlFor="Snome"
                className="flex flex-col font-semibold gap-2"
              >
                Segundo nome
                <input
                  type="text"
                  id="Snome"
                  className="bg-pesquisar outline-none p-2 w-[250px] rounded-[4px]"
                />
              </label>
            </div>
            <div className="flex flex-col gap-5">
              <label
                htmlFor="email"
                className="flex flex-col font-semibold gap-2"
              >
                Email
                <input
                  type="email"
                  id="email"
                  className="bg-pesquisar outline-none p-2 rounded-[4px]"
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
                  className="bg-pesquisar outline-none p-2 rounded-[4px]"
                />
              </label>
            </div>

            <div className="flex gap-1">
              <input type="checkbox" name="" id="" />
              <p>
                Ao me inscrever, concordo com os
                <b className="text-botao">
                  Termos de Uso e Política de Privacidade
                </b>
              </p>
            </div>

            <button className="p-2 w-[100%] text-white rounded-[4px] self-center bg-botao text-sm" 
            onClick={HandleLogin}>
              Cadastre-se
            </button>

            <div className="flex items-center justify-center gap-1">
              <hr className="bg-black w-[100%]" />
              OU
              <hr className="text-black w-[100%]" />
            </div>
            <span className="flex justify-center">
              <FcGoogle size={"40px"} />
            </span>

            <span className="flex justify-center">
              <p>
                Usuário retornando? <Link to={"/login"}><b className="text-botao">Faça login</b></Link>
              </p>
            </span>
          </form>
        </section>

        <section>
          <h1 className="font-bold">Venha se juntar a nós</h1>

          <ul className="list-none flex flex-col gap-5 text-sm ">
            <li className="flex items-center break-word w-2/3 gap-6">
              <FaSearch size={"40"} color='red' /> Descubra prestadores confiáveis para
              atender às suas necessidades, tudo em um só lugar.
            </li>
            <li className="flex items-center break-word w-2/3 gap-6">
              <BiPointer size={"40"} color='green'/> Acompanhe seus pedidos e acesse serviços
              personalizados diretamente na sua conta.
            </li>
            <li className="flex items-center break-word w-2/3 gap-6">
              <FaCalendarCheck size={"20"} color="orange" />
              Encontre soluções rápidas e seguras para qualquer serviço que
              precisar.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Cadastrar