import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { LuPencil } from "react-icons/lu";
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { HiOutlineEllipsisHorizontal } from "react-icons/hi2";
import { mensagens } from '../../utils/json/CardServices';


const MenuMensagem = () => {
  return (
    <aside className='border'>
      {/* pesquisar Mensagem */}

      <div className="flex gap-5">
        <span className="flex flex-row items-center w-52 h-8  rounded-[4px] bg-[#F3F4F6]">
          <FaSearch size={"20px"} className="m-3 bg-[#F3F4F6] h-[100%]" />
          <input
            type="search"
            placeholder="Consultoria educacional"
            className="outline-none h-[100%] bg-[#F3F4F6] w-64 p-2"
          />
        </span>

        <button className="flex items-center border p-2 gap-2 rounded-[4px] text-white bg-botao">
          <LuPencil size={"20px"} />
        </button>
      </div>

      <p className=" flex items-center justify-between">
        <p className='flex'>Todas mensagens <MdOutlineKeyboardArrowDown /></p>
        <p><HiOutlineEllipsisHorizontal/></p>
      </p>

    <div>
        {mensagens.map(mensagem=>{
            return(
                <>
                <span className='flex justify-between'>
                    <p key={mensagem.id}>{mensagem.sender}</p>
                    <p>{mensagem.time}</p>
                </span>
                <p>{mensagem.lastMessage}</p>
                </>
            )
        })}
    </div>

    </aside>
  );
}

export default MenuMensagem