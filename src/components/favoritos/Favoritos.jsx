import React from "react";
import { useTheme } from "../../utils/context/themeContext";
import { Briefcase, User } from "lucide-react";
import { motion } from "framer-motion";

const Favoritos = () => {
  const { darkMode } = useTheme();

  // Mock data for favorited services and providers
  const favoriteServices = [
    {
      id: 1,
      title: "Manutenção Residencial",
      description: "Serviço rápido e confiável para manutenção residencial.",
      icon: <Briefcase size={28} />
    },
    {
      id: 2,
      title: "Assistência Elétrica",
      description: "Profissionais qualificados para resolver problemas elétricos.",
      icon: <Briefcase size={28} />
    }
  ];

  const favoriteProviders = [
    {
      id: 1,
      name: "João Silva",
      specialization: "Encanador Especializado",
      icon: <User size={28} />
    },
    {
      id: 2,
      name: "Maria Oliveira",
      specialization: "Eletricista Qualificada",
      icon: <User size={28} />
    }
  ];

  // Framer Motion variants for card animations
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
  };

  return (
    <div className={`min-h-screen p-6 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-10 text-center">
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-4xl font-bold">
            <span className={darkMode ? "text-blue-400" : "text-blue-600"}>Favoritos</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className={`mt-3 text-lg ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            Confira seus serviços e prestadores favoritos
          </motion.p>
        </header>

        {/* Favorite Services Section */}
        <section className="mb-12">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-semibold mb-4 border-b pb-2 border-gray-300"
          >
            Serviços Favoritados
          </motion.h2>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {favoriteServices.map((service) => (
              <motion.div
                key={service.id}
                className={`p-6 rounded-2xl shadow-2xl transition transform hover:-translate-y-1 ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-blue-100 rounded-full shadow-md">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                </div>
                <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Favorite Providers Section */}
        <section>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-semibold mb-4 border-b pb-2 border-gray-300"
          >
            Prestadores Favoritados
          </motion.h2>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {favoriteProviders.map((provider) => (
              <motion.div
                key={provider.id}
                className={`p-6 rounded-2xl shadow-2xl transition transform hover:-translate-y-1 ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-green-100 rounded-full shadow-md">
                    {provider.icon}
                  </div>
                  <h3 className="text-xl font-bold">{provider.name}</h3>
                </div>
                <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  {provider.specialization}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Favoritos;