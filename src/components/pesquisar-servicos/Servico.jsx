import React, { useState } from "react";
import { FaMessage, FaRegCircleUser } from "react-icons/fa6";
import { MdCalendarToday } from "react-icons/md";
import { PiHouseLine, PiLineVerticalLight, PiMapPin } from "react-icons/pi";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { FaRegHeart } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";

const Servico = ({ selectedKey, data }) => {
    const detailService = data.find((item) => item.key === selectedKey);

  return (
    <main className="border flex flex-col text-sm mt-14 ">
      <div className=" h-1/6 w-90 ">
        <img
          src={detailService.imagem}
          alt="servico"
          className="h-[100%] object-cover bg-cover bg-top w-[100%]"
        />
      </div>

      <section className="p-5 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h1 className="font-bold">{detailService.servico}</h1>
          <span className="flex items-center gap-3">
            <HiEllipsisHorizontal />
            <button className="flex items-center border p-2 gap-2 rounded-[8px] text-botao">
              <FaRegHeart /> Salvar
            </button>
            <button className="flex items-center border p-2 gap-2 rounded-[8px] text-white bg-botao">
              Pedir Serviços
            </button>
          </span>
        </div>

        <p className="font-bold">{detailService.preco}</p>

        <span className="flex">
          {Array.isArray(detailService.localizacao) && (
            <p className="flex items-center text-legenda gap-2">
              <PiHouseLine /> {detailService.localizacao[0]}
              <PiLineVerticalLight />
              <PiMapPin />
              {detailService.localizacao[1]}
            </p>
          )}
        </span>

        <h2 className="font-bold">Descrição do Serviço</h2>
        <p>
          Auxiliamos escolas e instituições de ensino na implementação de
          tecnologias educacionais para aprimorar o aprendizado dos alunos.
          Nossa equipe oferece treinamento personalizado para professores,
          planejamento estratégico de ferramentas digitais.
        </p>

        <h2 className="font-bold">Responsabilidades</h2>
        <ul className="flex flex-col">
          <li className="flex items-center gap-2">
            <FaRegCheckCircle className="text-botao" />
            Análise de Necessidades Educacionais
          </li>
          <li className="flex items-center gap-2">
            <FaRegCheckCircle className="text-botao" />
            Desenvolvimento de Planos de Implementação Tecnológica
          </li>
          <li className="flex items-center gap-2">
            <FaRegCheckCircle className="text-botao" />
            Treinamento de Educadores
          </li>
        </ul>

        <div className="flex flex-col gap-5 border p-8 rounded-[4px]">
          <h2 className="font-bold text-sm">Fale connosco</h2>

          <span className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src="src/utils/image/perfil.jpg"
                alt="Foto de perfil"
                className="w-8 h-8 object-cover rounded-full cursor-pointer"
              />
              <p className="font-bold">Juelma Pereira</p>
            </div>

            <button className="flex items-center border p-2 gap-2 rounded-[8px] text-botao">
              <FaMessage /> Mensagem
            </button>
          </span>
        </div>

        <article className="flex flex-col gap-5 border p-8 mt-9 rounded-[4px]">
          <h2 className="font-bold">Sobre a empresa</h2>
          <h2 className="font-bold">TechLearn Consultoria</h2>
          <p>
            TechLearn Consultoria Solutions é uma consultoria especializada em
            integrar tecnologia e inovação no ambiente educacional. Nossa missão
            é ajudar escolas e instituições ...
          </p>

          <div className="flex text-legenda gap-40">
            <div className="flex items-center ">
              <PiMapPin />
              {Array.isArray(detailService.localizacao) && (
                <p>
                  {detailService.localizacao[1]},{detailService.localizacao[0]}
                </p>
              )}
            </div>

            <span className="flex flex-col">
              <p className="flex items-center gap-2">
                <FaRegCircleUser />
                10-20 Empregados
              </p>
              <p className="flex items-center gap-2">
                <MdCalendarToday />
                Segunda-Sexta
              </p>
            </span>
          </div>
        </article>
      </section>
    </main>
  );
};

export default Servico;
