import React, { useState } from 'react'
import { MdOutlineKeyboardArrowDown} from "react-icons/md";
import { FaSearch } from "react-icons/fa";

const FiltrodePesquisa = ({ onSearchChange}) => {
  const handleInputChange = (event) => {
    onSearchChange(event.target.value)
  };
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col gap-3">
        <p className="font-bold">Pesquisar</p>
        <span className="flex flex-row items-center w-52 h-8  rounded-[6px] bg-pesquisar">
          <FaSearch size={"20px"} className="m-3 bg-[#F3F4F6] h-[100%]" />
          <input
            type="search"
            onChange={handleInputChange}
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
  );
};

export default FiltrodePesquisa