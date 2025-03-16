import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../utils/context/themeContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  {
    src: "/src/utils/image/capa.png",
    alt: "Serviços de Limpeza",
    title: "Encontre Soluções Rápidas para Suas Necessidades",
    description: "Profissionais qualificados para todos os tipos de serviços.",
  },
  {
    src: "/src/utils/image/capa2.jpg",
    alt: "Serviços de Jardinagem",
    title: "Transforme Seu Jardim com Nossos Especialistas",
    description: "Jardineiros experientes para criar o espaço dos seus sonhos.",
  },
  {
    src: "/src/utils/image/capa3.jpg",
    alt: "Serviços de Reparos",
    title: "Reparos e Manutenção para Sua Casa",
    description: "Eletricistas, encanadores e mais para resolver qualquer problema.",
  },
];

export const TelaImagem = () => {
  const { darkMode } = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(nextImage, 5000); // Change image every 5 seconds

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);

  const currentImage = images[currentImageIndex];

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative h-[24rem] lg:h-[28rem] overflow-hidden rounded-lg shadow-md">
      <AnimatePresence initial={false} custom={1}>
        <motion.div
          key={currentImageIndex}
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute inset-0 flex flex-col justify-center items-start p-8"
          style={{
            backgroundImage: `url('${currentImage.src}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className={`relative z-10 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            <h2 className="text-4xl uppercase font-semibold mb-3">{currentImage.title}</h2>
            <p className="text-lg italic">{currentImage.description}</p>
            <button
              className="mt-5 px-8 py-3 text-xl font-medium rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              style={{
                backgroundColor: "rgba(59, 130, 246, 0.9)", // Blue-500 with 90% opacity
                color: "white",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.15)",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "rgba(37, 99, 235, 0.9)"; // Blue-600 with 90% opacity
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "rgba(59, 130, 246, 0.9)"; // Blue-500 with 90% opacity
              }}
            >
              Serviços
            </button>
          </div>
          <div className="absolute inset-0 bg-black/30"></div>
        </motion.div>
      </AnimatePresence>

      {/* Modern Carousel Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentImageIndex
                ? "bg-blue-500"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => setCurrentImageIndex(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Carousel Controls */}
      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/70 text-gray-800 rounded-full p-2 z-10 transition-colors duration-300"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/70 text-gray-800 rounded-full p-2 z-10 transition-colors duration-300"
        aria-label="Next Slide"
      >
        <ChevronRight size={28} />
      </button>
    </div>
  );
};
