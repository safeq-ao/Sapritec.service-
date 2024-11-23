import React from "react";
import { FaSearch } from "react-icons/fa";
import { PiHouseLine } from "react-icons/pi";
import { FaRegBookmark } from "react-icons/fa";
import { PiMapPin } from "react-icons/pi";
import { services, cards } from "../../utils/json/CardServices";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

export function PaginaDeBusca() {
  return (
    <main className="flex flex-col p-10 h-auto w-auto">
      <div className="flex flex-col items-center gap-10">
        <h1 className="font-bold text-32">
          Explore por <b className="text-botao">categoria</b>
        </h1>

        <span className="flex flex-row items-center justify-center h-10  rounded-[6px] bg-[#F3F4F6]">
          <FaSearch size={"20px"} className="m-3 bg-[#F3F4F6] h-[100%]" />
          <input
            type="search"
            placeholder="Pesquisar por serviços..."
            className="outline-none h-[100%] bg-pesquisar w-64"
          />

          <select name="option" className="bg-[#F3F4F6] h-[100%] outline-none">
            <option value="" disabled>
              Escolha a sua opção
            </option>
            <option value="1" >
              Localização
            </option>
            <option value="2">Serviço</option>
            <option value="3">Empresa</option>
          </select>

          <button
            type="submit"
            className="p-3 bg-botao outline-none text-white h-[100%] rounded-tr-[6px] rounded-br-[6px] "
          >
            Pesquisar
          </button>
        </span>

        <div className="flex flex-row w-[40rem] bg-black">
          <Swiper slidesPerView={4} pagination={{ clickable: true }} navigation>
            {cards.map((c) => (
              <SwiperSlide key={c.key}>
                <div className="flex flex-col bg-purple-200 p-10 w-[1] justify-center items-center">
                  <p>{c.si}</p>
                  <p className="text-lg">{c.service}</p>
                  <p>{c.quantity}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* servicos que podes precisar */}
      <div className="flex flex-col items-center m-10">
        <h1 className="font-bold text-32 text-botao">
          Serviços que pode precisar
        </h1>

        <h2 className="text-legenda">
          Pesquise, escolhe e solicite serviços com rapidez.
        </h2>

        <article className="flex flex-row mt-10 flex-wrap gap-4 justify-center">
          {services.map((service) => {
            return (
              <div
                key={service.key}
                className="flex flex-col border-2 p-5 rounded-[8px] gap-4  w-[360px] h-auto"
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
        </article>

        <button className="w-[100px] h-[52px] bg-botao rounded-[4px] mt-10 text-white text-18">
          Ver mais
        </button>
      </div>
    </main>
  );
}
