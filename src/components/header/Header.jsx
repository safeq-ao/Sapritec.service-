import React from 'react'
import { CiUser } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <h2>Sapritec.service</h2>

      <ul>
        <li>Home</li>
        <li>Pesquisar</li>
        <li>Favoritos</li>
        <li>Chat</li>
      </ul>

      <span>
        <CiUser />
      </span>
      <span>
        <IoIosNotificationsOutline />
      </span>
    </header>
  );
}

export default Header