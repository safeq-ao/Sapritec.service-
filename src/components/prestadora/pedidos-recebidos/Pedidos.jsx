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
  AlertTriangle,
  Check,
  X,
  MessageSquare,
  Phone
} from 'lucide-react';

// Mock data for received orders
const receivedOrders = [
  {
    id: 'REQ-2023',
    client: {
      name: 'Roberto Oliveira',
      avatar: 'RO',
      rating: 4.5,
      orderCount: 8
    },
    service: 'Manutenção Elétrica',
    description: 'Preciso de um reparo em fiação elétrica com urgência. Há um problema no quadro de luz.',
    location: 'Moema, São Paulo',
    distance: '3.2 km',
    date: '15/03/2025',
    time: '14:30 - 16:30',
    price: 'R$ 180,00',
    status: 'new'
  },
  {
    id: 'REQ-2024',
    client: {
      name: 'Amanda Santos',
      avatar: 'AS',
      rating: 5.0,
      orderCount: 12
    },
    service: 'Limpeza Residencial',
    description: 'Limpeza completa em apartamento de 2 quartos. Inclui limpeza de vidros e aspiração.',
    location: 'Pinheiros, São Paulo',
    distance: '5.7 km',
    date: '16/03/2025',
    time: '09:00 - 12:00',
    price: 'R$ 220,00',
    status: 'new'
  },
  {
    id: 'REQ-2025',
    client: {
      name: 'Ricardo Almeida',
      avatar: 'RA',
      rating: 4.8,
      orderCount: 5
    },
    service: 'Instalação de Ar Condicionado',
    description: 'Instalação de ar condicionado split 12000 BTUs em sala. Necessário furar parede.',
    location: 'Vila Mariana, São Paulo',
    distance: '2.1 km',
    date: '17/03/2025',
    time: '13:00 - 15:00',
    price: 'R$ 350,00',
    status: 'viewed'
  },
  {
    id: 'REQ-2026',
    client: {
      name: 'Carolina Mendes',
      avatar: 'CM',
      rating: 4.2,
      orderCount: 3
    },
    service: 'Reparo de Encanamento',
    description: 'Vazamento em cano sob a pia da cozinha. Necessário trocar válvulas e sifão.',
    location: 'Perdizes, São Paulo',
    distance: '7.5 km',
    date: '18/03/2025',
    time: '10:00 - 12:00',
    price: 'R$ 160,00',
    status: 'viewed'
  }
];

const Pedidos = () => {
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [orderDetailOpen, setOrderDetailOpen] = useState(null);
  
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

  const getStatusBadge = (status) => {
    switch(status) {
      case 'new':
        return {
          label: 'Novo',
          color: darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'
        };
      case 'viewed':
        return {
          label: 'Visualizado',
          color: darkMode ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-600'
        };
      default:
        return {
          label: 'Pendente',
          color: darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'
        };
    }
  };
  
  const filteredOrders = activeTab === 'all' 
    ? receivedOrders 
    : receivedOrders.filter(order => order.status === activeTab);

  // Sort orders based on selected sort option
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(a.date.split('/').reverse().join('-')) - new Date(b.date.split('/').reverse().join('-'));
    } else if (sortBy === 'price') {
      return parseFloat(a.price.replace('R$ ', '').replace(',', '.')) - parseFloat(b.price.replace('R$ ', '').replace(',', '.'));
    } else if (sortBy === 'distance') {
      return parseFloat(a.distance) - parseFloat(b.distance);
    }
    return 0;
  });

  const acceptOrder = (orderId) => {
    console.log(`Accepting order ${orderId}`);
    // Implement order acceptance logic
  };

  const rejectOrder = (orderId) => {
    console.log(`Rejecting order ${orderId}`);
    // Implement order rejection logic
  };

  const contactClient = (orderId) => {
    console.log(`Contacting client for order ${orderId}`);
    // Implement client contact logic
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}
    >
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Pedidos Recebidos</h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Visualize e responda aos pedidos dos clientes
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
        
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <button className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              darkMode 
                ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' 
                : 'bg-white hover:bg-gray-50 border border-gray-300'
            }`}>
              <Calendar size={18} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
              <span>Data</span>
              <ChevronDown size={16} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
            </button>
          </div>
          
          <div className="relative">
            <button className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              darkMode 
                ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' 
                : 'bg-white hover:bg-gray-50 border border-gray-300'
            }`}>
              <Filter size={18} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
              <span>Ordenar por</span>
              <ChevronDown size={16} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
            </button>
            
            {/* Sort dropdown (simplified for this example) */}
            <div className="hidden absolute right-0 mt-2 w-48 rounded-md shadow-lg z-10 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <button
                  onClick={() => setSortBy('date')}
                  className="block px-4 py-2 text-sm w-full text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Data
                </button>
                <button
                  onClick={() => setSortBy('price')}
                  className="block px-4 py-2 text-sm w-full text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Preço
                </button>
                <button
                  onClick={() => setSortBy('distance')}
                  className="block px-4 py-2 text-sm w-full text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Distância
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className={`flex border-b overflow-x-auto ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 whitespace-nowrap ${
              activeTab === 'all'
                ? darkMode
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'border-b-2 border-blue-600 text-blue-600'
                : darkMode
                ? 'text-gray-400 hover:text-gray-300'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setActiveTab('new')}
            className={`px-4 py-2 whitespace-nowrap ${
              activeTab === 'new'
                ? darkMode
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'border-b-2 border-blue-600 text-blue-600'
                : darkMode
                ? 'text-gray-400 hover:text-gray-300'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Novos
          </button>
          <button
            onClick={() => setActiveTab('viewed')}
            className={`px-4 py-2 whitespace-nowrap ${
              activeTab === 'viewed'
                ? darkMode
                  ? 'border-b-2 border-purple-500 text-purple-500'
                  : 'border-b-2 border-purple-600 text-purple-600'
                : darkMode
                ? 'text-gray-400 hover:text-gray-300'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Visualizados
          </button>
        </div>
      </motion.div>

      {/* Orders List */}
      <motion.div variants={itemVariants} className="space-y-4">
        {sortedOrders.map((order) => (
          <div
            key={order.id}
            className={`p-4 rounded-lg shadow-sm ${
              darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}
                >
                  {order.client.avatar}
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{order.client.name}</h2>
                  <p className="text-sm text-gray-500">{order.client.rating} ★ ({order.client.orderCount} pedidos)</p>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusBadge(order.status).color}`}>
                {getStatusBadge(order.status).label}
              </div>
            </div>
            <div className="mb-2">
              <h3 className="text-lg font-semibold">{order.service}</h3>
              <p className="text-sm text-gray-500">{order.description}</p>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <div>
                <p>{order.location}</p>
                <p>{order.distance}</p>
              </div>
              <div>
                <p>{order.date}</p>
                <p>{order.time}</p>
              </div>
              <div>
                <p>{order.price}</p>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => contactClient(order.id)}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg ${
                  darkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                <MessageSquare size={16} />
                <span>Contactar</span>
              </button>
              <button
                onClick={() => acceptOrder(order.id)}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg ${
                  darkMode
                    ? 'bg-green-700 hover:bg-green-600 text-white'
                    : 'bg-green-200 hover:bg-green-300 text-green-800'
                }`}
              >
                <Check size={16} />
                <span>Aceitar</span>
              </button>
              <button
                onClick={() => rejectOrder(order.id)}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg ${
                  darkMode
                    ? 'bg-red-700 hover:bg-red-600 text-white'
                    : 'bg-red-200 hover:bg-red-300 text-red-800'
                }`}
              >
                <X size={16} />
                <span>Rejeitar</span>
              </button>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Pedidos;