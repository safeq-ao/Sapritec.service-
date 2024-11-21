import React from 'react'
import { FaSearch } from 'react-icons/fa';
import { IoIosNotificationsOutline } from "react-icons/io";
import { resumos } from '../../../utils/json/CardServices';
import EmCurso from './EmCurso';
import Completed from './Completed';
import Canceled from './Canceled';

const Resumo = () => {
  return (
    <div className="w-[100%] p-5 bg-fundo flex flex-col gap-5">
      {/* div header de pesquisa */}
      <header className="flex justify-between items-center bg-white p-4">
        <span className="flex flex-row items-center w-80 h-8  rounded-[4px] bg-pesquisar">
          <FaSearch size={"20px"} className="m-3 bg-[#F3F4F6] h-[100%]" />
          <input
            type="search"
            placeholder="Pesquisar..."
            className="outline-none h-[100%] bg-pesquisar w-[100%] p-2"
          />
        </span>

        <div className="flex items-center gap-5">
          <span>
            <IoIosNotificationsOutline size={"20px"} />
          </span>

          <span className="w-7 h-7 bg-[#4069E5] text-white rounded-full items-center flex justify-center ">
            A
          </span>
        </div>
      </header>

      {/* Resumo de pedidos */}
      <div className='flex justify-between items-center'>
        <h1 className='font-bold'>Resumo de pedidos</h1>
        <input type="date" className='outline-none h-8' />
      </div>


      <div className='flex items-center bg-white p-4  justify-between'>
          {resumos.map(resumo=>{
            return(
            <div key={resumo.key} className='p-5 flex flex-col gap-5 rounded-2xl' style={{ backgroundColor: resumo.cor }}>
              <span className='flex justify-center text-sm items-center gap-10'>
                <p>{resumo.total}</p>
                <p>{resumo.icon}</p>
              </span>
              <p className='font-bold text-lg'>{resumo.valor}</p>
            </div>
            )
          })}
      </div>

      <EmCurso/>
      <Completed/>
      <Canceled/>

    </div>
  );
}

export default Resumo