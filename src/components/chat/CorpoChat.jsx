import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../utils/context/themeContext";
import {
  MoreVertical,
  Phone,
  Video,
  Send,
  Paperclip,
  Smile,
  CheckCheck,
  ArrowLeft,
  Mic
} from "lucide-react";

// Mock messages for demonstration
const mockMessages = [
  {
    id: 1,
    chatId: 1,
    sender: "other",
    message: "Olá! Estou interessado no seu serviço de limpeza.",
    time: "10:30",
    status: "read"
  },
  {
    id: 2,
    chatId: 1,
    sender: "me",
    message: "Olá! Tudo bem? Como posso ajudar?",
    time: "10:31",
    status: "read"
  },
  {
    id: 3,
    chatId: 1,
    sender: "other",
    message: "Preciso de uma limpeza completa para este sábado. Vocês têm disponibilidade?",
    time: "10:32",
    status: "read"
  },
  {
    id: 4,
    chatId: 1,
    sender: "me",
    message: "Sim, temos horário disponível no sábado. Em qual período você prefere? Manhã ou tarde?",
    time: "10:35",
    status: "read"
  },
  {
    id: 5,
    chatId: 2,
    sender: "other",
    message: "Preciso de um orçamento para jardinagem.",
    time: "11:00",
    status: "read"
  },
  {
    id: 6,
    chatId: 2,
    sender: "me",
    message: "Olá! Claro, posso te ajudar com isso.",
    time: "11:01",
    status: "read"
  }
];

const CorpoChat = ({ selectedChat }) => {
  const { darkMode } = useTheme();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);
  const [typing, setTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Update messages when selectedChat changes
  useEffect(() => {
    if (selectedChat) {
      setMessages(mockMessages.filter(msg => msg.chatId === selectedChat));
    } else {
      setMessages([]);
    }
  }, [selectedChat]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() === "" || !selectedChat) return;
    
    const newMsg = {
      id: Date.now(),
      chatId: selectedChat,
      sender: "me",
      message: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "sending"
    };
    
    setMessages(prev => [...prev, newMsg]);
    setNewMessage("");
    
    // Simulate message being sent and read
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMsg.id ? {...msg, status: "sent"} : msg
        )
      );
      
      // Simulate typing response
      setTimeout(() => {
        setTyping(true);
        
        setTimeout(() => {
          setTyping(false);
          
          // Add response message
          const response = {
            id: Date.now() + 1,
            chatId: selectedChat,
            sender: "other",
            message: "Obrigado pela resposta rápida! Vou verificar os detalhes e retorno em breve.",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: "read"
          };
          
          setMessages(prev => [...prev, response]);
        }, 2000);
      }, 1000);
    }, 800);
  };

  if (!selectedChat) {
    return null;
  }

  return (
    <div className={`flex flex-col h-full w-full rounded-lg overflow-hidden ${
      darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
    } shadow-sm border ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
      {/* Chat Header - Hidden on mobile since the container already has a header */}
      <div className={`px-4 py-3 flex items-center justify-between ${
        darkMode ? "bg-gray-900" : "bg-white border-b border-gray-200"
      } md:flex hidden`}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="src/utils/image/perfil.jpg"
              alt="Juelma Pereira"
              className="rounded-full object-cover h-10 w-10"
            />
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-900"></span>
          </div>
          <div className="flex flex-col">
            <h4 className="font-medium text-base">Juelma Pereira</h4>
            <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Online agora
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className={`p-2 rounded-full transition-colors ${
            darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
          }`}>
            <Phone size={18} />
          </button>
          <button className={`p-2 rounded-full transition-colors ${
            darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
          }`}>
            <Video size={18} />
          </button>
          <button className={`p-2 rounded-full transition-colors ${
            darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
          }`}>
            <MoreVertical size={18} />
          </button>
        </div>
      </div>
      
      {/* Messages Area - Flexible height */}
      <div className={`flex-1 p-4 overflow-y-auto ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}>
        <div className="flex flex-col space-y-3">
          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[85%] sm:max-w-[75%] px-4 py-2 rounded-2xl shadow-sm ${
                msg.sender === "me" 
                  ? darkMode
                    ? "bg-blue-600 text-white rounded-tr-none"
                    : "bg-blue-500 text-white rounded-tr-none"
                  : darkMode
                    ? "bg-gray-800 text-gray-100 rounded-tl-none"
                    : "bg-white text-gray-800 rounded-tl-none border border-gray-200"
              }`}>
                <p className="mb-1 break-words">{msg.message}</p>
                <div className={`flex items-center justify-end gap-1 text-[10px] ${
                  msg.sender === "me" ? "text-blue-100" : darkMode ? "text-gray-400" : "text-gray-500"
                }`}>
                  <span>{msg.time}</span>
                  {msg.sender === "me" && (
                    <span>
                      {msg.status === "sending" ? (
                        <span className="opacity-70">•</span>
                      ) : msg.status === "sent" ? (
                        <CheckCheck size={12} className="opacity-70" />
                      ) : (
                        <CheckCheck size={12} className={darkMode ? "text-blue-300" : "text-blue-400"} />
                      )}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          
          {typing && (
            <div className="flex justify-start">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`px-4 py-2 rounded-2xl rounded-tl-none ${
                  darkMode ? "bg-gray-800" : "bg-white border border-gray-200"
                }`}
              >
                <div className="flex space-x-1">
                  <motion.span 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "loop", delay: 0 }}
                    className="h-2 w-2 rounded-full bg-gray-400"
                  ></motion.span>
                  <motion.span 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "loop", delay: 0.2 }}
                    className="h-2 w-2 rounded-full bg-gray-400"
                  ></motion.span>
                  <motion.span 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "loop", delay: 0.4 }}
                    className="h-2 w-2 rounded-full bg-gray-400"
                  ></motion.span>
                </div>
              </motion.div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input Area - Fixed height */}
      <div className={`p-3 border-t ${darkMode ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-white"}`}>
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input 
              type="text" 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Escreva uma mensagem..."
              className={`w-full py-2 px-4 pr-12 rounded-full outline-none ${
                darkMode 
                  ? "bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:border-blue-500" 
                  : "bg-gray-100 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:bg-white border border-transparent"
              } transition-colors`}
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              <button className={`p-1 rounded-full ${darkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"}`}>
                <Paperclip size={18} />
              </button>
              <button className={`p-1 rounded-full ${darkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"}`}>
                <Smile size={18} onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
              </button>
            </div>
          </div>
          
          <button 
            onClick={handleSendMessage}
            className={`p-3 rounded-full flex-shrink-0 ${
              newMessage.trim() === "" 
                ? darkMode 
                  ? "bg-gray-800 text-gray-400" 
                  : "bg-gray-200 text-gray-400" 
                : "bg-blue-500 hover:bg-blue-600 text-white"
            } transition-colors`}
            disabled={newMessage.trim() === ""}
          >
            {newMessage.trim() === "" ? <Mic size={20} /> : <Send size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CorpoChat;