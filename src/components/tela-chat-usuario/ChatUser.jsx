import React, { useEffect } from 'react';
import { useTheme } from '../../utils/context/themeContext';
import ChatContainer from '../chat/ChatContainer';
import { MessageCircle } from 'lucide-react';

export const ChatUser = () => {
  const { darkMode } = useTheme();

  // Set document title directly instead of using react-helmet
  useEffect(() => {
    document.title = "Chat - Sapritec Services";
    // Restore the title when component unmounts
    return () => {
      document.title = "Sapritec Services";
    };
  }, []);

  return (
    <main className={`min-h-screen flex flex-col ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Page header - visible only on desktop */}
      <div className={`hidden md:flex items-center justify-between px-8 py-4 ${
        darkMode ? 'border-b border-gray-800' : 'border-b border-gray-200'
      }`}>
        <div className="flex items-center gap-3">
          <MessageCircle className="text-blue-500" size={24} />
          <h1 className="text-2xl font-semibold">Mensagens</h1>
        </div>
        <div className="text-sm">
          <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
            Mantenha contato com seus clientes e prestadores de serviço
          </span>
        </div>
      </div>

      {/* Chat container - takes full width and height */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] max-w-7xl mx-auto w-full">
          <ChatContainer />
        </div>
      </div>
    </main>
  );
};

export default ChatUser;
