import React, { useState } from "react";
import { User as UserIcon, BriefcaseBusiness } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeSwitcher } from "../theme/ThemeSwitcher";
import { useTheme } from "../../utils/context/themeContext";

export const EscolherUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const escolha = ["cliente", "prestador"];
  const { darkMode } = useTheme();

  function handleChoice(index) {
    const novoUser = escolha[index];
    setUser(novoUser);

    // Redirect to appropriate page based on user choice
    const Redirect = novoUser === "prestador" ? "/cadastrar" : "/home";
    localStorage.setItem("role", novoUser);
    navigate(Redirect);
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className={`min-h-screen ${darkMode 
        ? "bg-gradient-to-br from-gray-900 to-gray-800" 
        : "bg-gradient-to-br from-blue-50 to-white"
      } flex flex-col items-center justify-center p-4`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <ThemeSwitcher />
      
      <motion.header variants={itemVariants} className="mb-12 text-center">
        <h2 className={`text-3xl font-bold mb-2 ${darkMode ? "text-white" : ""}`}>
          <span className={darkMode ? "text-blue-400" : "text-blue-600"}>Sapritec</span>.service
        </h2>
        <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Conectando serviços e clientes
        </p>
      </motion.header>

      <motion.div 
        variants={itemVariants}
        className={`max-w-xl w-full rounded-xl shadow-lg p-8 mb-8 ${
          darkMode ? "bg-gray-800 border border-gray-700" : "bg-white"
        }`}
      >
        <h1 className={`text-2xl font-semibold text-center mb-8 ${
          darkMode ? "text-white" : "text-gray-800"
        }`}>
          Como você deseja utilizar nossa plataforma?
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UserCard 
            title="Cliente"
            description="Buscar profissionais e serviços"
            icon={<UserIcon size={32} strokeWidth={1.5} />}
            color="blue"
            onClick={() => handleChoice(0)}
            darkMode={darkMode}
          />
          
          <UserCard 
            title="Prestador"
            description="Oferecer seus serviços profissionais"
            icon={<BriefcaseBusiness size={32} strokeWidth={1.5} />}
            color="green"
            onClick={() => handleChoice(1)}
            darkMode={darkMode}
          />
        </div>
      </motion.div>
      
      <motion.footer variants={itemVariants} className={`text-center text-sm ${
        darkMode ? "text-gray-400" : "text-gray-500"
      }`}>
        © {new Date().getFullYear()} Sapritec.service - Todos os direitos reservados
      </motion.footer>
    </motion.div>
  );
};

const UserCard = ({ title, description, icon, color, onClick, darkMode }) => {
  const colorClasses = {
    blue: darkMode 
      ? "bg-blue-900 text-blue-300 hover:bg-blue-700" 
      : "bg-blue-100 text-blue-600 hover:bg-blue-600",
    green: darkMode
      ? "bg-green-900 text-green-300 hover:bg-green-700"
      : "bg-green-100 text-green-600 hover:bg-green-600"
  };

  return (
    <motion.div
      className={`flex flex-col items-center rounded-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-md ${
        darkMode 
          ? "bg-gray-700 border border-gray-600" 
          : "bg-white border border-gray-100"
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`${colorClasses[color]} p-4 rounded-full mb-4 transition-colors duration-300 hover:text-white`}>
        {icon}
      </div>
      <h3 className={`text-xl font-medium mb-2 ${darkMode ? "text-white" : ""}`}>
        {title}
      </h3>
      <p className={`text-sm text-center ${
        darkMode ? "text-gray-300" : "text-gray-600"
      }`}>
        {description}
      </p>
    </motion.div>
  );
};
