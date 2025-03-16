import React, { useEffect, useState } from "react";
import { Search, Home, Bookmark, MapPin } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { apiFetch } from "../../utils/api/api";
<<<<<<< HEAD
import { useTheme } from "../../utils/context/themeContext";
=======
import { FaSackDollar } from "react-icons/fa6";
import { Link } from "react-router-dom";
>>>>>>> e184da76fa8b4609920ea8d2d2926a4f1be57220

// Mock Data
const mockCategories = [
  { id_categoria: 1, nome: "Limpeza" },
  { id_categoria: 2, nome: "Jardinagem" },
  { id_categoria: 3, nome: "Reparos" },
  { id_categoria: 4, nome: "Eventos" },
];

const mockCategoryCounts = [
  { id_categoria: 1, nome: "Limpeza", totalServicos: 25 },
  { id_categoria: 2, nome: "Jardinagem", totalServicos: 18 },
  { id_categoria: 3, nome: "Reparos", totalServicos: 32 },
  { id_categoria: 4, nome: "Eventos", totalServicos: 15 },
];

const mockServices = [
  {
    id_servicoPrestador: 1,
    servicoPrestador: {
      titulo: "Limpeza Doméstica",
      descricao: "Limpeza completa da sua casa.",
      categoria_nome: "Limpeza",
      imagem: "/src/utils/image/capa.png",
      tags: "limpeza, casa, domestica",
    },
  },
  {
    id_servicoPrestador: 2,
    servicoPrestador: {
      titulo: "Jardinagem Residencial",
      descricao: "Cuidamos do seu jardim com carinho.",
      categoria_nome: "Jardinagem",
      imagem: "/src/utils/image/capa2.jpg",
      tags: "jardim, plantas, jardinagem",
    },
  },
  {
    id_servicoPrestador: 3,
    servicoPrestador: {
      titulo: "Reparos Elétricos",
      descricao: "Eletricistas qualificados para sua casa.",
      categoria_nome: "Reparos",
      imagem: "/src/utils/image/capa3.jpg",
      tags: "eletricista, reparos, eletrica",
    },
  },
  {
    id_servicoPrestador: 4,
    servicoPrestador: {
      titulo: "Organização de Eventos",
      descricao: "Organizamos seu evento do início ao fim.",
      categoria_nome: "Eventos",
      imagem: "/src/utils/image/capa2.jpg",
      tags: "eventos, festas, organização",
    },
  },
];

export function PaginaDeBusca() {
  const { darkMode } = useTheme();
  const [services, setServices] = useState(mockServices);
  const [categories, setCategories] = useState(mockCategories);
  const [categoryCounts, setCategoryCounts] = useState(mockCategoryCounts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Remove API calls
  /*const GetCategories = async () => {
    try {
      const response = await apiFetch.get("/categoria/show");
      setCategories(response.data);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  };

  const GetCategoriesPerService = async () => {
    try {
      const response = await apiFetch.get("/categoria/show/perService");
      setCategoryCounts(response.data);
    } catch (error) {
      console.error("Erro ao buscar contagem de serviços por categoria:", error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await apiFetch.get(`/prestados/show`);
      setServices(response.data);
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
    }
  };*/

  useEffect(() => {
    //GetCategories();
    //GetCategoriesPerService();
    //fetchServices();
  }, []);

  const filteredServices = services.filter((service) => {
    const searchRegex = new RegExp(searchTerm, "i");
    const categoryMatch = selectedCategory === "" || service.servicoPrestador.categoria_nome === selectedCategory;
    return searchRegex.test(service.servicoPrestador.titulo) && categoryMatch;
  });

  return (
    <main
      className={`min-h-screen py-12 px-6 md:px-12 lg:px-24 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold mb-4">
          Explore Nossos <span className="text-blue-500">Serviços</span>
        </h1>
        <p className="text-gray-500 text-lg">
          Encontre os melhores profissionais para suas necessidades.
        </p>
      </section>

      {/* Search and Filter */}
      <section className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="text-gray-500" />
            </div>
            <input
              type="search"
              placeholder="Pesquisar serviços..."
              className={`block w-full pl-10 pr-3 py-3 rounded-md border ${
                darkMode ? "border-gray-700 bg-gray-800 text-gray-100" : "border-gray-300 bg-white text-gray-800"
              } focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative">
            <select
              className={`block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-3 pr-8 rounded-md shadow leading-tight focus:outline-none focus:shadow-outline ${
                darkMode ? "border-gray-700 bg-gray-800 text-gray-100" : "border-gray-300 bg-white text-gray-800"
              }`}
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
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* Category Swiper */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Categorias Populares</h2>
        <Swiper slidesPerView={"auto"} spaceBetween={10} className="!overflow-visible">
          {categoryCounts.map((category) => (
            <SwiperSlide key={category.id_categoria} style={{ width: "auto" }}>
=======
      <div className="flex flex-col items-center m-10">
        <h1
          className="
        font-bold text-botao text-sm
        lg:(text-32)"
        >
          Serviços que pode precisar
        </h1>

        <h2 className="text-legenda text-sm">
          Pesquise, escolhe e solicite serviços com rapidez.
        </h2>

        <article className="flex mt-5 flex-wrap justify-center items-center gap-5">
          {services.slice(services.length/2==0? services.length/2: 0, 6).map((service) => {
            return (
>>>>>>> e184da76fa8b4609920ea8d2d2926a4f1be57220
              <div
                className={`flex flex-col items-center p-6 rounded-lg shadow-md w-48 transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                <div className="text-4xl text-blue-500 mb-2">
                  {/* Replace with appropriate icon based on category */}
                  <Home />
                </div>
                <p className="text-lg font-medium text-center">{category.nome}</p>
                <p className="text-sm text-gray-500">{category.totalServicos} Serviços</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

<<<<<<< HEAD
      {/* Services Listing */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Serviços Disponíveis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id_servicoPrestador}
              className={`flex flex-col border rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl ${
                darkMode ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-white"
              }`}
            >
              <img
                src={service.servicoPrestador.imagem}
                alt={service.servicoPrestador.categoria_nome}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{service.servicoPrestador.titulo}</h3>
                <p className="text-gray-600 mb-3">{service.servicoPrestador.descricao}</p>
                <div className="flex items-center text-gray-500 mb-2">
                  <Home className="mr-2 h-4 w-4" />
                  Kilamba
                </div>
                <div className="flex items-center text-gray-500 mb-2">
                  <MapPin className="mr-2 h-4 w-4" />
                  Angola
                </div>
                <div className="flex items-center text-gray-500">
                  <Bookmark className="mr-2 h-4 w-4" />
                  {service.servicoPrestador.tags}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Load More Button */}
      <div className="text-center mt-8">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300"
        >
          Ver Mais Serviços
        </button>
=======
        <Link to={"pesquisar"}>
          <button className="w-[100px] h-[52px] bg-botao rounded-[4px] mt-10 text-white text-18">
            Ver mais
          </button>
        </Link>
>>>>>>> e184da76fa8b4609920ea8d2d2926a4f1be57220
      </div>
    </main>
  );
}
