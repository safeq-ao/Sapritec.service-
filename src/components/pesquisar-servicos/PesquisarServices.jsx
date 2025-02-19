import React, { useState } from "react";
import { services } from "../../utils/json/CardServices";
import { PiHouseLine, PiMapPin} from "react-icons/pi";
import { FaRegBookmark} from "react-icons/fa";
import FiltrodePesquisa from "./FiltrodePesquisa";
import Servico from "./Servico";


const Pesquisar = () => {
    const [selectedKey, setSelectedKey] = useState(1);
  

  // const showService=(key)=>{
  //   const fetchData = services.find((service) => key == service.key);
  //   setdetailService(fetchData);
  //   console.log(fetchData);
  // }

  const [searchQuery, setSearchQuery] = useState(""); 
     const handleSearchChange =(query) => {
       setSearchQuery(query);
     };


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
                  key={service.key}
                  className="flex flex-col border-2 p-5 rounded-[8px] gap-4  w-[360px] h-auto"
                  onClick={() => setSelectedKey(service.key)}
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
        <Servico selectedKey={selectedKey} data={services} />
      </div>
    </div>
  );
};

export default Pesquisar;
