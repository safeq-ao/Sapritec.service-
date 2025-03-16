import React from 'react';
import { useTheme } from "../../utils/context/themeContext";
import { MapPin, Calendar, Clock, Star, CheckCircle, UserCheck } from "lucide-react";

const Detalhe = () => {
  const { darkMode } = useTheme();

  return (
    <aside className={`h-full overflow-y-auto flex flex-col rounded-lg ${
      darkMode ? "bg-gray-800 border border-gray-700 text-gray-300" : "bg-white border border-gray-200 text-gray-700"
    }`}>
      <div className="flex flex-col items-center p-6">
        <img
          src="src/utils/image/perfil.jpg"
          alt="Juelma Pereira"
          className="rounded-full object-cover h-16 w-16 sm:h-24 sm:w-24 mb-4"
        />

        <div className="flex flex-col items-center mb-3">
          <h4 className="font-semibold text-lg">Juelma Pereira</h4>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            TechLearn Consultoria
          </p>
        </div>

        {/* Status Badge */}
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4 ${
          darkMode ? "bg-green-900/30 text-green-300" : "bg-green-50 text-green-700"
        }`}>
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          Online
        </div>

        <p className="text-sm text-center mb-4 line-clamp-3">
          TechLearn Consultoria Solutions é uma consultoria especializada em
          soluções de aprendizado e desenvolvimento para empresas de todos os
          tamanhos.
        </p>

        <div className="w-full space-y-2">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-blue-500 flex-shrink-0" />
            <span className="truncate">Kilamba, Angola</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-blue-500 flex-shrink-0" />
            <span className="truncate">Disponível Seg-Sex</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Clock size={16} className="text-blue-500 flex-shrink-0" />
            <span className="truncate">Horário: 8:00 - 18:00</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm mb-5">
          <Star size={14} className="text-yellow-500" />
          <Star size={14} className="text-yellow-500" />
          <Star size={14} className="text-yellow-500" />
          <Star size={14} className="text-yellow-500" />
          <Star size={14} className="text-yellow-500" />
          <span className={`ml-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            (5.0)
          </span>
        </div>

        <div className="w-full space-y-2">
          <button className="w-full py-2.5 rounded-lg font-medium bg-blue-500 hover:bg-blue-600 text-white transition-colors">
            Ver Perfil
          </button>
          
          <button className={`w-full py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 ${
            darkMode 
              ? "bg-gray-700 hover:bg-gray-600 text-gray-200" 
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          } transition-colors`}>
            <UserCheck size={16} />
            Adicionar Contato
          </button>
        </div>
      </div>

      <div className={`p-4 border-t mt-auto ${darkMode ? "border-gray-700" : "border-gray-200"} text-sm`}>
        <h5 className="font-medium mb-3">Serviços Verificados</h5>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
            <span className="truncate">Consultoria de RH</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
            <span className="truncate">Treinamento de Liderança</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
            <span className="truncate">Desenvolvimento de Equipes</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Detalhe;