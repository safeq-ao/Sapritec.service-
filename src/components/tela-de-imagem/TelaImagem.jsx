import React from 'react'

export const TelaImagem = () => {
  return (
    <div
      className="
    bg-[url('/src/utils/image/capa.png')] bg-cover bg-top flex flex-col justify-center gap-3 h-[20rem]
    lg:object-cover lg:h-[23rem] lg:font-bold
  "
    >
      <h2 className="w-[15.4rem]  text-lg ml-10 ">
        Encontre Soluções Rápidas para Suas Necessidades
      </h2>
      <button className="w-[178px] h-[52px] bg-botao rounded-[8px] ml-10 text-white text-18">
        Serviços
      </button>
    </div>
  );
}
