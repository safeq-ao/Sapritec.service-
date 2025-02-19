import React, { useContext, useState, useEffect } from "react";
import { CiUser } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoExitOutline } from "react-icons/io5";
import Hamburger from "hamburger-react";
import { Link, useNavigate } from "react-router-dom";
import { SProvider } from "../../utils/context/sizes";
import { CProvider } from "../../utils/context/autentication";


const Header = () => {
 
  const { logged, setLogged } = useContext(CProvider);
  const {isOpen, setOpen} = useContext(SProvider);
  console.log(isOpen)

  const navigate = useNavigate();
  function HandleLogout() {
  localStorage.removeItem("myTokenUser");
    navigate("/login");
    setLogged(!logged)
  }

  useEffect(()=>{
    HandleLogout
  }, [])

  

  return (
    <header className="flex justify-between items-center w-[100%]">
      <Link to={"/home"}>
        <h2 className="text-[20px] ml-9">
          <b className="text-botao">Sapritec</b>.service
        </h2>
      </Link>

      {/* <Hamburger toggled={isOpen} toggle={setOpen}/> */}


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
};

export default Header;
