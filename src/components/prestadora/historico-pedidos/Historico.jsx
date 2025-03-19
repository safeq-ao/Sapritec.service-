import React, { useState } from 'react';
import { useTheme } from '../../../utils/context/themeContext';
import { motion } from 'framer-motion';
import { 
  Search, 
  Calendar, 
  Filter, 
  ArrowDown, 
  Check, 
  X,
  MoreVertical,
  Star,
  User,
  MapPin,
  Clock,
  DollarSign
} from 'lucide-react';

const Historico = () => {
  const { darkMode } = useTheme();
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Mock data for order history
  const orders = [
    {
      id: "ORD-7845",
      client: "Carlos Mendes",
      service: "Manutenção Elétrica",
      date: "12 Mar, 2025",
      address: "Rua das Flores, 123",
      status: "completed",
      value: "R$ 150,00",
      rating: 5,
      paymentMethod: "Cartão de Crédito"
    },
    {
      id: "ORD-7823",
      client: "Ana Souza",
      service: "Limpeza Completa",
      date: "10 Mar, 2025",
      address: "Av. Paulista, 1500",
      status: "completed",
      value: "R$ 280,00",
      rating: 4.5,
      paymentMethod: "PIX"
    },
    {
      id: "ORD-7790",
      client: "Roberto Alves",
      service: "Pintura Interna",
      date: "02 Mar, 2025",
      address: "Rua Augusta, 789",
      status: "cancelled",
      value: "R$ 800,00",
      rating: null,
      paymentMethod: "Não realizado"
    },
    {
      id: "ORD-7756",
      client: "Fernanda Lima",
      service: "Instalação de Ar Condicionado",
      date: "25 Fev, 2025",
      address: "Rua Oscar Freire, 456",
      status: "completed",
      value: "R$ 350,00",
      rating: 5,
      paymentMethod: "Transferência Bancária"
    }
  ];

  const filteredOrders = orders.filter(order => {
    if (selectedStatus === 'all') return true;
    return order.status === selectedStatus;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}
    >
      <motion.div variants={itemVariants} className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Histórico de Pedidos</h1>
        <div className="flex space-x-3">
          <div className={`relative rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <input
              type="text"
              placeholder="Buscar pedido..."
              className={`pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 w-64 ${
                darkMode 
                  ? 'bg-gray-800 text-white focus:ring-blue-500' 
                  : 'bg-white text-gray-800 focus:ring-blue-400'
              }`}
            />
            <Search size={18} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
          </div>
          
          <div className="relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                darkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                  : 'bg-white hover:bg-gray-100 text-gray-800'
              } shadow-sm transition-colors`}
            >
              <Filter size={18} />
              <span>Filtros</span>
            </button>
            
            {filterOpen && (
              <div className={`absolute right-0 mt-2 w-72 rounded-lg shadow-lg z-10 p-4 ${
                darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
              }`}>
                <h3 className="font-semibold mb-3">Filtrar por</h3>
                
                <div className="mb-4">
                  <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status</p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setSelectedStatus('all')}
                      className={`px-3 py-1.5 rounded text-sm ${
                        selectedStatus === 'all'
                          ? darkMode 
                            ? 'bg-blue-500/20 text-blue-400' 
                            : 'bg-blue-100 text-blue-700'
                          : darkMode 
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Todos
                    </button>
                    <button
                      onClick={() => setSelectedStatus('completed')}
                      className={`px-3 py-1.5 rounded text-sm ${
                        selectedStatus === 'completed'
                          ? darkMode 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-green-100 text-green-700'
                          : darkMode 
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Concluído
                    </button>
                    <button
                      onClick={() => setSelectedStatus('cancelled')}
                      className={`px-3 py-1.5 rounded text-sm ${
                        selectedStatus === 'cancelled'
                          ? darkMode 
                            ? 'bg-red-500/20 text-red-400' 
                            : 'bg-red-100 text-red-700'
                          : darkMode 
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Cancelado
                    </button>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Período</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <input
                        type="date"
                        value={dateRange.start}
                        onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                        className={`w-full p-2 rounded text-sm ${
                          darkMode 
                            ? 'bg-gray-700 text-gray-200 border border-gray-600' 
                            : 'bg-gray-50 text-gray-700 border border-gray-300'
                        }`}
                      />
                    </div>
                    <div>
                      <input
                        type="date"
                        value={dateRange.end}
                        onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                        className={`w-full p-2 rounded text-sm ${
                          darkMode 
                            ? 'bg-gray-700 text-gray-200 border border-gray-600' 
                            : 'bg-gray-50 text-gray-700 border border-gray-300'
                        }`}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={() => {
                      setSelectedStatus('all');
                      setDateRange({ start: '', end: '' });
                    }}
                    className={`px-3 py-1.5 rounded text-sm ${
                      darkMode 
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Limpar
                  </button>
                  <button
                    onClick={() => setFilterOpen(false)}
                    className={`px-3 py-1.5 rounded text-sm ${
                      darkMode 
                        ? 'bg-blue-500 text-white hover:bg-blue-600' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Order History Table */}
      <motion.div 
        variants={itemVariants}
        className={`rounded-xl shadow-lg overflow-hidden ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className={darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}>
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Pedido/Serviço
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Cliente/Endereço
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Data
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Valor/Pagamento
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Status/Avaliação
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {filteredOrders.map((order) => (
                <tr key={order.id} className={`hover:${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{order.id}</div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {order.service}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium flex items-center">
                      <User size={16} className="mr-1" /> 
                      {order.client}
                    </div>
                    <div className={`text-sm flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <MapPin size={14} className="mr-1" /> 
                      {order.address}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2" />
                      <span>{order.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium flex items-center">
                      <DollarSign size={16} className="mr-1" /> 
                      {order.value}
                    </div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {order.paymentMethod}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'completed' 
                        ? darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
                        : order.status === 'cancelled'
                        ? darkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800'
                        : darkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status === 'completed' ? 'Concluído' : 'Cancelado'}
                    </span>
                    
                    {order.rating && (
                      <div className="mt-1 flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill={i < Math.floor(order.rating) ? "#FFD700" : "none"}
                            stroke={i < Math.floor(order.rating) ? "#FFD700" : "#9CA3AF"}
                            className={i < Math.floor(order.rating) ? "text-yellow-400" : "text-gray-400"}
                          />
                        ))}
                        <span className="ml-1 text-xs">{order.rating}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className={`text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300`}>
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Historico;