import React, { useContext, useState } from "react";
import {
  User,
  Bell,
  LogOut,
  Menu,
  X,
  Search,
  Home,
  Heart,
  MessageSquare,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SProvider } from "../../utils/context/sizes";
import { CProvider } from "../../utils/context/autentication";
import { useTheme } from "../../utils/context/themeContext";
import { ThemeSwitcher } from "../theme/ThemeSwitcher";

const Header = () => {
  const { logged, setLogged } = useContext(CProvider);
  const { isOpen, setOpen } = useContext(SProvider);
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem("myTokenUser");
    navigate("/login");
    setLogged(!logged);
  }

  const navLinks = [
    { path: "", name: "Home", icon: <Home size={18} /> },
    { path: "pesquisar", name: "Pesquisar", icon: <Search size={18} /> },
    { path: "favoritos", name: "Favoritos", icon: <Heart size={18} /> },
    { path: "chat", name: "Chat", icon: <MessageSquare size={18} /> },
  ];

  const isActive = (path) => {
    return location.pathname === `/home/${path}`;
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        darkMode
          ? "bg-gray-900/95 text-white border-b border-gray-800"
          : "bg-white/95 text-gray-800 shadow-sm border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3 md:px-6">
        {/* Logo */}
        <Link to="/home" className="relative z-50">
          <h2 className="text-xl md:text-2xl font-bold">
            <span className={darkMode ? "text-blue-400" : "text-blue-600"}>
              Sapritec
            </span>
            <span>.service</span>
          </h2>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`flex items-center text-14 gap-1.5 py-2 px-1 transition-all duration-200 border-b-2 ${
                    isActive(link.path)
                      ? darkMode
                        ? "border-blue-400 text-blue-400"
                        : "border-blue-600 text-blue-600"
                      : darkMode
                        ? "border-transparent text-gray-300 hover:text-white"
                        : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            className={`p-2 rounded-full transition-colors ${
              darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
            }`}
          >
            <User size={20} />
          </button>
          <button
            className={`p-2 rounded-full transition-colors ${
              darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
            }`}
          >
            <Bell size={20} />
          </button>
          <button
            onClick={handleLogout}
            className={`p-2 rounded-full transition-colors ${
              darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
            }`}
          >
            <LogOut size={20} />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`p-2 md:hidden rounded-full z-50 transition-colors ${
            mobileMenuOpen
              ? darkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-200 text-gray-900"
              : "text-current"
          }`}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>

      {/* Mobile Menu - Improved with better transitions and styling */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`fixed inset-0 z-40 ${
              darkMode
                ? "bg-gray-900/95"
                : "bg-white/95"
            }`}
          >
            <motion.nav
              className="container mx-auto px-4 pt-20 pb-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <motion.li
                    key={link.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center text-14 gap-3 p-4 rounded-lg transition-colors ${
                        isActive(link.path)
                          ? darkMode
                            ? "bg-gray-800/80 text-blue-400"
                            : "bg-blue-50/80 text-blue-600"
                          : darkMode
                            ? "text-gray-200 hover:bg-gray-800/50"
                            : "text-gray-700 hover:bg-gray-100/70"
                      }`}
                    >
                      {link.icon}
                      <span className="font-medium">{link.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                className="mt-8 pt-6 space-y-2 border-t border-opacity-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex justify-between items-center">
                  <h3
                    className={`text-sm uppercase ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Conta
                  </h3>
                </div>

                <button
                  className={`flex w-full items-center gap-3 p-4 rounded-lg ${
                    darkMode
                      ? "text-red-300 hover:bg-red-900/30"
                      : "text-red-500 hover:bg-red-50"
                  }`}
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                  <span className="font-medium">Sair</span>
                </button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
