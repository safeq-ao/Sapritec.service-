import React, { useContext, useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { BiPointer } from "react-icons/bi";
import { FaCalendarCheck, FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
// import { C_Provider } from '../../utils/context/autentication';


const CadastrarPrestador = () => {
    const navigate= useNavigate();

  
    const [checkConfirm, setCheckConfirm] = useState(false);

  return (
    <div className="bg-fundo flex-col p-10">
      <header>
        <h1>
          <b className="text-botao">Sapritec</b>.service
        </h1>
      </header>

      {/* -------*/}

      <div className="flex gap-20 mt-10">
        <section>
          <form className="bg-white p-5 flex-col flex gap-5 rounded-2xl">
            <div>
              <p className="font-bold text-sm">Comece a sua jornada</p>
            </div>
            <div className="flex gap-5">
              <label
                htmlFor="empresaNome"
                className="flex flex-col rounded-2xl font-semibold gap-2"
              >
                Nome da empresa
                <input
                  type="text"
                  id="empresaNome"
                  className="bg-pesquisar outline-none p-2 w-[250px] rounded-[4px]"
                />
              </label>
              <label
                htmlFor="Tel"
                className="flex flex-col font-semibold gap-2"
              >
                Telefone
                <input
                  type="tel"
                  id="Tel"
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
              <label
                htmlFor="Cpassword"
                className="flex flex-col font-semibold gap-2"
              >
                Confirmar senha
                <input
                  type="Cpassword"
                  id="Cpassword"
                  className="bg-pesquisar outline-none p-2 rounded-[4px]"
                />
              </label>
            </div>

            <div className="flex flex-col gap-5">
              <label
                htmlFor="descricao"
                className="flex flex-col font-semibold gap-2"
              >
                Descreva a sua empresa
                <textarea
                  id="descricao"
                  name="w3review"
                  rows="4"
                  cols="50"
                  className="bg-pesquisar outline-none p-2 rounded-[4px]"
                ></textarea>
              </label>
              <label
                htmlFor="horario"
                className="flex flex-col font-semibold gap-2"
              >
                Disponibilidade de atendimento
                <input
                  type="text"
                  id="horario"
                  placeholder='Ex: "Segunda-Feira a Sexta-Feira | 10:00 - 18:00"'
                  className="bg-pesquisar outline-none p-2 rounded-[4px]"
                />
              </label>
              <label
                htmlFor="localizacao"
                className="flex flex-col font-semibold gap-2"
              >
                Localização
                <input
                  type="text"
                  id="localizacao"
                  className="bg-pesquisar outline-none p-2 rounded-[4px]"
                />
              </label>
            </div>

            <div className="flex gap-5">
              <label
                htmlFor="logotipo"
                className="flex flex-col rounded-2xl font-semibold gap-2"
              >
                Logotipo da empresa
                <input
                  type="text"
                  id="logotipo"
                  className="bg-pesquisar outline-none p-2 w-[250px] rounded-[4px]"
                />
              </label>
              <label
                htmlFor="site"
                className="flex flex-col font-semibold gap-2"
              >
                Site
                <input
                  type="url"
                  id="site"
                  className="bg-pesquisar outline-none p-2 w-[250px] rounded-[4px]"
                />
              </label>
            </div>

            <div className="flex gap-1">
              <input
                type="checkbox"
                name=""
                id=""
                onClick={() => setCheckConfirm(!checkConfirm)}
              />
              <p>
                Ao me inscrever, concordo com os
                <b className="text-botao">
                  {" "}
                  Termos de Uso e Política de Privacidade
                </b>
              </p>
            </div>

            <button
              className={`p-2 w-[100%] text-white rounded-[4px] self-center text-sm ${
                checkConfirm
                  ? "bg-botao opacity-100 cursor-pointer"
                  : "bg-botao opacity-30 cursor-default"
              }`}
              onClick={() => {
                checkConfirm ? navigate("/login") : navigate(-1);
              }}
            >
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
                Usuário retornando?{" "}
                <Link to={"/login"}>
                  <b className="text-botao">Faça login</b>
                </Link>
              </p>
            </span>
          </form>
        </section>

        <section>
          <h1 className="font-bold">Venha se juntar a nós</h1>

          <ul className="list-none flex flex-col gap-5 text-sm ">
            <li className="flex items-center break-word w-2/3 gap-6">
              <FaSearch size={"40"} color="red" /> Encontre clientes em busca
              dos seus serviços, tudo em um só lugar.
            </li>
            <li className="flex items-center break-word w-2/3 gap-6">
              <BiPointer size={"40"} color="green" /> Gerencie seus atendimentos
              e acompanhe seus pedidos diretamente na sua conta.
            </li>
            <li className="flex items-center break-word w-2/3 gap-6">
              <FaCalendarCheck size={"20"} color="orange" /> Ofereça soluções
              rápidas e seguras para clientes que precisam dos seus serviços.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default CadastrarPrestador