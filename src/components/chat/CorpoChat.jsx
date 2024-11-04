import React from 'react'
import { HiDotsHorizontal } from "react-icons/hi";
import { BsCameraVideo } from "react-icons/bs";
import { BsTelephone } from "react-icons/bs";

const CorpoChat = () => {
  return (
    <div className="text-sm flex-col w-[40rem] p-5">
      <div className="flex flex-row items-center justify-between">
        {/* imagem e nome */}

        <div className="flex gap-2">
          <img
            src="src/utils/image/perfil.jpg"
            alt="Foto"
            className="rounded-full object-cover h-10 w-10"
          />

          <span className="flex flex-col">
            <p className="font-bold">Juelma Pereira</p>
            <p>Activo agora</p>
          </span>
        </div>

        {/* icones */}

        <span className="flex gap-3">
          <button>
            <BsTelephone />
          </button>
          <button>
            <BsCameraVideo />
          </button>
          <button>
            <HiDotsHorizontal />
          </button>
        </span>
      </div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt nesciunt
      illo beatae fuga architecto perferendis est ducimus, atque illum quae,
      quam consequuntur nisi deserunt iusto.
    </div>
  );
}

export default CorpoChat