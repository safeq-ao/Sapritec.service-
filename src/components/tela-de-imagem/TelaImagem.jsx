import React from 'react'

export const TelaImagem = () => {
  return (
    <div className="bg-[url('/src/utils/image/capa.png')] object-cover h-[23rem] bg-cover bg-bottom flex flex-col  justify-center font-bold gap-3">
      <h2 className="w-[15.4rem]  text-lg ml-10 ">
        Encontre Soluções Rápidas para Suas Necessidades
      </h2>
      <button className="w-[178px] h-[52px] bg-botao rounded-[8px] ml-10 text-white text-18">
        Serviços
      </button>
    </div>
  );
}
