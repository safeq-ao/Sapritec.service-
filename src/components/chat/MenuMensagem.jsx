import React, { useState, useEffect } from 'react';
import { Search, Edit, ChevronDown, MoreHorizontal, Plus, Filter } from 'lucide-react';
import { useTheme } from "../../utils/context/themeContext";
import { motion } from "framer-motion";

// Mock messages data (replace with your actual data)
const mockMensagens = [
  {
    id: 1,
    sender: "Juelma Pereira",
    lastMessage: "Olá! Tudo bem? Como posso ajudar?",
    time: "10:31",
    unread: 0,
    online: true,
    avatar: "src/utils/image/perfil.jpg"
  },
  {
    id: 2,
    sender: "João Silva",
    lastMessage: "Preciso de um orçamento para jardinagem.",
    time: "11:00",
    unread: 3,
    online: false,
    avatar: null
  },
  {
    id: 3,
    sender: "Maria Santos",
    lastMessage: "Gostaria de saber mais sobre seus serviços.",
    time: "14:25",
    unread: 0,
    online: true,
    avatar: null
  },
  {
    id: 4,
    sender: "Carlos Oliveira",
    lastMessage: "Você tem disponibilidade para amanhã?",
    time: "16:48",
    unread: 1,
    online: false,
    avatar: null
  },
];

const MenuMensagem = ({ onChatSelect }) => {
  const { darkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  // Initialize messages
  useEffect(() => {
    setMessages(mockMensagens);
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleChatSelection = (chatId) => {
    setActiveChat(chatId);
    onChatSelect(chatId);
  };

  const filteredMessages = messages.filter((mensagem) =>
    mensagem.sender.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`h-full flex flex-col ${
      darkMode ? "text-gray-200" : "text-gray-700"
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Mensagens</h2>
        <div className="flex items-center gap-1">
          <button className={`p-2 rounded-full ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
            <Filter size={16} />
          </button>
          <button className={`p-2 rounded-full ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Search Message */}
      <div className="flex gap-2 mb-4 pt-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={16} className={`${darkMode ? "text-gray-400" : "text-gray-500"}`} />
          </div>
          <input
            type="search"
            placeholder="Pesquisar mensagens..."
            className={`block w-full pl-10 pr-3 py-2 rounded-md border ${
              darkMode ? "border-gray-700 bg-gray-700 text-gray-200" : "border-gray-300 bg-gray-50 text-gray-700"
            } focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Messages List - Scrollable */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-1">
        {filteredMessages.length > 0 ? (
          filteredMessages.map(mensagem => (
            <motion.button
              key={mensagem.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`p-3 gap-3 flex items-center w-full rounded-lg hover:bg-gray-100 ${
                activeChat === mensagem.id 
                  ? darkMode 
                    ? "bg-gray-700" 
                    : "bg-blue-50"
                  : ""
              } ${darkMode ? "hover:bg-gray-700" : ""}`}
              onClick={() => handleChatSelection(mensagem.id)}
            >
              <div className="relative">
                {mensagem.avatar ? (
                  <img 
                    src={mensagem.avatar} 
                    alt={mensagem.sender} 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-violet-500 rounded-full flex items-center justify-center text-white font-medium">
                    {mensagem.sender.slice(0, 1)}
                  </div>
                )}
                {mensagem.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
                )}
              </div>

              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className={`font-medium truncate ${
                    activeChat === mensagem.id && !darkMode ? "text-blue-700" : ""
                  }`}>
                    {mensagem.sender}
                  </h3>
                  <div className="flex items-center">
                    <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {mensagem.time}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-1">
                  <p className={`text-sm truncate ${darkMode ? "text-gray-400" : "text-gray-500"} max-w-[85%]`}>
                    {mensagem.lastMessage}
                  </p>
                  {mensagem.unread > 0 && (
                    <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {mensagem.unread}
                    </span>
                  )}
                </div>
              </div>
            </motion.button>
          ))
        ) : (
          <div className={`p-4 text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Nenhuma conversa encontrada
          </div>
        )}
      </div>
    </div>
  );
}

export default MenuMensagem;