import React, { useEffect, useState } from "react";
import { 
  Search, 
  Home, 
  Bookmark, 
  MapPin, 
  DollarSign, 
  Star, 
  ChevronDown,
  Filter,
  Clock,
  Tag
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTheme } from "../../utils/context/themeContext";
import { Link } from "react-router-dom";

// Mock Data
const mockCategories = [
  { id_categoria: 1, nome: "Limpeza", icon: "Home" },
  { id_categoria: 2, nome: "Jardinagem", icon: "Leaf" },
  { id_categoria: 3, nome: "Reparos", icon: "Wrench" },
  { id_categoria: 4, nome: "Eventos", icon: "Calendar" },
  { id_categoria: 5, nome: "Tecnologia", icon: "Laptop" },
  { id_categoria: 6, nome: "Educação", icon: "GraduationCap" },
];

const mockCategoryCounts = [
  { id_categoria: 1, nome: "Limpeza", totalServicos: 25 },
  { id_categoria: 2, nome: "Jardinagem", totalServicos: 18 },
  { id_categoria: 3, nome: "Reparos", totalServicos: 32 },
  { id_categoria: 4, nome: "Eventos", totalServicos: 15 },
  { id_categoria: 5, nome: "Tecnologia", totalServicos: 27 },
  { id_categoria: 6, nome: "Educação", totalServicos: 21 },
];

const mockServices = [
  {
    id_servicoPrestador: 1,
    servicoPrestador: {
      titulo: "Limpeza Doméstica",
      descricao: "Limpeza completa da sua casa com produtos profissionais e equipe especializada.",
      categoria_nome: "Limpeza",
      imagem: "/src/utils/image/capa.png",
      tags: "limpeza, casa, domestica",
      avaliacao: 4.8,
      numAvaliacoes: 124,
      preco: "50-100"
    },
  },
  {
    id_servicoPrestador: 2,
    servicoPrestador: {
      titulo: "Jardinagem Residencial",
      descricao: "Cuidamos do seu jardim com carinho, desde o plantio à manutenção completa.",
      categoria_nome: "Jardinagem",
      imagem: "/src/utils/image/capa2.jpg",
      tags: "jardim, plantas, jardinagem",
      avaliacao: 4.6,
      numAvaliacoes: 87,
      preco: "75-150"
    },
  },
  {
    id_servicoPrestador: 3,
    servicoPrestador: {
      titulo: "Reparos Elétricos",
      descricao: "Eletricistas qualificados para sua casa e empresa. Instalações e manutenção.",
      categoria_nome: "Reparos",
      imagem: "/src/utils/image/capa3.jpg",
      tags: "eletricista, reparos, eletrica",
      avaliacao: 4.9,
      numAvaliacoes: 215,
      preco: "100-200"
    },
  },
  {
    id_servicoPrestador: 4,
    servicoPrestador: {
      titulo: "Organização de Eventos",
      descricao: "Organizamos seu evento do início ao fim com qualidade e profissionalismo.",
      categoria_nome: "Eventos",
      imagem: "/src/utils/image/capa2.jpg",
      tags: "eventos, festas, organização",
      avaliacao: 4.7,
      numAvaliacoes: 93,
      preco: "500-2000"
    },
  },
  {
    id_servicoPrestador: 5,
    servicoPrestador: {
      titulo: "Suporte de TI",
      descricao: "Resolva problemas de computador, rede e softwares com nossa equipe técnica.",
      categoria_nome: "Tecnologia",
      imagem: "/src/utils/image/capa.png",
      tags: "computador, software, rede",
      avaliacao: 4.5,
      numAvaliacoes: 78,
      preco: "75-150"
    },
  },
  {
    id_servicoPrestador: 6,
    servicoPrestador: {
      titulo: "Aulas Particulares",
      descricao: "Professores qualificados para todas as disciplinas e níveis de ensino.",
      categoria_nome: "Educação",
      imagem: "/src/utils/image/capa3.jpg",
      tags: "aulas, reforço, professor",
      avaliacao: 4.9,
      numAvaliacoes: 156,
      preco: "40-80"
    },
  },
];

// Helper function to render appropriate category icon
const CategoryIcon = ({ category }) => {
  switch (category.toLowerCase()) {
    case "limpeza":
      return <Home />;
    case "jardinagem":
      return <Home />; // Replace with appropriate icon
    case "reparos":
      return <Home />; // Replace with appropriate icon
    case "eventos":
      return <Home />; // Replace with appropriate icon
    case "tecnologia":
      return <Home />; // Replace with appropriate icon
    case "educação":
      return <Home />; // Replace with appropriate icon
    default:
      return <Home />;
  }
};

export function PaginaDeBusca() {
  const { darkMode } = useTheme();
  const [services, setServices] = useState(mockServices);
  const [categories, setCategories] = useState(mockCategories);
  const [categoryCounts, setCategoryCounts] = useState(mockCategoryCounts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loadMore, setLoadMore] = useState(4); // Initially show 4 services
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("relevance");

  useEffect(() => {
    // This is where you would call your API endpoints
    document.title = "Busca de Serviços - Sapritec";
  }, []);

  const handleLoadMore = () => {
    setLoadMore(prev => Math.min(prev + 4, services.length));
  };

  // Filtering logic with multiple criteria
  const filteredServices = services.filter((service) => {
    const searchRegex = new RegExp(searchTerm, "i");
    const categoryMatch = selectedCategory === "" || service.servicoPrestador.categoria_nome === selectedCategory;
    
    // Price range filtering (example values: "0-50", "50-100", etc.)
    let priceMatch = true;
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      const servicePrice = parseInt(service.servicoPrestador.preco.split('-')[0]);
      priceMatch = servicePrice >= min && servicePrice <= max;
    }
    
    return searchRegex.test(service.servicoPrestador.titulo) && categoryMatch && priceMatch;
  });

  // Sorting logic
  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseInt(a.servicoPrestador.preco.split('-')[0]) - parseInt(b.servicoPrestador.preco.split('-')[0]);
      case "price-high":
        return parseInt(b.servicoPrestador.preco.split('-')[0]) - parseInt(a.servicoPrestador.preco.split('-')[0]);
      case "rating":
        return b.servicoPrestador.avaliacao - a.servicoPrestador.avaliacao;
      default: // relevance or other
        return 0;
    }
  });

  // Get final services to display (with pagination)
  const displayServices = sortedServices.slice(0, loadMore);

  return (
    <main
      className={`min-h-screen py-12 px-4 sm:px-6 md:px-12 lg:px-24 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">
          Explore Nossos <span className={`${darkMode ? "text-blue-400" : "text-blue-600"}`}>Serviços</span>
        </h1>
        <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-lg max-w-2xl mx-auto`}>
          Encontre os melhores profissionais para suas necessidades em Angola.
        </p>
      </section>

      {/* Search and Filter */}
      <section className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className={`${darkMode ? "text-gray-400" : "text-gray-500"}`} size={18} />
            </div>
            <input
              type="search"
              placeholder="Pesquisar serviços..."
              className={`block w-full pl-10 pr-3 py-3 rounded-lg border ${
                darkMode 
                  ? "border-gray-700 bg-gray-800 text-gray-100 focus:border-blue-500" 
                  : "border-gray-300 bg-white text-gray-800 focus:border-blue-500"
              } focus:outline-none focus:ring-1 focus:ring-blue-500`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <div className="relative flex-grow sm:min-w-[200px]">
              <select
                className={`block appearance-none w-full px-4 py-3 pr-8 rounded-lg border shadow-sm ${
                  darkMode 
                    ? "border-gray-700 bg-gray-800 text-gray-100" 
                    : "border-gray-300 bg-white text-gray-800"
                } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Todas as Categorias</option>
                {categories.map((category) => (
                  <option key={category.id_categoria} value={category.nome}>
                    {category.nome}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown size={16} className={darkMode ? "text-gray-400" : "text-gray-600"} />
              </div>
            </div>

            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${
                darkMode 
                  ? "bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700" 
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              <Filter size={16} />
              <span className="hidden sm:inline">Filtros</span>
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className={`p-4 rounded-lg mt-2 ${
            darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200 shadow-md"
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Faixa de Preço
                </label>
                <select
                  className={`block appearance-none w-full px-3 py-2 rounded-md border ${
                    darkMode ? "border-gray-700 bg-gray-700" : "border-gray-300 bg-gray-50"
                  } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                >
                  <option value="">Qualquer Preço</option>
                  <option value="0-50">Até 50€</option>
                  <option value="50-100">50€ - 100€</option>
                  <option value="100-200">100€ - 200€</option>
                  <option value="200-500">200€ - 500€</option>
                  <option value="500-1000">500€ - 1000€</option>
                  <option value="1000-5000">Acima de 1000€</option>
                </select>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Ordenar Por
                </label>
                <select
                  className={`block appearance-none w-full px-3 py-2 rounded-md border ${
                    darkMode ? "border-gray-700 bg-gray-700" : "border-gray-300 bg-gray-50"
                  } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="relevance">Relevância</option>
                  <option value="rating">Melhor Avaliação</option>
                  <option value="price-low">Menor Preço</option>
                  <option value="price-high">Maior Preço</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  className={`px-4 py-2 rounded-md w-full ${
                    darkMode 
                      ? "bg-blue-600 hover:bg-blue-700 text-white" 
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  Aplicar Filtros
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Category Swiper */}
      <section className="mb-12">
        <h2 className={`text-xl sm:text-2xl font-semibold mb-6 ${darkMode ? "" : ""}`}>Categorias Populares</h2>
        <Swiper 
          slidesPerView={"auto"} 
          spaceBetween={12} 
          className="!overflow-visible"
          breakpoints={{
            // when window width is >= 640px
            640: {
              spaceBetween: 16
            }
          }}
        >
          {categoryCounts.map((category) => (
            <SwiperSlide key={category.id_categoria} style={{ width: "auto", maxWidth: "180px" }}>
              <button
                onClick={() => setSelectedCategory(category.nome)}
                className={`flex flex-col items-center p-5 rounded-xl ${
                  selectedCategory === category.nome
                    ? darkMode 
                      ? "bg-blue-900/50 border border-blue-800" 
                      : "bg-blue-50 border border-blue-200"
                    : darkMode
                      ? "bg-gray-800 hover:bg-gray-750 border border-gray-700"
                      : "bg-white hover:bg-gray-50 border border-gray-200"
                } shadow-sm transition-all duration-200 h-[140px] w-[140px] sm:h-[160px] sm:w-[160px]`}
              >
                <div className={`text-3xl mb-2 ${
                  selectedCategory === category.nome 
                    ? darkMode ? "text-blue-400" : "text-blue-600"
                    : darkMode ? "text-gray-300" : "text-gray-600" 
                }`}>
                  <CategoryIcon category={category.nome} />
                </div>
                <p className={`text-base font-medium text-center ${
                  selectedCategory === category.nome && !darkMode ? "text-blue-700" : ""
                }`}>
                  {category.nome}
                </p>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {category.totalServicos} Serviços
                </p>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Services Listing */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl sm:text-2xl font-semibold`}>
            {selectedCategory ? `Serviços de ${selectedCategory}` : "Todos os Serviços"}
          </h2>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            {filteredServices.length} serviços encontrados
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayServices.length > 0 ? (
            displayServices.map((service) => (
              <div
                key={service.id_servicoPrestador}
                className={`flex flex-col rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200 shadow-sm"
                }`}
              >
                <div className="relative">
                  <img
                    src={service.servicoPrestador.imagem}
                    alt={service.servicoPrestador.titulo}
                    className="h-52 w-full object-cover"
                  />
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${
                    darkMode ? "bg-blue-900/70 text-blue-100" : "bg-blue-100 text-blue-800"
                  }`}>
                    {service.servicoPrestador.categoria_nome}
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{service.servicoPrestador.titulo}</h3>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-400" fill="currentColor" />
                      <span className="text-sm font-medium">{service.servicoPrestador.avaliacao}</span>
                      <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        ({service.servicoPrestador.numAvaliacoes})
                      </span>
                    </div>
                  </div>
                  
                  <p className={`text-sm mb-4 line-clamp-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {service.servicoPrestador.descricao}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.servicoPrestador.tags.split(',').map((tag, idx) => (
                      <span 
                        key={idx} 
                        className={`inline-flex items-center text-xs px-2.5 py-1 rounded-full ${
                          darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        <Tag size={10} className="mr-1" />
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className={`flex items-center text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                      <MapPin className="mr-2 h-4 w-4" />
                      Kilamba, Angola
                    </div>
                    <div className={`flex items-center text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                      <Clock className="mr-2 h-4 w-4" />
                      Disponível Seg-Sex, 9:00-18:00
                    </div>
                    <div className={`flex items-center text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                      <DollarSign className="mr-2 h-4 w-4" />
                      {service.servicoPrestador.preco}€
                    </div>
                  </div>
                  
                  <Link to={`/servico/${service.id_servicoPrestador}`}>
                    <button className={`w-full py-2.5 rounded-lg font-medium ${
                      darkMode 
                        ? "bg-blue-600 hover:bg-blue-700 text-white" 
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}>
                      Ver Detalhes
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className={`col-span-1 md:col-span-2 lg:col-span-3 p-8 text-center rounded-lg ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}>
              <p className="text-lg">Nenhum serviço encontrado.</p>
              <p className="text-sm mt-2 text-gray-500">Tente uma busca diferente ou outros filtros.</p>
            </div>
          )}
        </div>
      </section>

      {/* Load More Button */}
      {loadMore < filteredServices.length && (
        <div className="text-center mt-10">
          <button
            onClick={handleLoadMore}
            className={`px-8 py-3 rounded-lg font-medium transition-colors duration-300 ${
              darkMode 
                ? "bg-blue-600 hover:bg-blue-700 text-white" 
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Ver Mais Serviços
          </button>
        </div>
      )}
    </main>
  );
}

export default PaginaDeBusca;