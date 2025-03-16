import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../utils/context/themeContext";
import { 
  Search, Filter, X, ArrowRight, ArrowLeft,
  Home, MapPin, Tag, Star, Calendar, Clock, ChevronRight,
  SlidersHorizontal, Check, ArrowDownAZ, Sliders
} from "lucide-react";

// Simplified mock data with just one item
const mockServices = [
  {
    id_servicoPrestador: 1,
    servicoPrestador: {
      titulo: "Limpeza Doméstica",
      descricao: "Limpeza completa da sua casa com produtos de qualidade.",
      categoria_nome: "Limpeza",
      imagem: "/src/utils/image/capa.png",
      tags: "limpeza, casa, doméstica",
      avaliacao: 4.8,
      numAvaliacoes: 124,
    },
  }
];

const categories = [
  { id: 1, name: "Todas", icon: <Home size={16} /> },
  { id: 2, name: "Limpeza", icon: <Home size={16} /> }
];

const Pesquisar = () => {
  const { darkMode } = useTheme();
  const [selectedKey, setSelectedKey] = useState(null);
  const [getServices, setGetServices] = useState(mockServices);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [sortOption, setSortOption] = useState("relevant");
  const itemsPerPage = 1; // Changed to 1 since we only have one item
  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  // Filter services based on search query and category
  const filteredServices = getServices.filter((service) => {
    const matchesSearch = service.servicoPrestador.titulo
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === "Todas" || 
      service.servicoPrestador.categoria_nome === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Sort services based on selected sort option
  const sortedServices = [...filteredServices];
  
  // Pagination
  const totalPages = Math.ceil(sortedServices.length / itemsPerPage);
  const paginatedServices = sortedServices.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const nextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };
  
  // Service detail fetching (mock)
  const [selectedService, setSelectedService] = useState(null);
  
  useEffect(() => {
    if (selectedKey) {
      const service = getServices.find(s => s.id_servicoPrestador === selectedKey);
      setSelectedService(service);
    }
  }, [selectedKey, getServices]);
  
  return (
    <div 
      className={`min-h-screen font-poppins ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Header Section with modern gradient */}
      <div className={`py-10 px-4 md:px-10 relative overflow-hidden ${
        darkMode 
          ? "bg-gradient-to-br from-gray-800 to-gray-900" 
          : "bg-gradient-to-br from-blue-50 to-indigo-100"
      }`}>
        {darkMode && (
          <div className="absolute inset-0 opacity-5"></div>
        )}
        {!darkMode && (
          <div className="absolute inset-0 opacity-10"></div>
        )}
        
        <div className="max-w-7xl mx-auto relative">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Encontre <span className={`${darkMode ? "text-blue-400" : "text-blue-600"}`}>Serviços</span>
          </motion.h1>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Search className={`${darkMode ? "text-gray-400" : "text-gray-500"}`} size={18} />
            </div>
            <input
              type="search"
              placeholder="O que você está procurando?"
              value={searchQuery}
              onChange={handleSearchChange}
              className={`w-full pl-11 pr-12 py-4 rounded-xl border shadow-sm focus:outline-none focus:ring-2 ${
                darkMode 
                  ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500 placeholder:text-gray-500" 
                  : "bg-white border-gray-200 focus:ring-blue-500 placeholder:text-gray-400"
              }`}
            />
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`absolute inset-y-0 right-0 flex items-center mr-4 p-2 rounded-full ${
                darkMode 
                  ? isFilterOpen ? "bg-blue-900/50 text-blue-400" : "text-gray-300 hover:text-blue-400" 
                  : isFilterOpen ? "bg-blue-100 text-blue-600" : "text-gray-500 hover:text-blue-600"
              }`}
            >
              <SlidersHorizontal size={18} />
            </button>
          </motion.div>

          {/* Category Pills */}
          <motion.div 
            className="flex flex-wrap gap-2 mt-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.name)}
                className={`px-4 py-2 rounded-full text-sm flex items-center gap-1.5 transition-all duration-200 ${
                  activeCategory === category.name
                    ? darkMode 
                      ? "bg-blue-900/60 text-blue-300 border border-blue-700"
                      : "bg-blue-600 text-white shadow-sm"
                    : darkMode
                      ? "bg-gray-800/80 text-gray-300 border border-gray-700 hover:bg-gray-800"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300 shadow-sm"
                }`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </motion.div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`mt-5 rounded-xl p-5 overflow-hidden ${
                  darkMode ? "bg-gray-800 border border-gray-700" : "bg-white shadow-lg"
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Sliders size={16} className={darkMode ? "text-blue-400" : "text-blue-600"} />
                    Filtros Avançados
                  </h3>
                  <button 
                    onClick={() => setIsFilterOpen(false)}
                    className={`p-1.5 rounded-full ${
                      darkMode 
                        ? "hover:bg-gray-700 text-gray-400 hover:text-gray-200" 
                        : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <X size={16} />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2">Ordenar por</label>
                    <select 
                      className={`w-full rounded-lg border p-2.5 ${
                        darkMode 
                          ? "bg-gray-700 border-gray-600" 
                          : "bg-white border-gray-200"
                      }`}
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                    >
                      <option value="relevant">Relevância</option>
                      <option value="rating">Melhor Avaliação</option>
                      <option value="alphabetical">Ordem Alfabética</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Localização</label>
                    <select 
                      className={`w-full rounded-lg border p-2.5 ${
                        darkMode 
                          ? "bg-gray-700 border-gray-600" 
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <option>Todas as localidades</option>
                      <option>Kilamba</option>
                      <option>Luanda</option>
                      <option>Talatona</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Classificação mínima</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          className={`flex-1 py-2 rounded ${
                            rating <= 4 
                              ? darkMode 
                                ? "bg-blue-900/50 text-blue-300" 
                                : "bg-blue-600 text-white" 
                              : darkMode 
                                ? "bg-gray-700 text-gray-300" 
                                : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {rating}★
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4 pt-4 border-t border-gray-700">
                  <button 
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      darkMode 
                        ? "bg-blue-600 hover:bg-blue-700 text-white" 
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                    onClick={() => setIsFilterOpen(false)}
                  >
                    Aplicar Filtros
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto py-8 px-4 md:px-10">
        <motion.p 
          className={`mb-6 flex items-center gap-1.5 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
            {filteredServices.length}
          </span> 
          Serviços encontrados
          {searchQuery && (
            <>
              {" "}para <span className={`font-medium ${darkMode ? "text-blue-400" : "text-blue-600"}`}>"{searchQuery}"</span>
            </>
          )}
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Services List - Left Side */}
          <motion.div 
            className="lg:col-span-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <AnimatePresence mode="wait">
                {paginatedServices.length > 0 ? (
                  paginatedServices.map((service) => (
                    <ServiceCard 
                      key={service.id_servicoPrestador}
                      service={service}
                      isSelected={selectedKey === service.id_servicoPrestador}
                      onClick={() => setSelectedKey(service.id_servicoPrestador)}
                      darkMode={darkMode}
                      variants={itemVariants}
                    />
                  ))
                ) : (
                  <motion.div 
                    className={`col-span-2 p-8 text-center rounded-xl ${
                      darkMode ? "bg-gray-800" : "bg-white"
                    }`}
                    variants={itemVariants}
                  >
                    <p className="text-lg">Nenhum serviço encontrado.</p>
                    <p className="text-sm mt-2 text-gray-500">Tente uma busca diferente ou outros filtros.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Pagination Controls - Hidden when there's only one page */}
            {filteredServices.length > 0 && totalPages > 1 && (
              <div className="flex justify-between items-center">
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Página {page} de {totalPages}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={prevPage}
                    disabled={page === 1}
                    className={`p-2 rounded-lg ${
                      page === 1
                        ? darkMode 
                          ? "bg-gray-800 text-gray-600 cursor-not-allowed" 
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : darkMode 
                          ? "bg-gray-800 text-white hover:bg-gray-700" 
                          : "bg-white text-gray-700 hover:bg-gray-50 shadow-sm"
                    }`}
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <button
                    onClick={nextPage}
                    disabled={page === totalPages}
                    className={`p-2 rounded-lg ${
                      page === totalPages
                        ? darkMode 
                          ? "bg-gray-800 text-gray-600 cursor-not-allowed" 
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : darkMode 
                          ? "bg-gray-800 text-white hover:bg-gray-700" 
                          : "bg-white text-gray-700 hover:bg-gray-50 shadow-sm"
                    }`}
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
          
          {/* Service Detail - Right Side */}
          <div className="lg:col-span-1">
            <AnimatePresence mode="wait">
              {selectedService ? (
                <ServiceDetail 
                  service={selectedService}
                  darkMode={darkMode}
                />
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`p-8 rounded-xl text-center ${
                    darkMode ? "bg-gray-800" : "bg-white shadow-md"
                  }`}
                >
                  <div className="flex justify-center mb-4">
                    <div className={`p-4 rounded-full ${
                      darkMode ? "bg-gray-700" : "bg-blue-50"
                    }`}>
                      <Search 
                        size={24} 
                        className={darkMode ? "text-gray-400" : "text-blue-500"}
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Detalhes do serviço</h3>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    Selecione um serviço para ver mais informações
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

// Service Card Component
const ServiceCard = ({ service, isSelected, onClick, darkMode, variants }) => {
  return (
    <motion.div
      variants={variants}
      className={`rounded-xl overflow-hidden transition-all duration-200 ${
        isSelected 
          ? darkMode 
            ? "ring-2 ring-blue-500 bg-gray-800" 
            : "ring-2 ring-blue-500 bg-white shadow-md"
          : darkMode 
            ? "bg-gray-800 hover:bg-gray-750" 
            : "bg-white hover:bg-gray-50 shadow-md"
      }`}
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={service.servicoPrestador.imagem}
          className="w-full h-44 object-cover"
          alt={service.servicoPrestador.titulo}
        />
        <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium ${
          darkMode ? "bg-blue-900/80 text-blue-300" : "bg-blue-600 text-white"
        }`}>
          {service.servicoPrestador.categoria_nome}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{service.servicoPrestador.titulo}</h3>
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">
            <Star size={12} fill="currentColor" />
            {service.servicoPrestador.avaliacao}
          </div>
        </div>
        
        <p className={`mt-2 text-sm line-clamp-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          {service.servicoPrestador.descricao}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-3">
          {service.servicoPrestador.tags.split(',').map((tag, idx) => (
            <span key={idx} className={`inline-block px-2 py-1 text-xs rounded-full ${
              darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
            }`}>
              {tag.trim()}
            </span>
          ))}
        </div>
        
        <div className="mt-4 pt-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
          <div className={`flex items-center gap-1 text-sm ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}>
            <MapPin size={14} />
            <span>Kilamba, Angola</span>
          </div>
          
          <button className={`inline-flex items-center text-sm font-medium ${
            darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800" 
          }`}>
            Ver detalhes
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Service Detail Component
const ServiceDetail = ({ service, darkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className={`rounded-xl overflow-hidden ${
        darkMode ? "bg-gray-800" : "bg-white shadow-md"
      }`}
    >
      <img
        src={service.servicoPrestador.imagem}
        className="w-full h-48 object-cover"
        alt={service.servicoPrestador.titulo}
      />
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h2 className="font-bold text-xl">{service.servicoPrestador.titulo}</h2>
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium">
            <Star size={14} fill="currentColor" />
            <span>{service.servicoPrestador.avaliacao}</span>
            <span className="text-xs">({service.servicoPrestador.numAvaliacoes})</span>
          </div>
        </div>
        
        <div className={`mb-4 inline-block px-3 py-1 rounded-full text-sm font-medium ${
          darkMode ? "bg-blue-900/80 text-blue-300" : "bg-blue-100 text-blue-800"
        }`}>
          {service.servicoPrestador.categoria_nome}
        </div>
        
        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          {service.servicoPrestador.descricao}
        </p>
        
        <div className="space-y-3 mb-4">
          <div className={`flex items-center gap-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            <MapPin size={16} className={darkMode ? "text-blue-400" : "text-blue-600"} />
            <span>Kilamba, Angola</span>
          </div>
          <div className={`flex items-center gap-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            <Clock size={16} className={darkMode ? "text-blue-400" : "text-blue-600"} />
            <span>Disponível Seg-Sex, 8:00-18:00</span>
          </div>
          <div className={`flex items-center gap-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            <Calendar size={16} className={darkMode ? "text-blue-400" : "text-blue-600"} />
            <span>Agendamento disponível</span>
          </div>
        </div>
        
        <h3 className="font-medium mb-2">Tags</h3>
        <div className="flex flex-wrap gap-2 mb-5">
          {service.servicoPrestador.tags.split(',').map((tag, idx) => (
            <span key={idx} className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
              darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
            }`}>
              <Tag size={12} />
              {tag.trim()}
            </span>
          ))}
        </div>
        
        <button className={`w-full py-3 rounded-lg font-medium ${
          darkMode ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}>
          Contactar Prestador
        </button>
        
        <button className={`w-full py-3 mt-2 rounded-lg font-medium ${
          darkMode 
            ? "bg-transparent border border-gray-700 hover:bg-gray-700 text-gray-300" 
            : "bg-transparent border border-gray-300 hover:bg-gray-50 text-gray-700"
        }`}>
          Salvar nos Favoritos
        </button>
      </div>
    </motion.div>
  );
};

export default Pesquisar;
