import React from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../utils/context/themeContext";

export const ThemeSwitcher = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <motion.button
      className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg z-50 backdrop-blur-sm ${
        darkMode 
          ? "bg-gray-800 text-gray-100 border border-gray-700" 
          : "bg-white text-gray-800 border border-gray-200"
      }`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {darkMode ? (
        <Sun size={20} className="text-yellow-300" />
      ) : (
        <Moon size={20} className="text-blue-600" />
      )}
    </motion.button>
  );
};