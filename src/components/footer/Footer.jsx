import React from 'react'
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'
import { MdOutlineMailOutline } from "react-icons/md";

export function Footer () {
  return (
    <footer className="bg-footer text-text-footer flex flex-row p-10 justify-around">
      <div className="flex flex-row text-sm gap-10">
        <span>
          <h2 className="font-bold mb-2">Sobre</h2>
          <ul className="flex flex-col gap-2">
            <li>Home</li>
            <li>Pesquisar</li>
            <li>Favoritos</li>
            <li>Chat</li>
          </ul>
        </span>

        <span>
          <h2 className="font-bold mb-2">Ajuda</h2>
          <ul className="flex flex-col gap-2">
            <li>Centro de ajuda</li>
            <li>FAQs</li>
          </ul>
        </span>

        <span>
          <h2 className=" font-bold mb-2">Contacto</h2>
          <ul className="flex flex-col gap-2">
            <li>Telefone:</li>
            <li>(+244) 923 456 7893</li>
            <li>Email:</li>
            <li>sapritecservice@email.com</li>
          </ul>
        </span>
      </div>

      <div className="text-sm flex flex-col gap-3">
        <h2 className="font-bold">Receba notificações</h2>
        <span className="flex flex-row items-center justify-center h-10  rounded-[8px] bg-footer border border-white">
          <MdOutlineMailOutline
            size={"20px"}
            color="white"
            className="m-3 bg-footer h-[100%]"
          />
          <input
            type="search"
            placeholder="Digite o seu email"
            className="outline-none h-[100%] bg-footer w-40"
          />
          <button
            type="submit"
            className="p-3 bg-botao outline-none text-white h-[100%] rounded-tr-[8px] rounded-br-[8px] "
          >
            Subscrevar
          </button>
        </span>
        <span className="flex items-center gap-3">
          <FaTwitter color="#2EBAE8" />
          <FaFacebook color="#2E6FE8" />
          <FaLinkedin color="#7797E4" />
          <FaYoutube color="#E82E2E" />
        </span>
        <p>&copy;2024</p>
      </div>
    </footer>
  );
}
