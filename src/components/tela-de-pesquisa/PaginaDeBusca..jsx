import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { PiHouseLine } from "react-icons/pi";
import { FaRegBookmark } from "react-icons/fa";
import { PiMapPin } from "react-icons/pi";
import { services} from "../../utils/json/CardServices";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
import { apiFetch } from "../../utils/api/api";
import { FaSackDollar } from "react-icons/fa6";
import { Link } from "react-router-dom";


export function PaginaDeBusca() {
  const [services, setServices] = useState([]);
  const [Category, setCategory] = useState([]);
  const [qntCategory, setQntCategory] = useState([]);

  const GetCategories = async () => {
    await apiFetch
      .get("/categoria/show")
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => {
        return error;
      });
  };
  const GetCategoriesPerService = async () => {
    await apiFetch
      .get("/categoria/show/perService")
      .then((response) => {
         console.log(response.data)
        setQntCategory(response.data);
      })
      .catch((error) => {
        return error;
      });
  };

   const fetchServices = async () => {
        try {
          const response = await apiFetch.get(`/prestados/show`);
          setServices(response.data);
        } catch (error) {
          console.error("Erro ao buscar serviços:", error);
        }
      };
  useEffect(() => {
    GetCategories(); GetCategoriesPerService(); fetchServices();
  }, []);

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
            {Category?.map((option) => {
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
          className="flex flex-row w-[13rem]
        lg:(w-[40rem])"
        >
          <Swiper slidesPerView={1} pagination={{ clickable: true }} navigation>
            {qntCategory.map((c) => (
              <SwiperSlide key={c.id_categoria}>
                <div className="flex flex-col bg-purple-200 p-10 justify-center items-center">
                  <p>
                    <FaSackDollar size={"20px"} />
                  </p>
                  <p className="text-lg text-center">{c.nome}</p>
                  <p>{c.totalServicos}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

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

        <article className="flex mt-5 flex-wrap justify-center items-center gap-5">
          {services.slice(services.length/2==0? services.length/2: 0, 6).map((service) => {
            return (
              <div
                key={service.id_servicoPrestador}
                className="flex flex-col border-2 p-5 rounded-lg gap-4  w-[360px] h-auto"
                onClick={() => {
                  sessionStorage.setItem(
                    "selectkey",
                    service.id_servicoPrestador
                  ),
                    setSelectedKey(service.id_servicoPrestador);
                }}
              >
                <div className="flex flex-row items-center gap-3">
                  <img
                    src={`http://localhost:3232/${service.servicoPrestador.imagem}`}
                    className="w-20 rounded-[6px] object-cover"
                    alt={service.servicoPrestador.categoria_nome}
                  />
                  <span className="flex flex-col">
                    <h3 className="font-bold">
                      {service.servicoPrestador.titulo}
                    </h3>
                    <p className="break-all">
                      {service.servicoPrestador.descricao}
                    </p>
                  </span>
                </div>

                <p className="flex items-center text-legenda gap-2">
                  <PiHouseLine />
                  Kilamba
                </p>
                <p className="flex items-center text-legenda gap-2">
                  <PiMapPin />
                  Angola
                </p>
                <p className="flex items-center gap-2 text-legenda">
                  <FaRegBookmark />
                  {service.servicoPrestador.tags}
                </p>
              </div>
            );
          })}
        </article>

        <Link to={"pesquisar"}>
          <button className="w-[100px] h-[52px] bg-botao rounded-[4px] mt-10 text-white text-18">
            Ver mais
          </button>
        </Link>
      </div>
    </main>
  );
}
