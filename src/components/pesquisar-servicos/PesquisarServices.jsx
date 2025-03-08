import React, { useEffect, useState } from "react";
import { services } from "../../utils/json/CardServices";
import { PiHouseLine, PiMapPin } from "react-icons/pi";
import { FaRegBookmark } from "react-icons/fa";
import FiltrodePesquisa from "./FiltrodePesquisa";
import Servico from "./Servico";
import { apiFetch } from "../../utils/api/api";

const Pesquisar = () => {

  
  const [selectedKey, setSelectedKey] = useState(null)
  const [getServices, setGetServices] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await apiFetch.get(`/prestados/show`);
        setGetServices(response.data);
      } catch (error) {
        console.error("Erro ao buscar serviços:", error);
      }
    };

    fetchServices();
  }, []);

  const services = getServices.filter((service) => {
    return service.servicoPrestador.titulo
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });
 
  return (
    <div className="flex-col flex h-auto p-9 gap-8">
      <h1>
        Pesquisar <b className="text-botao">Serviços</b>
      </h1>

      <FiltrodePesquisa onSearchChange={handleSearchChange} />

      <div className="flex flex-row gap-4 ">
        <aside className="flex flex-col gap-5 pt-5 pr-5 pb-5">
          <span className="">
            <p className="ml-5">
              32 Resultados para
              <i className="text-botao"> {searchQuery}</i>
            </p>
          </span>

          <article className="flex flex-col gap-4 ">
            {services.map((service) => {
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

            <button className="w-[100px] h-[50px] bg-white rounded-[4px] self-center text-botao border-botao border text-18">
              Ver mais
            </button>
          </article>
        </aside>

        {/* comentado */}
        <Servico selectedKey={selectedKey} />
      </div>
    </div>
  );
};

export default Pesquisar;
