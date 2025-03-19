import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../../utils/context/themeContext';
import { motion } from 'framer-motion';
import {
  Search,
  Phone,
  Video,
  MoreVertical,
  Send,
  Paperclip,
  Image,
  Smile,
  MicIcon,
  Check,
  CheckCheck,
  Clock,
  Calendar,
  ArrowLeft,
  Filter
} from 'lucide-react';

// Mock data for conversations
const conversations = [
  {
    id: 1,
    name: 'João Silva',
    avatar: null, // Will use initials
    lastMessage: 'Poderia me dizer quando você vai chegar?',
    timestamp: '14:30',
    unread: 2,
    isOnline: true
  },
  {
    id: 2,
    name: 'Maria Oliveira',
    avatar: null,
    lastMessage: 'Obrigada pelo serviço! Ficou ótimo.',
    timestamp: '12:45',
    unread: 0,
    isOnline: false
  },
  {
    id: 3,
    name: 'Carlos Santos',
    avatar: null,
    lastMessage: 'Vou precisar remarcar para amanhã.',
    timestamp: 'Ontem',
    unread: 0,
    isOnline: true
  },
  {
    id: 4,
    name: 'Ana Pereira',
    avatar: null,
    lastMessage: 'Qual seria o valor para refazer o serviço?',
    timestamp: 'Ontem',
    unread: 0,
    isOnline: false
  },
  {
    id: 5,
    name: 'Roberto Almeida',
    avatar: null,
    lastMessage: 'Já cheguei em casa, pode vir.',
    timestamp: '18/03',
    unread: 0,
    isOnline: false
  }
];

// Mock data for messages
const mockMessages = {
  1: [
    {
      id: 1,
      senderId: 1,
      text: 'Olá, tudo bem? Estou precisando do seu serviço de instalação elétrica.',
      time: '13:45',
      status: 'read',
      date: 'Hoje'
    },
    {
      id: 2,
      senderId: 'me',
      text: 'Olá João! Tudo ótimo, sim. Claro, posso ajudar com a instalação elétrica. Poderia me fornecer mais detalhes sobre o que precisa ser feito?',
      time: '13:50',
      status: 'read',
      date: 'Hoje'
    },
    {
      id: 3,
      senderId: 1,
      text: 'Preciso instalar 3 tomadas novas e trocar a fiação da sala.',
      time: '14:00',
      status: 'read',
      date: 'Hoje'
    },
    {
      id: 4,
      senderId: 'me',
      text: 'Entendi. Posso fazer esse serviço amanhã, por volta das 14h. O valor estimado seria de R$250,00, incluindo material. O que acha?',
      time: '14:10',
      status: 'read',
      date: 'Hoje'
    },
    {
      id: 5,
      senderId: 1,
      text: 'Perfeito. Poderia me dizer quando você vai chegar?',
      time: '14:30',
      status: 'delivered',
      date: 'Hoje'
    }
  ],
  2: [
    {
      id: 1,
      senderId: 2,
      text: 'Olá, o serviço de pintura ficou excelente!',
      time: '10:20',
      status: 'read',
      date: 'Hoje'
    },
    {
      id: 2,
      senderId: 'me',
      text: 'Olá Maria! Muito obrigada pelo feedback. Fico feliz que tenha gostado do resultado!',
      time: '11:05',
      status: 'read',
      date: 'Hoje'
    },
    {
      id: 3,
      senderId: 2,
      text: 'As cores ficaram exatamente como eu queria. Você capturou perfeitamente a ideia.',
      time: '11:30',
      status: 'read',
      date: 'Hoje'
    },
    {
      id: 4,
      senderId: 'me',
      text: 'Ótimo! Sempre busco atender as expectativas dos clientes. Se precisar de qualquer retoque ou de outro serviço, é só entrar em contato.',
      time: '12:00',
      status: 'read',
      date: 'Hoje'
    },
    {
      id: 5,
      senderId: 2,
      text: 'Obrigada pelo serviço! Ficou ótimo.',
      time: '12:45',
      status: 'read',
      date: 'Hoje'
    }
  ]
};

const Mensagem = () => {
  const { darkMode } = useTheme();
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileView, setMobileView] = useState(window.innerWidth < 768);
  const [showConversations, setShowConversations] = useState(true);
  const messagesEndRef = useRef(null);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowConversations(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedConversation]);

  const filteredConversations = conversations.filter(
    conversation => conversation.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMessageObj = {
      id: messages[selectedConversation]?.length + 1 || 1,
      senderId: 'me',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
      date: 'Hoje'
    };

    setMessages(prev => ({
      ...prev,
      [selectedConversation]: [...(prev[selectedConversation] || []), newMessageObj]
    }));
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getInitials = (name) => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`;
    }
    return names[0][0];
  };

  const getMessageStatus = (status) => {
    switch (status) {
      case 'sent':
        return <Clock size={14} className="text-gray-400" />;
      case 'delivered':
        return <Check size={14} className="text-gray-400" />;
      case 'read':
        return <CheckCheck size={14} className={darkMode ? "text-blue-400" : "text-blue-500"} />;
      default:
        return null;
    }
  };

  const formatMessageDate = (date) => {
    // Here you would implement date formatting logic
    // For now, we'll just return the mock date
    return date;
  };

  const selectConversation = (id) => {
    setSelectedConversation(id);
    if (mobileView) {
      setShowConversations(false);
    }
  };

  const backToConversations = () => {
    setShowConversations(true);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const selectedConvo = conversations.find(c => c.id === selectedConversation);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`flex h-full ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}
    >
      {/* Conversations Sidebar */}
      {(showConversations || !mobileView) && (
        <motion.div
          variants={itemVariants}
          className={`w-full md:w-96 ${mobileView ? 'absolute inset-0 z-10' : 'relative'} flex flex-col ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } shadow-lg md:shadow-none overflow-hidden`}
        >
          {/* Header */}
          <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className="text-lg font-bold mb-4">Mensagens</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Pesquisar conversas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-gray-100 border-gray-200 text-gray-900 placeholder-gray-500'
                } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <Search
                size={18}
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              />
            </div>
          </div>

          {/* Filter tabs */}
          <div className={`px-4 py-2 border-b flex space-x-1 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <button className={`px-3 py-1 text-sm font-medium rounded-full ${
              darkMode
                ? 'bg-blue-900/20 text-blue-400'
                : 'bg-blue-100 text-blue-700'
            }`}>
              Todos
            </button>
            <button className={`px-3 py-1 text-sm font-medium rounded-full ${
              darkMode
                ? 'text-gray-400 hover:bg-gray-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}>
              Não lidos
            </button>
            <button className={`px-3 py-1 text-sm font-medium rounded-full ${
              darkMode
                ? 'text-gray-400 hover:bg-gray-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}>
              Recentes
            </button>
          </div>

          {/* Conversations list */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <Search size={48} className={`mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                <p className={`text-lg font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Nenhuma conversa encontrada
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Tente mudar seus termos de busca
                </p>
              </div>
            ) : (
              filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => selectConversation(conversation.id)}
                  className={`px-4 py-3 cursor-pointer transition-colors ${
                    conversation.id === selectedConversation && !mobileView
                      ? darkMode
                        ? 'bg-gray-700'
                        : 'bg-blue-50'
                      : darkMode
                      ? 'hover:bg-gray-700'
                      : 'hover:bg-gray-100'
                  } border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                >
                  <div className="flex items-center">
                    <div className="relative">
                      {conversation.avatar ? (
                        <img
                          src={conversation.avatar}
                          alt={conversation.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold ${
                          darkMode ? 'bg-gray-600' : 'bg-blue-100'
                        }`}>
                          {getInitials(conversation.name)}
                        </div>
                      )}
                      {conversation.isOnline && (
                        <span className={`absolute -top-1 -right-1 w-4 h-4 border-2 rounded-full ${
                          darkMode ? 'border-gray-800 bg-green-500' : 'border-white bg-green-500'
                        }`}></span>
                      )}
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h3 className={`text-sm font-semibold truncate`}>
                          {conversation.name}
                        </h3>
                        <span className={`text-xs ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {conversation.timestamp}
                        </span>
                      </div>
                      <p className={`text-sm truncate mt-1 ${
                        conversation.unread > 0
                          ? 'font-medium'
                          : darkMode 
                            ? 'text-gray-400' 
                            : 'text-gray-500'
                      }`}>
                        {conversation.lastMessage}
                      </p>
                    </div>
                    {conversation.unread > 0 && (
                      <span className={`ml-2 w-5 h-5 flex items-center justify-center rounded-full text-xs ${
                        darkMode ? 'bg-blue-500 text-white' : 'bg-blue-500 text-white'
                      }`}>
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      )}

      {/* Chat Area */}
      {(!showConversations || !mobileView) && selectedConvo && (
        <motion.div
          variants={itemVariants}
          className="flex-1 flex flex-col h-full"
        >
          {/* Chat Header */}
          <div className={`p-4 border-b flex items-center justify-between ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center">
              {mobileView && (
                <button
                  onClick={backToConversations}
                  className={`mr-2 p-2 rounded-full ${
                    darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <ArrowLeft size={20} />
                </button>
              )}
              <div className="relative">
                {selectedConvo.avatar ? (
                  <img
                    src={selectedConvo.avatar}
                    alt={selectedConvo.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    darkMode ? 'bg-gray-600' : 'bg-blue-100'
                  }`}>
                    {getInitials(selectedConvo.name)}
                  </div>
                )}
                {selectedConvo.isOnline && (
                  <span className={`absolute bottom-0 right-0 w-3 h-3 border-2 rounded-full ${
                    darkMode ? 'border-gray-800 bg-green-500' : 'border-white bg-green-500'
                  }`}></span>
                )}
              </div>
              <div className="ml-3">
                <h3 className="font-semibold">{selectedConvo.name}</h3>
                <p className={`text-xs ${
                  selectedConvo.isOnline
                    ? 'text-green-500'
                    : darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {selectedConvo.isOnline ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className={`p-2 rounded-full ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}>
                <Phone size={20} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
              </button>
              <button className={`p-2 rounded-full ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}>
                <Video size={20} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
              </button>
              <button className={`p-2 rounded-full ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}>
                <MoreVertical size={20} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className={`flex-1 overflow-y-auto p-4 ${
            darkMode ? 'bg-gray-900' : 'bg-gray-50'
          }`}>
            {messages[selectedConversation]?.map((message, index) => {
              const isFirstMessageOfDay = index === 0 || message.date !== messages[selectedConversation][index - 1].date;
              
              return (
                <React.Fragment key={message.id}>
                  {isFirstMessageOfDay && (
                    <div className="flex justify-center my-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {formatMessageDate(message.date)}
                      </span>
                    </div>
                  )}
                  <div className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'} mb-4`}>
                    {message.senderId !== 'me' && (
                      <div className="flex-shrink-0 mr-3">
                        {selectedConvo.avatar ? (
                          <img
                            src={selectedConvo.avatar}
                            alt={selectedConvo.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                            darkMode ? 'bg-gray-600' : 'bg-blue-100'
                          }`}>
                            {getInitials(selectedConvo.name)}
                          </div>
                        )}
                      </div>
                    )}
                    <div className={`max-w-xs md:max-w-md lg:max-w-lg ${message.senderId === 'me' ? 'order-1' : ''}`}>
                      <div className={`px-4 py-3 rounded-lg shadow-sm ${
                        message.senderId === 'me'
                          ? darkMode
                            ? 'bg-blue-900/30 text-blue-50'
                            : 'bg-blue-500 text-white'
                          : darkMode
                            ? 'bg-gray-800 text-white'
                            : 'bg-white text-gray-900'
                      }`}>
                        {message.text}
                      </div>
                      <div className={`flex items-center mt-1 text-xs ${
                        darkMode ? 'text-gray-500' : 'text-gray-500'
                      } ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}>
                        <span>{message.time}</span>
                        {message.senderId === 'me' && (
                          <span className="ml-1">{getMessageStatus(message.status)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-t ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex items-end">
              <div className="flex-1">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua mensagem..."
                  rows={1}
                  className={`w-full px-4 py-2 rounded-lg resize-none ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-gray-100 border-gray-200 text-gray-900 placeholder-gray-500'
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              <div className="flex items-center ml-3">
                <button className={`p-2 rounded-full ${
                  darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                }`}>
                  <Paperclip size={20} />
                </button>
                <button className={`p-2 rounded-full ${
                  darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                }`}>
                  <Image size={20} />
                </button>
                <button className={`p-2 rounded-full ${
                  darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                }`}>
                  <Smile size={20} />
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className={`ml-1 p-3 rounded-full ${
                    newMessage.trim()
                      ? darkMode
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                      : darkMode
                        ? 'bg-gray-700 text-gray-500'
                        : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Mensagem;