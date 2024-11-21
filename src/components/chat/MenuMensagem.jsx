import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { LuPencil } from "react-icons/lu";
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { HiOutlineEllipsisHorizontal } from "react-icons/hi2";
import { mensagens } from '../../utils/json/CardServices';


const MenuMensagem = () => {
  return (
    <aside className='border p-3 gap-3 text-sm'>
      {/* pesquisar Mensagem */}

      <div className="flex gap-5">
        <span className="flex flex-row items-center w-52 h-8  rounded-[4px] bg-[#F3F4F6]">
          <FaSearch size={"20px"} className="m-3 bg-[#F3F4F6] h-[100%]" />
          <input
            type="search"
            placeholder="Consultoria educacional"
            className="outline-none h-[100%] bg-pesquisar w-64 p-2"
          />
        </span>

        <button className="flex items-center border p-2 gap-2 rounded-[4px] text-white bg-botao">
          <LuPencil size={"20px"} />
        </button>
      </div>

      <span className=" flex items-center justify-between m-2">
        <p className='flex items-center'>Todas mensagens <MdOutlineKeyboardArrowDown size={"20px"} /></p>
        <p><HiOutlineEllipsisHorizontal/></p>
      </span>

    <div className='flex flex-col mt-3'>
        {  mensagens.map(mensagem=>{
            return (
              <div
                key={mensagem.id}
                className=" p-2 gap-3 flex items-center w-auto"
              >
                <span className="w-[30%] h-14 bg-orange-300 rounded-full items-center flex justify-center ">
                  {mensagem.sender.slice(0, 1)}
                </span>

                <div className="flex flex-col w-[100%]">
                  <span className="flex justify-between ">
                    <h2>{mensagem.sender}</h2>
                    <p className='text-legenda'>{mensagem.time}</p>
                  </span>

                  <span>
                    <p className="break-words">{mensagem.lastMessage}</p>
                  </span>
                </div>
              </div>
            );
        })}
    </div>

    </aside>
  );
}

export default MenuMensagem