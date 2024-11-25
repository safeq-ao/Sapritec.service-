import React, { useContext } from 'react'
import { CiUser } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoExitOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom'
import { CProvider } from '../../utils/context/autentication';

const Header = () => {

  const { setLogged } = useContext(CProvider);
  const navigate = useNavigate();
  function HandleLogout(){
    setLogged(false);
    navigate("/login");
  }
  return (
    <header className="flex flex-row  justify-between p-4 items-center">
      <Link to={"/home"}>
        <h2 className="text-18 ml-20">
          <b className="text-botao">Sapritec</b>.service
        </h2>
      </Link>

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
        <ul className="flex flex-row mr-8 gap-2 cursor-pointer">
          <li>
            <CiUser size={"20px"} />
          </li>
          <li>
            <IoIosNotificationsOutline size={"20px"} />
          </li>
          <li>
            <IoExitOutline size={"20px"} onClick={HandleLogout} />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header