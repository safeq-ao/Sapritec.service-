import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../../utils/context/themeContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Clock,
  FileText,
  DollarSign,
  MessageSquare,
  User,
  LogOut,
  ChevronRight,
  Menu,
  X,
  Settings,
  Sun,
  Moon,
  Bell,
  Plus  // Ensure Plus icon is imported
} from 'lucide-react';

const SidebarPrestadora = ({ children }) => {
  const { darkMode, toggleTheme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile && isMobileOpen) {
        setIsMobileOpen(false);
      }
      if (mobile && !isCollapsed) {
        setIsCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileOpen, isCollapsed]);

  // Auto-collapse on mobile
  useEffect(() => {
    if (isMobile && !isCollapsed) {
      setIsCollapsed(true);
    }
  }, [isMobile]);

  const navItems = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard size={20} strokeWidth={1.5} />,
      path: '/prestadora/dashboard'
    },
    {
      title: 'Histórico',
      icon: <Clock size={20} strokeWidth={1.5} />,
      path: '/prestadora/historico'
    },
    {
      title: 'Resumo',
      icon: <FileText size={20} strokeWidth={1.5} />,
      path: '/prestadora/resumo'
    },
    {
      title: 'Pedidos Recebidos',
      icon: <FileText size={20} strokeWidth={1.5} />,
      path: '/prestadora/recebidos',
      badge: 5
    },
    {
      title: 'Pagamentos',
      icon: <DollarSign size={20} strokeWidth={1.5} />,
      path: '/prestadora/pagamentos'
    },
    {
      title: 'Mensagens',
      icon: <MessageSquare size={20} strokeWidth={1.5} />,
      path: '/prestadora/mensagem',
      badge: 3
    },
    {
      title: 'Adicionar Serviço',
      icon: <Plus size={20} strokeWidth={1.5} />,
      path: '/prestadora/adicionar-servico'
    },
    {
      title: 'Perfil',
      icon: <User size={20} strokeWidth={1.5} />,
      path: '/prestadora/perfil'
    }
  ];

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logout clicked");
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  // Check if a path is active
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const sidebarVariants = {
    expanded: {
      width: 280,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
    },
    collapsed: {
      width: 80,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
    },
    mobileExpanded: {
      x: 0,
      transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
    },
    mobileCollapsed: {
      x: '-100%',
      transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      {/* Mobile Menu Button and Top Bar */}
      <div className={`fixed top-0 left-0 right-0 z-30 flex items-center justify-between p-4 lg:hidden ${
        darkMode ? 'bg-gray-900/90 backdrop-blur-md border-b border-gray-800' : 'bg-white/90 backdrop-blur-md border-b border-gray-100'
      }`}>
        <button 
          onClick={toggleMobileSidebar}
          className={`p-2 rounded-full ${
            darkMode 
              ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          } transition-colors duration-200`}
          aria-label="Toggle Menu"
        >
          <Menu size={22} />
        </button>
        
        <div className="flex items-center">
          <h1 className="font-bold text-xl">
            <span className={darkMode ? "text-blue-400" : "text-blue-600"}>Sapritec</span>
            <span>.service</span>
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            className={`p-2 rounded-full relative ${
              darkMode 
                ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } transition-colors duration-200`}
            aria-label="Notifications"
          >
            <Bell size={20} strokeWidth={1.5} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              darkMode 
                ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } transition-colors duration-200`}
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={20} strokeWidth={1.5} /> : <Moon size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={toggleMobileSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        variants={sidebarVariants}
        animate={isMobile 
          ? (isMobileOpen ? 'mobileExpanded' : 'mobileCollapsed') 
          : (isCollapsed ? 'collapsed' : 'expanded')
        }
        className={`fixed top-0 left-0 h-full z-50 lg:static lg:z-auto ${
          darkMode 
            ? 'bg-gray-800 shadow-2xl shadow-black/20' 
            : 'bg-white shadow-2xl shadow-black/5'
        } flex flex-col`}
      >
        {/* Close button for mobile sidebar */}
        <div className="p-4 lg:hidden flex justify-end">
          <button
            onClick={toggleMobileSidebar}
            className={`p-2 rounded-full ${
              darkMode 
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } transition-colors duration-200`}
            aria-label="Close Menu"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Logo Area */}
        <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
          {(!isCollapsed || isMobile) && (
            <Link to="/prestadora/dashboard" className="flex items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                darkMode ? 'bg-blue-500/20' : 'bg-blue-100'
              }`}>
                <span className={`text-xl font-bold ${darkMode ? "text-blue-400" : "text-blue-600"}`}>S</span>
              </div>
              <h1 className="font-bold text-xl ml-2">
                <span className={darkMode ? "text-blue-400" : "text-blue-600"}>Sapritec</span>
                <span className={darkMode ? "text-gray-300" : "text-gray-700"}>.service</span>
              </h1>
            </Link>
          )}
          {isCollapsed && !isMobile && (
            <div className="w-full flex justify-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                darkMode ? 'bg-blue-500/20' : 'bg-blue-100'
              }`}>
                <span className={`text-xl font-bold ${darkMode ? "text-blue-400" : "text-blue-600"}`}>S</span>
              </div>
            </div>
          )}
          {!isMobile && (
            <button 
              onClick={toggleSidebar}
              className={`hidden lg:block p-2 rounded-full ${
                darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-500'
              } transition-colors duration-200`}
              aria-label="Toggle Sidebar"
            >
              <ChevronRight 
                size={18} 
                strokeWidth={1.5}
                className={`transform transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} 
              />
            </button>
          )}
        </div>

        {/* User Profile at Top */}
        <div className={`px-4 py-5 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          {(!isCollapsed || isMobile) && (
            <div className="flex items-center space-x-3">
              <div className={`relative w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-600'
              }`}>
                <span>MS</span>
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 ${
                  darkMode ? 'border-gray-800 bg-green-400' : 'border-white bg-green-500'
                }`}></span>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-medium truncate">Maria Silva</h2>
                <p className={`text-sm truncate ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Eletricista Profissional
                </p>
              </div>
            </div>
          )}
          {isCollapsed && !isMobile && (
            <div className="flex justify-center">
              <div className={`relative w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-600'
              }`}>
                <span>MS</span>
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 ${
                  darkMode ? 'border-gray-800 bg-green-400' : 'border-white bg-green-500'
                }`}></span>
              </div>
            </div>
          )}
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto pt-4 pb-2 px-2">
          <div className={`px-3 mb-2 ${isCollapsed && !isMobile ? 'text-center' : ''}`}>
            <p className={`uppercase text-xs font-medium tracking-wider ${
              darkMode ? 'text-gray-500' : 'text-gray-400'
            }`}>
              {isCollapsed && !isMobile ? 'Menu' : 'Navegação'}
            </p>
          </div>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`group flex items-center justify-${isCollapsed && !isMobile ? 'center' : 'start'} p-3 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? darkMode
                        ? 'bg-blue-500/10 text-blue-400 font-medium'
                        : 'bg-blue-50 text-blue-600 font-medium'
                      : darkMode
                        ? 'text-gray-300 hover:bg-gray-700/50'
                        : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className={`flex-shrink-0 relative ${isCollapsed && !isMobile ? '' : 'mr-3'}`}>
                    {item.icon}
                    {item.badge && (
                      <span className={`absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-xs rounded-full ${
                        darkMode ? 'bg-blue-400 text-gray-900' : 'bg-blue-600 text-white'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {(!isCollapsed || isMobile) && (
                    <span className="truncate">{item.title}</span>
                  )}
                  {(!isCollapsed || isMobile) && item.badge && !isActive(item.path) && (
                    <span className={`ml-auto ${
                      darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                    } text-xs font-medium px-2 py-0.5 rounded-full`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Actions */}
        <div className={`p-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          {isCollapsed && !isMobile ? (
            <div className="flex flex-col items-center space-y-4 pt-2">
              <button
                onClick={toggleTheme}
                className={`p-3 rounded-full transition-colors ${
                  darkMode
                    ? 'hover:bg-gray-700 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
                aria-label="Toggle Theme"
              >
                {darkMode ? <Sun size={20} strokeWidth={1.5} /> : <Moon size={20} strokeWidth={1.5} />}
              </button>
              <button
                onClick={handleLogout}
                className={`p-3 rounded-full transition-colors ${
                  darkMode
                    ? 'hover:bg-red-900/20 text-red-400'
                    : 'hover:bg-red-50 text-red-600'
                }`}
                aria-label="Logout"
              >
                <LogOut size={20} strokeWidth={1.5} />
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={toggleTheme}
                className={`w-full flex items-center p-3 rounded-lg transition-colors mb-2 ${
                  darkMode
                    ? 'hover:bg-gray-700 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {darkMode ? <Sun size={20} strokeWidth={1.5} /> : <Moon size={20} strokeWidth={1.5} />}
                <span className="ml-3">{darkMode ? 'Modo Claro' : 'Modo Escuro'}</span>
              </button>
              <button
                onClick={handleLogout}
                className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                  darkMode
                    ? 'hover:bg-red-900/20 text-red-400'
                    : 'hover:bg-red-50 text-red-600'
                }`}
              >
                <LogOut size={20} strokeWidth={1.5} />
                <span className="ml-3">Sair</span>
              </button>
            </>
          )}
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Desktop Header */}
        <header className={`hidden lg:flex items-center justify-end p-4 ${
          darkMode ? 'bg-gray-900 border-b border-gray-800' : 'bg-white border-b border-gray-100'
        }`}>
          <div className="flex items-center space-x-4">
            <button 
              className={`p-2 rounded-full relative ${
                darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
              } transition-colors`}
              aria-label="Notifications"
            >
              <Bell size={20} strokeWidth={1.5} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className={`h-8 ${darkMode ? 'border-gray-700' : 'border-gray-200'} border-r mx-2`}></div>
            
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-600'
              }`}>
                MS
              </div>
              <div>
                <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Maria Silva</p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Prestadora</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area - adjust padding for mobile header */}
        <main className={`flex-1 overflow-x-hidden overflow-y-auto ${
          isMobile ? 'pt-16' : ''
        }`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default SidebarPrestadora;