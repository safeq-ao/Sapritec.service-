import { React} from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { TiDocumentText } from "react-icons/ti";
import { PiChartBarThin } from "react-icons/pi";
import { TbMessageDown } from "react-icons/tb";
import { LiaTasksSolid, LiaCoinsSolid } from "react-icons/lia";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Sidebar = () => {

  return (
    <aside className="flex flex-col h-auto justify-between border border-pink text-sm">
      <div className="p-5  flex flex-col gap-9">
        <h2 className="text-18">
          <b className="text-botao cursor-pointer">Sapritec</b>.service
        </h2>

        <nav className="cursor-pointer">
          <ul className="flex flex-col gap-5 text-14">
            <Link to={"/dashboard"}>
              <li
                className="flex items-center gap-2"
                // onClick={() => setShowSom(1)}
              >
                <LuLayoutDashboard size={"20px"} />
                Dashboard
              </li>
            </Link>
            <Link to={"/resumo"}>

            <li
              className="flex items-center gap-2"
              // onClick={() => setShowSom(2)}
            >
              <TiDocumentText size={"20px"} />
              Resumo de Pedidos
            </li>
            </Link>
            <Link to={"/recebidos"}>
              <li
                className="flex items-center gap-2"
                // onClick={() => setShowSom(3)}
              >
                <LiaTasksSolid size={"20px"} />
                Pedidos Recebidos
              </li>
            </Link>
            <Link to={"/historico"}>
              <li
                className="flex items-center gap-2"
                // onClick={() => setShowSom(4)}
              >
                <PiChartBarThin size={"20px"} /> Histórico de Pedidos
              </li>
            </Link>
            <Link to={"/mensagem"}>
              <li
                className="flex items-center gap-2"
                // onClick={() => setShowSom(5)}
              >
                <TbMessageDown size={"20px"} /> Mensagem
              </li>
            </Link>
            <hr />
            <Link to={"pagamentos"}>
              <li
                className="flex items-center gap-2"
                // onClick={() => setShowSom(6)}
              >
                <LiaCoinsSolid size={"20px"} />
                Pagamentos e Transações
              </li>
            </Link>
          </ul>
        </nav>
      </div>

      <div className="flex justify-between gap-5 p-2">
        <span className="w-12 h-12 bg-[#4069E5] text-white rounded-full items-center flex justify-center ">
          A
        </span>

        <span className="flex flex-col cursor-pointer">
          <p className="font-medium">Perfil Empresarial</p>
          <p>empresa@email.com</p>
        </span>

        <span className="self-center">
          <p>
            <IoSettingsOutline size={"20px"} />
          </p>
        </span>
      </div>
    </aside>
  );
};

export default Sidebar;
