import React from 'react'
import { CiUser } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="flex flex-row  justify-between p-4 items-center">
      <h2 className="text-18 ml-20"><b className='text-botao'>Sapritec</b>.service</h2>

      <nav>
        <ul className="flex flex-row gap-5 text-14">
          <Link to="/home">
            <li>Home</li>
          </Link>
          <Link to="/pesquisar">
            <li>Pesquisar</li>
          </Link>
          <li>Favoritos</li>
          <Link to="/chat">
            <li>Chat</li>
          </Link>
        </ul>
      </nav>

      <nav>
        <ul className="flex flex-row mr-8 gap-2">
          <li>
            <CiUser size={"20px"} />
          </li>
          <li>
            <IoIosNotificationsOutline size={"20px"} />
          </li>
        </ul>
      </nav>
      
    </header>
  );
}

export default Header