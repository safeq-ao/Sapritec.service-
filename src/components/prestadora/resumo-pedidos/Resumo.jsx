import React, { useState } from 'react';
import { useTheme } from '../../../utils/context/themeContext';
import { motion } from 'framer-motion';
import {
  Search,
  Bell,
  Calendar,
  Filter,
  ChevronDown,
  CheckCircle,
  Clock,
  XCircle,
  ArrowUpRight,
  RefreshCw
} from 'lucide-react';

// Mock data for order summaries
const orderStats = [
  { id: 1, title: 'Em Andamento', count: 8, color: 'blue', icon: <Clock size={20} strokeWidth={1.5} /> },
  { id: 2, title: 'Concluídos', count: 24, color: 'green', icon: <CheckCircle size={20} strokeWidth={1.5} /> },
  { id: 3, title: 'Cancelados', count: 3, color: 'red', icon: <XCircle size={20} strokeWidth={1.5} /> },
  { id: 4, title: 'Total', count: 35, color: 'purple', icon: <RefreshCw size={20} strokeWidth={1.5} /> }
];

// Mock data for orders
const orders = {
  inProgress: [
    { 
      id: 'ORD-2023',
      client: 'Carlos Mendes',
      service: 'Manutenção Elétrica',
      status: 'em andamento',
      address: 'Rua das Flores, 123',
      city: 'São Paulo',
      date: '15/03/2025',
      time: '14:30',
      price: 'R$ 180,00'
    },
    { 
      id: 'ORD-2024',
      client: 'Maria Oliveira',
      service: 'Limpeza Residencial',
      status: 'agendado',
      address: 'Av. Paulista, 1000',
      city: 'São Paulo',
      date: '16/03/2025',
      time: '10:00',
      price: 'R$ 220,00'
    },
    { 
      id: 'ORD-2025',
      client: 'João Silva',
      service: 'Instalação de Ar Condicionado',
      status: 'em andamento',
      address: 'Rua Augusta, 789',
      city: 'São Paulo',
      date: '15/03/2025',
      time: '16:45',
      price: 'R$ 350,00'
    }
  ],
  completed: [
    { 
      id: 'ORD-2020',
      client: 'Ana Souza',
      service: 'Manutenção Hidráulica',
      status: 'concluído',
      address: 'Rua Oscar Freire, 456',
      city: 'São Paulo',
      date: '10/03/2025',
      time: '11:15',
      price: 'R$ 150,00',
      rating: 5
    },
    { 
      id: 'ORD-2021',
      client: 'Pedro Almeida',
      service: 'Pintura',
      status: 'concluído',
      address: 'Alameda Santos, 789',
      city: 'São Paulo',
      date: '08/03/2025',
      time: '09:30',
      price: 'R$ 320,00',
      rating: 4
    }
  ],
  canceled: [
    { 
      id: 'ORD-2022',
      client: 'Fernanda Lima',
      service: 'Montagem de Móveis',
      status: 'cancelado',
      address: 'Rua Consolação, 123',
      city: 'São Paulo',
      date: '12/03/2025',
      time: '15:00',
      price: 'R$ 200,00',
      reason: 'Cliente indisponível'
    }
  ]
};

const Resumo = () => {
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  
  // Animation variants
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

  // Status badge color helper
  const getStatusColor = (status) => {
    switch (status) {
      case 'em andamento':
        return darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600';
      case 'agendado':
        return darkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-600';
      case 'concluído':
        return darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600';
      case 'cancelado':
        return darkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-600';
      default:
        return darkMode ? 'bg-gray-900/30 text-gray-400' : 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}
    >
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Resumo de Pedidos</h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Acompanhe e gerencie seus pedidos recebidos
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div 
        variants={itemVariants} 
        className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b ${
          darkMode ? 'border-gray-800' : 'border-gray-200'
        }`}
      >
        <div className={`relative flex-1 max-w-md`}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
          </div>
          <input
            type="text"
            placeholder="Buscar pedidos..."
            className={`pl-10 pr-4 py-2 w-full rounded-lg ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
            } border focus:outline-none focus:ring-1 focus:ring-blue-500`}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`relative`}>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className={`pr-9 pl-4 py-2 rounded-lg ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } border focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Calendar size={18} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
            </div>
          </div>
          
          <button className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            darkMode 
              ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' 
              : 'bg-white hover:bg-gray-50 border border-gray-300'
          }`}>
            <Filter size={18} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
            <span>Filtros</span>
            <ChevronDown size={16} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
          </button>
        </div>
      </motion.div>

      {/* Order Stats */}
      <motion.div 
        variants={itemVariants} 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {orderStats.map(stat => (
          <div 
            key={stat.id}
            className={`rounded-xl p-6 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {stat.title}
                </h3>
                <p className="text-2xl font-bold mt-1">{stat.count}</p>
              </div>
              <div className={`p-3 rounded-full ${
                stat.color === 'blue' 
                  ? darkMode ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                  : stat.color === 'green'
                    ? darkMode ? 'bg-green-900/20 text-green-400' : 'bg-green-100 text-green-600'
                    : stat.color === 'red'
                      ? darkMode ? 'bg-red-900/20 text-red-400' : 'bg-red-100 text-red-600'
                      : darkMode ? 'bg-purple-900/20 text-purple-400' : 'bg-purple-100 text-purple-600'
              }`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className={`flex border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <button
            onClick={() => setActiveTab('all')}
            className={`py-3 px-4 font-medium text-sm border-b-2 ${
              activeTab === 'all'
                ? darkMode 
                  ? 'border-blue-400 text-blue-400' 
                  : 'border-blue-600 text-blue-600'
                : 'border-transparent'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setActiveTab('inProgress')}
            className={`py-3 px-4 font-medium text-sm border-b-2 ${
              activeTab === 'inProgress'
                ? darkMode 
                  ? 'border-blue-400 text-blue-400' 
                  : 'border-blue-600 text-blue-600'
                : 'border-transparent'
            }`}
          >
            Em Andamento
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`py-3 px-4 font-medium text-sm border-b-2 ${
              activeTab === 'completed'
                ? darkMode 
                  ? 'border-blue-400 text-blue-400' 
                  : 'border-blue-600 text-blue-600'
                : 'border-transparent'
            }`}
          >
            Concluídos
          </button>
          <button
            onClick={() => setActiveTab('canceled')}
            className={`py-3 px-4 font-medium text-sm border-b-2 ${
              activeTab === 'canceled'
                ? darkMode 
                  ? 'border-blue-400 text-blue-400' 
                  : 'border-blue-600 text-blue-600'
                : 'border-transparent'
            }`}
          >
            Cancelados
          </button>
        </div>
      </motion.div>

      {/* Order Cards */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {/* Filter orders based on active tab */}
        {(activeTab === 'all' ? [...orders.inProgress, ...orders.completed, ...orders.canceled] :
          activeTab === 'inProgress' ? orders.inProgress :
          activeTab === 'completed' ? orders.completed :
          orders.canceled
        ).map(order => (
          <div
            key={order.id}
            className={`rounded-xl shadow-lg overflow-hidden ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex justify-between items-center">
                <span className="font-medium">{order.id}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {order.status === 'em andamento' ? 'Em Andamento' :
                   order.status === 'agendado' ? 'Agendado' :
                   order.status === 'concluído' ? 'Concluído' : 'Cancelado'}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="font-bold text-lg mb-2">{order.service}</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Cliente:</span>
                  <span className="text-sm font-medium">{order.client}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Data:</span>
                  <span className="text-sm font-medium">{order.date} às {order.time}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Endereço:</span>
                  <span className="text-sm font-medium">{order.address}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Valor:</span>
                  <span className="text-sm font-medium">{order.price}</span>
                </div>
                
                {order.rating && (
                  <div className="flex justify-between">
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Avaliação:</span>
                    <span className="text-sm font-medium flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-4 h-4 ${i < order.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </span>
                  </div>
                )}
                
                {order.reason && (
                  <div className="flex justify-between">
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Motivo:</span>
                    <span className="text-sm font-medium">{order.reason}</span>
                  </div>
                )}
              </div>
              
              <button className={`mt-2 w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg ${
                darkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}>
                <span>Ver Detalhes</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Resumo;