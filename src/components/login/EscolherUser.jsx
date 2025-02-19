import React, { useEffect, useState } from "react";
import { FaUserTie } from "react-icons/fa";
import { GrUser } from "react-icons/gr";
import { User } from "../../utils/card-user/User";
import { useNavigate } from "react-router-dom";

export const EscolherUser = () => {
  const navigate = useNavigate();

  const [choice, setChoice] = useState([1, 2]);
  const [user, setUser] = useState("");
  const escolha = ["cliente", "prestador"];

  function handleChoice(index) {
    console.log("Valor selecionado:", choice[index]);
    const novoUser = choice[index] === 1 ? escolha[0] : escolha[1];
    setUser(novoUser);
  
      const Redirect = novoUser === "prestador" ? "/cadastrar" : null;
      localStorage.setItem("role", novoUser)
      navigate(Redirect);
   
  }

  useEffect(() => {
    console.log("Novo valor de user:", user);
  }, [user]);

  return (
    <div className="flex flex-col gap-5">
      <header>
        <h2 className="text-[20px] m-10">
          <b className="text-botao">Sapritec</b>.service
        </h2>
      </header>

      <h1 className="text-center">Quem você é?</h1>

      <section className="flex justify-center gap-10">
        <User
          user={"Cliente"}
          icon={<GrUser color="green" size={"20px"} />}
          onClick={() => {
            handleChoice(0);
          }}
        />
        <User
          user={"Prestador"}
          icon={<FaUserTie color="blue" size={"20px"} />}
          onClick={() => {
            handleChoice(1);
          }}
        />
      </section>
    </div>
  );
};
