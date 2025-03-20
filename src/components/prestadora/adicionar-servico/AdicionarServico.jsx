import React, { useState } from 'react';
import { useTheme } from '../../../utils/context/themeContext';
import { motion } from 'framer-motion';
import { Save, X, Image, Upload } from 'lucide-react';

const AdicionarServico = () => {
  const { darkMode } = useTheme();
  const [serviceData, setServiceData] = useState({
    title: '',
    description: '',
    price: '',
    serviceType: '', // prestacao or venda
    category: '',
    subCategory: '',
    available: true,
    images: [],
    specifications: {
      duration: '',
      unit: 'hour', // hour, day, piece
      location: 'local' // local, remoto, hibrido
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Service Categories with subcategories
  const serviceCategories = {
    eletrica: {
      name: 'Elétrica',
      subcategories: ['Instalação', 'Manutenção', 'Reparo', 'Projeto']
    },
    hidraulica: {
      name: 'Hidráulica',
      subcategories: ['Instalação', 'Reparo', 'Manutenção Preventiva']
    },
    construcao: {
      name: 'Construção',
      subcategories: ['Reforma', 'Acabamento', 'Alvenaria', 'Pintura']
    },
    limpeza: {
      name: 'Limpeza',
      subcategories: ['Residencial', 'Comercial', 'Pós-obra', 'Especializada']
    },
    jardinagem: {
      name: 'Jardinagem',
      subcategories: ['Manutenção', 'Paisagismo', 'Poda', 'Plantio']
    },
    tecnologia: {
      name: 'Tecnologia',
      subcategories: ['Manutenção PC', 'Redes', 'Sistemas', 'Suporte']
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    if (name === 'category') {
      setSelectedCategory(value);
      setServiceData(prev => ({
        ...prev,
        category: value,
        subCategory: ''
      }));
    } else if (name.startsWith('specifications.')) {
      const specKey = name.split('.')[1];
      setServiceData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [specKey]: value
        }
      }));
    } else {
      setServiceData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? e.target.checked : value
      }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // Here you would typically handle image upload to your server
    // For now, we'll just store the file names
    setServiceData(prev => ({
      ...prev,
      images: [...prev.images, ...files.map(file => file.name)]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Service Data:', serviceData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form
      setServiceData({
        title: '',
        description: '',
        price: '',
        serviceType: '',
        category: '',
        subCategory: '',
        available: true,
        images: [],
        specifications: {
          duration: '',
          unit: 'hour',
          location: 'local'
        }
      });
      setSelectedCategory('');
    }, 1500);
  };

  return (
    <div className={`p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <h1 className="text-2xl font-bold mb-6">Adicionar Serviço</h1>
      
      <motion.form 
        onSubmit={handleSubmit} 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="space-y-6 max-w-3xl"
      >
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block mb-2 font-medium">Título do Serviço</label>
            <input
              type="text"
              id="title"
              name="title"
              value={serviceData.title}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder="Ex: Instalação Elétrica Residencial"
            />
          </div>
          
          <div>
            <label htmlFor="price" className="block mb-2 font-medium">Preço (R$)</label>
            <input
              type="number"
              step="0.01"
              id="price"
              name="price"
              value={serviceData.price}
              onChange={handleChange}
              required
              min="0"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder="0,00"
            />
          </div>
        </div>

        {/* Service Type and Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">Tipo de Oferta</label>
            <div className={`grid grid-cols-2 gap-4 p-3 rounded-lg ${
              darkMode ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="serviceType"
                  value="prestacao"
                  checked={serviceData.serviceType === 'prestacao'}
                  onChange={handleChange}
                  required
                  className="form-radio text-blue-600"
                />
                <span>Prestação de Serviço</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="serviceType"
                  value="venda"
                  checked={serviceData.serviceType === 'venda'}
                  onChange={handleChange}
                  required
                  className="form-radio text-blue-600"
                />
                <span>Venda de Produto</span>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="category" className="block mb-2 font-medium">Categoria</label>
            <select
              id="category"
              name="category"
              value={serviceData.category}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="">Selecione uma categoria</option>
              {Object.entries(serviceCategories).map(([key, category]) => (
                <option key={key} value={key}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Subcategory and Specifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {selectedCategory && (
            <div>
              <label htmlFor="subCategory" className="block mb-2 font-medium">Subcategoria</label>
              <select
                id="subCategory"
                name="subCategory"
                value={serviceData.subCategory}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="">Selecione uma subcategoria</option>
                {serviceCategories[selectedCategory].subcategories.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label htmlFor="specifications.location" className="block mb-2 font-medium">Local de Atendimento</label>
            <select
              id="specifications.location"
              name="specifications.location"
              value={serviceData.specifications.location}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="local">Presencial</option>
              <option value="remoto">Remoto</option>
              <option value="hibrido">Híbrido</option>
            </select>
          </div>
        </div>

        {/* Duration and Unit */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="specifications.duration" className="block mb-2 font-medium">Duração/Quantidade</label>
            <input
              type="number"
              id="specifications.duration"
              name="specifications.duration"
              value={serviceData.specifications.duration}
              onChange={handleChange}
              min="1"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder="Ex: 2"
            />
          </div>

          <div>
            <label htmlFor="specifications.unit" className="block mb-2 font-medium">Unidade</label>
            <select
              id="specifications.unit"
              name="specifications.unit"
              value={serviceData.specifications.unit}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="hour">Hora(s)</option>
              <option value="day">Dia(s)</option>
              <option value="piece">Unidade(s)</option>
              <option value="m2">Metro Quadrado</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block mb-2 font-medium">Descrição Detalhada</label>
          <textarea
            id="description"
            name="description"
            value={serviceData.description}
            onChange={handleChange}
            required
            rows="4"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
            }`}
            placeholder="Descreva detalhadamente o serviço ou produto oferecido..."
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-2 font-medium">Imagens</label>
          <div className={`p-4 border-2 border-dashed rounded-lg text-center ${
            darkMode ? 'border-gray-700' : 'border-gray-300'
          }`}>
            <div className="flex flex-col items-center">
              <Upload className="w-8 h-8 mb-2 text-gray-500" />
              <p className="mb-2">Arraste imagens ou clique para fazer upload</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <button
                type="button"
                onClick={() => document.getElementById('image-upload').click()}
                className={`px-4 py-2 rounded-lg ${
                  darkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                Selecionar Arquivos
              </button>
            </div>
            {serviceData.images.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {serviceData.images.map((image, index) => (
                  <div key={index} className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    <Image size={16} />
                    <span className="text-sm">{image}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex items-center space-x-4 pt-4">
          <button 
            type="submit"
            disabled={isSubmitting}
            className={`flex items-center px-6 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-700'
                : 'bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-300'
            }`}
          >
            {isSubmitting ? 'Salvando...' : (
              <>
                <Save size={18} className="mr-2" />
                Salvar Serviço
              </>
            )}
          </button>
          <button 
            type="button"
            onClick={() => {
              setServiceData({
                title: '',
                description: '',
                price: '',
                serviceType: '',
                category: '',
                subCategory: '',
                available: true,
                images: [],
                specifications: {
                  duration: '',
                  unit: 'hour',
                  location: 'local'
                }
              });
              setSelectedCategory('');
            }}
            className={`flex items-center px-6 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 ${
              darkMode 
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            <X size={18} className="mr-2" />
            Cancelar
          </button>
        </div>
      </motion.form>

      {/* Success Message */}
      {submitSuccess && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className={`mt-6 p-4 border rounded-lg ${
            darkMode 
              ? 'bg-green-900/50 border-green-800 text-green-300'
              : 'bg-green-100 border-green-200 text-green-800'
          }`}
        >
          Serviço adicionado com sucesso!
        </motion.div>
      )}
    </div>
  );
};

export default AdicionarServico;