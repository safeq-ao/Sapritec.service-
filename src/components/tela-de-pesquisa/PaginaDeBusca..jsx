import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { PiHouseLine } from "react-icons/pi";
import { FaRegBookmark } from "react-icons/fa";
import { PiMapPin } from "react-icons/pi";
import { services, cards } from "../../utils/json/CardServices";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { apiFetch } from "../../utils/api/api";

export function PaginaDeBusca() {
  const [Category, setCategory] = useState([]);

  const GetCategories = async() => {
    await apiFetch
      .get("/categoria/show")
      .then((response) => {
        setCategory (response.data)
      })
      .catch((error) => {
        return error;
      });
  };
  useEffect(() => {
      GetCategories()
  }, [])

  return (
    <main className="flex flex-col p-10 h-auto w-auto">
      <div className="flex flex-col items-center gap-10">
        <h1
          className="font-bold
        
        lg:(font-bold text-32)"
        >
          Explore por <b className="text-botao">categoria</b>
        </h1>

        <span
          className="
        flex flex-row rounded-[6px] bg-[#F3F4F6] items-center justify-center h-10 w-90
        lg:()"
        >
          <FaSearch size={"20px"} className="m-3 bg-[#F3F4F6] h-[100%]" />
          <input
            type="search"
            placeholder="Pesquisar..."
            className="outline-none h-[100%] bg-pesquisar
            lg:(w-64)"
          />

          <select name="option" className="bg-[#F3F4F6] h-[100%] outline-none">
            {Category.map(option=>{
              return (
                <option value={option.nome} key={option.id_categoria}>
                  {option.nome}
                </option>
              );
            })}
          </select>

          <button
            type="submit"
            className="p-3 bg-botao outline-none text-white h-[100%] rounded-tr-[6px] rounded-br-[6px] "
          >
            Pesquisar
          </button>
        </span>

        <div
          className="flex flex-row w-[13rem] bg-black
        lg:(w-[40rem])"
        >
          <Swiper slidesPerView={1} pagination={{ clickable: true }} navigation>
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
        <h1
          className="
        font-bold text-botao text-sm
        lg:(text-32)"
        >
          Serviços que pode precisar
        </h1>

        <h2 className="text-legenda text-sm">
          Pesquise, escolhe e solicite serviços com rapidez.
        </h2>

        <article className="flex flex-row mt-10 flex-wrap gap-4 justify-center">
          {services.map((service) => {
            return (
              <div
                key={service.id_servicoPrestador}
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
