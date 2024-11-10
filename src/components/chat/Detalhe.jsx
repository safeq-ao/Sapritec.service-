import React from 'react'

const Detalhe = () => {
  return (
    <aside className="border text-sm p-4">
      <div className="flex flex-col items-center gap-5">
        <img
          src="src/utils/image/perfil.jpg"
          alt="Foto"
          className="rounded-full object-cover h-32 w-36"
        />

        <span className="flex flex-col items-center">
          <p className="font-bold">Juelma Pereira</p>
          <p>TechLearn Consultoria</p>
        </span>
        <span className="">
          <p className="break-keep w-52">
            TechLearn Consultoria Solutions é uma consultoria especializada...
          </p>
        </span>
        <p className="break-keep w-52">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis
          dolore reprehenderit iure quam odio laudantium aliquid beatae sed ab
          ea fugiat tenetur, recusandae qui eum mollitia fuga architecto quia
          corporis unde enim ipsum excepturi expedita! Odit
        </p>
      </div>
    </aside>
  );
}

export default Detalhe