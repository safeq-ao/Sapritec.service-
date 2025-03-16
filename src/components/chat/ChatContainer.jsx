import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../utils/context/themeContext';
import { ChevronLeft, Users, UserCircle, X } from 'lucide-react';
import CorpoChat from './CorpoChat';
import Detalhe from './Detalhe';
import MenuMensagem from './MenuMensagem';

const ChatContainer = () => {
  const { darkMode } = useTheme();
  const [selectedChat, setSelectedChat] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeSection, setActiveSection] = useState('list'); // 'list', 'chat', or 'details'

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      // If we're on desktop, reset the active section
      if (window.innerWidth >= 768) {
        setActiveSection('chat');
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle chat selection from MenuMensagem
  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId);
    if (isMobile) {
      setActiveSection('chat');
    }
  };

  // Navigate back to list on mobile
  const handleBackToList = () => {
    setActiveSection('list');
  };

  // Toggle profile details on mobile
  const handleToggleDetails = () => {
    setActiveSection(activeSection === 'details' ? 'chat' : 'details');
  };

  return (
    <div className={`h-screen flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Container with max width and auto margins for larger screens */}
      <div className="w-full max-w-7xl mx-auto h-full flex flex-col">
        {/* Mobile Header */}
        {isMobile && (
          <header className={`px-4 py-3 flex items-center justify-between ${
            darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
          } border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            {activeSection === 'chat' && (
              <button 
                onClick={handleBackToList}
                className="p-2 rounded-full hover:bg-opacity-10 hover:bg-black"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            <h1 className="text-lg font-semibold">
              {activeSection === 'list' && 'Mensagens'}
              {activeSection === 'chat' && 'Conversa'}
              {activeSection === 'details' && 'Detalhes'}
            </h1>
            {activeSection === 'chat' && (
              <button 
                onClick={handleToggleDetails}
                className="p-2 rounded-full hover:bg-opacity-10 hover:bg-black"
              >
                <UserCircle size={20} />
              </button>
            )}
            {activeSection === 'details' && (
              <button 
                onClick={() => setActiveSection('chat')}
                className="p-2 rounded-full hover:bg-opacity-10 hover:bg-black"
              >
                <X size={20} />
              </button>
            )}
          </header>
        )}
        
        {/* Main content area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Message List */}
          <AnimatePresence mode="wait">
            {(!isMobile || activeSection === 'list') && (
              <motion.div 
                key="message-list"
                initial={isMobile ? { x: -300, opacity: 0 } : { opacity: 1 }}
                animate={{ x: 0, opacity: 1 }}
                exit={isMobile ? { x: -300, opacity: 0 } : { opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`${
                  isMobile ? 'w-full absolute inset-0 z-10' : 'w-1/3 border-r'
                } ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <div className="p-3 h-full overflow-hidden flex flex-col">
                  <MenuMensagem onChatSelect={handleChatSelect} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat Area */}
          <AnimatePresence mode="wait">
            {(!isMobile || activeSection === 'chat' || activeSection === 'details') && (
              <motion.div 
                key="chat-area"
                initial={isMobile ? { x: 300, opacity: 0 } : { opacity: 1 }}
                animate={{ x: 0, opacity: 1 }}
                exit={isMobile ? { x: 300, opacity: 0 } : { opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`${
                  isMobile ? 'w-full' : 'w-2/3'
                } flex flex-col flex-1 overflow-hidden`}
              >
                <div className="flex flex-1 overflow-hidden">
                  {/* Chat Content */}
                  <AnimatePresence mode="wait">
                    {(!isMobile || activeSection !== 'details') && (
                      <motion.div 
                        key="chat-content"
                        initial={isMobile && activeSection === 'details' ? { x: -300, opacity: 0 } : { opacity: 1 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={isMobile && activeSection === 'details' ? { x: -300, opacity: 0 } : { opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`${
                          isMobile || activeSection === 'details' ? 'w-full' : 'w-2/3 border-r'
                        } ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex-1 flex flex-col overflow-hidden`}
                      >
                        <div className="p-3 h-full flex flex-col">
                          {selectedChat ? (
                            <CorpoChat selectedChat={selectedChat} />
                          ) : (
                            <div className={`flex-1 flex items-center justify-center flex-col p-6 text-center rounded-lg ${
                              darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'
                            }`}>
                              <Users size={48} className="mb-4 opacity-50" />
                              <h3 className="text-xl font-medium mb-2">Selecione uma conversa</h3>
                              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                Escolha uma conversa da lista para começar a falar
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Details Sidebar */}
                  <AnimatePresence mode="wait">
                    {(!isMobile && selectedChat) || (isMobile && activeSection === 'details') ? (
                      <motion.div 
                        key="details-sidebar"
                        initial={isMobile ? { x: 300, opacity: 0 } : { opacity: 0, x: 50 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={isMobile ? { x: 300, opacity: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.2 }}
                        className={`${
                          isMobile ? 'w-full absolute inset-0 z-10' : 'w-1/3'
                        }`}
                      >
                        <div className="p-3 h-full">
                          <Detalhe />
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Navigation */}
        {isMobile && (
          <nav className={`flex justify-around py-2 border-t ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <button 
              onClick={() => setActiveSection('list')}
              className={`p-2 rounded-full ${
                activeSection === 'list' 
                  ? darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'
                  : ''
              }`}
            >
              <Users size={20} />
            </button>
            {selectedChat && (
              <button 
                onClick={() => setActiveSection('chat')}
                className={`p-2 rounded-full ${
                  activeSection === 'chat' 
                    ? darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'
                    : ''
                }`}
              >
                <ChevronLeft size={20} />
              </button>
            )}
            {selectedChat && (
              <button 
                onClick={() => setActiveSection('details')}
                className={`p-2 rounded-full ${
                  activeSection === 'details' 
                    ? darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'
                    : ''
                }`}
              >
                <UserCircle size={20} />
              </button>
            )}
          </nav>
        )}
      </div>
    </div>
  );
};

export default ChatContainer;