import React, { useState } from "react";
import { services } from "../../utils/json/CardServices";
import { PiHouseLine, PiMapPin, PiLineVerticalLight } from "react-icons/pi";
import { MdOutlineKeyboardArrowDown, MdCalendarToday } from "react-icons/md";
import { FaRegBookmark, FaRegCheckCircle, FaSearch } from "react-icons/fa";
import { FaMessage, FaRegCircleUser, FaRegHeart } from "react-icons/fa6";
import { HiEllipsisHorizontal } from "react-icons/hi2";


const Pesquisar = () => {
  const [detailService, setdetailService] = useState(services[0]);

  function d(key) {
    const fetchData = services.find((service) => key == service.key);
    setdetailService(fetchData);
    console.log(fetchData.localizacao.length);
    // console.log(detailService)
  }

  return (
    <div className="  flex-col flex h-auto p-9 gap-8">
      <h1>
        Pesquisar <b className="text-botao">Serviços</b>
      </h1>

      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-3">
          <p className="font-bold">Pesquisar</p>
          <span className="flex flex-row items-center w-52 h-8  rounded-[6px] bg-[#F3F4F6]">
            <FaSearch size={"20px"} className="m-3 bg-[#F3F4F6] h-[100%]" />
            <input
              type="search"
              placeholder="Consultoria educacional"
              className="outline-none h-[100%] bg-[#F3F4F6] w-64 p-2"
            />
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <span className="flex flex-row justify-between">
            <p className="font-bold">Filtrar</p>
            <p className="text-botao">Limpar filtro</p>
          </span>

          <span className="list-none flex gap-5">
            <li className=" h-8 bg-[#F3F4F6] w-28 flex items-center justify-between p-2">
              Província <MdOutlineKeyboardArrowDown />
            </li>
            <li className=" h-8 bg-[#F3F4F6] w-28 flex items-center justify-between p-2">
              Bairro <MdOutlineKeyboardArrowDown />
            </li>
            <li className=" h-8 bg-[#F3F4F6] w-28 flex items-center justify-between p-2">
              Preço <MdOutlineKeyboardArrowDown />
            </li>
            <li className=" bg-[#F3F4F6] w-28 flex items-center justify-between p-2">
              Categoria <MdOutlineKeyboardArrowDown />
            </li>
          </span>
        </div>
      </div>

      <div className="flex flex-row gap-4 ">
        <aside className="flex flex-col gap-5 pt-5 pr-5 pb-5">
          <span className="">
            <p className="ml-5">
              32 Resultados para
              <i className="text-botao"> Consultoria educacional</i>
            </p>
          </span>

          <article className="flex flex-col gap-4 ">
            {services.map((service) => {
              return (
                <div
                  key={service.key}
                  className="flex flex-col border-2 p-5 rounded-[8px] gap-4  w-[360px] h-auto"
                  onClick={() => d(service.key)}
                >
                  <div className="flex flex-row items-center gap-3">
                    <img
                      src={service.imagem}
                      className="w-20 rounded-[6px] object-cover"
                      alt="imagem dos serviços"
                    />
                    <span className="flex flex-col">
                      <h3 className="font-bold">{service.servico}</h3>
                      <p className="break-all">{service.descricao}</p>
                    </span>
                  </div>

                  <p className="flex items-center text-legenda gap-2">
                    <PiHouseLine />
                    {service.localizacao[0]}
                  </p>
                  <p className="flex items-center text-legenda gap-2">
                    <PiMapPin />
                    {service.localizacao[1]}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaRegBookmark color="#9095A1" />
                    {service.preco}
                  </p>
                </div>
              );
            })}

            <button className="w-[100px] h-[50px] bg-white rounded-[4px] self-center text-botao border-botao border text-18">
              Ver mais
            </button>
          </article>
        </aside>

        {/* comentado */}
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
                TechLearn Consultoria Solutions é uma consultoria especializada
                em integrar tecnologia e inovação no ambiente educacional. Nossa
                missão é ajudar escolas e instituições ...
              </p>

              <div className="flex text-legenda gap-40">
                <p className="flex items-center ">
                  <PiMapPin />
                  {Array.isArray(detailService.localizacao) && (
                    <p>
                      {detailService.localizacao[1]},
                      {detailService.localizacao[0]}
                    </p>
                  )}
                </p>

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
      </div>
    </div>
  );
};

export default Pesquisar;
