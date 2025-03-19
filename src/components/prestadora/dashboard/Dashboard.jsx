import React from 'react';
import { useTheme } from '../../../utils/context/themeContext';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  Calendar,
  BarChart2,
  Tag,
  CheckCircle,
  AlertCircle,
  Star
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Dashboard = () => {
  const { darkMode } = useTheme();

  // Mock data for charts and statistics
  const lineChartData = [
    { name: 'Jan', value: 1200 },
    { name: 'Fev', value: 1900 },
    { name: 'Mar', value: 1500 },
    { name: 'Abr', value: 2200 },
    { name: 'Mai', value: 2800 },
    { name: 'Jun', value: 2600 },
  ];

  const pieChartData = [
    { name: 'Concluídos', value: 65 },
    { name: 'Em Andamento', value: 25 },
    { name: 'Cancelados', value: 10 },
  ];

  const COLORS = ['#22c55e', '#3b82f6', '#ef4444'];

  const recentServices = [
    {
      id: 1,
      client: 'Ana Souza',
      service: 'Limpeza Residencial',
      date: '12 Mar, 2025',
      status: 'completed',
      value: '500.000,00 Kzs'
    },
    {
      id: 2,
      client: 'Carlos Mendes',
      service: 'Manutenção Elétrica',
      date: '10 Mar, 2025',
      status: 'in-progress',
      value: '250.000,00 Kzs'
    },
    {
      id: 3,
      client: 'Lucia Ferreira',
      service: 'Pintura de Interior',
      date: '05 Mar, 2025',
      status: 'completed',
      value: '450.000,00 Kzs'
    }
  ];

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
      <motion.h1 
        variants={itemVariants} 
        className="text-3xl font-bold mb-6"
      >
        Dashboard
      </motion.h1>

      {/* Stats Overview */}
      <motion.div 
        variants={itemVariants} 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <StatCard
          title="Ganhos do Mês"
          value="500.000,00 Kzs"
          icon={<DollarSign size={24} />}
          change="+12% desde o mês passado"
          color="blue"
          darkMode={darkMode}
        />
        <StatCard
          title="Serviços Concluídos"
          value="24"
          icon={<CheckCircle size={24} />}
          change="+4 desde o mês passado"
          color="green"
          darkMode={darkMode}
        />
        <StatCard
          title="Clientes Novos"
          value="8"
          icon={<Users size={24} />}
          change="+3 desde o mês passado"
          color="purple"
          darkMode={darkMode}
        />
        <StatCard
          title="Avaliação Média"
          value="4.8"
          icon={<Star size={24} />}
          change="⭐⭐⭐⭐⭐"
          color="amber"
          darkMode={darkMode}
        />
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Earnings Chart */}
        <motion.div
          variants={itemVariants}
          className={`col-span-2 p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-xl font-semibold mb-4">Receitas Mensais</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                <XAxis 
                  dataKey="name" 
                  stroke={darkMode ? '#9ca3af' : '#6b7280'}
                />
                <YAxis 
                  stroke={darkMode ? '#9ca3af' : '#6b7280'}
                  tickFormatter={(value) => `${value} Kzs`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                    borderColor: darkMode ? '#374151' : '#e5e7eb',
                    color: darkMode ? '#f9fafb' : '#111827'
                  }}
                  formatter={(value) => [`R$ ${value}`, 'Receita']}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Status Distribution */}
        <motion.div
          variants={itemVariants}
          className={`p-6 rounded-xl shadow-lg ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-xl font-semibold mb-4">Status dos Serviços</h2>
          <div className="h-72 flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Porcentagem']}
                  contentStyle={{
                    backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                    borderColor: darkMode ? '#374151' : '#e5e7eb',
                    color: darkMode ? '#f9fafb' : '#111827'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent Services */}
      <motion.div
        variants={itemVariants}
        className={`p-6 rounded-xl shadow-lg ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <h2 className="text-xl font-semibold mb-4">Serviços Recentes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Cliente
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Serviço
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Data
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Valor
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {recentServices.map((service) => (
                <tr key={service.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium">{service.client}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{service.service}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{service.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      service.status === 'completed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : service.status === 'in-progress'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {service.status === 'completed' 
                        ? 'Concluído' 
                        : service.status === 'in-progress' 
                        ? 'Em Andamento' 
                        : 'Cancelado'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {service.value}
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

// Stat Card Component
const StatCard = ({ title, value, icon, change, color, darkMode }) => {
  const colorVariants = {
    blue: {
      bg: darkMode ? 'bg-blue-900/20' : 'bg-blue-50',
      text: darkMode ? 'text-blue-400' : 'text-blue-600',
      icon: darkMode ? 'text-blue-400 bg-blue-900/30' : 'text-blue-600 bg-blue-100',
    },
    green: {
      bg: darkMode ? 'bg-green-900/20' : 'bg-green-50',
      text: darkMode ? 'text-green-400' : 'text-green-600',
      icon: darkMode ? 'text-green-400 bg-green-900/30' : 'text-green-600 bg-green-100',
    },
    purple: {
      bg: darkMode ? 'bg-purple-900/20' : 'bg-purple-50',
      text: darkMode ? 'text-purple-400' : 'text-purple-600',
      icon: darkMode ? 'text-purple-400 bg-purple-900/30' : 'text-purple-600 bg-purple-100',
    },
    amber: {
      bg: darkMode ? 'bg-amber-900/20' : 'bg-amber-50',
      text: darkMode ? 'text-amber-400' : 'text-amber-600', 
      icon: darkMode ? 'text-amber-400 bg-amber-900/30' : 'text-amber-600 bg-amber-100',
    }
  };

  const colorClasses = colorVariants[color];

  return (
    <div className={`p-6 rounded-xl shadow-lg ${colorClasses.bg} border ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${colorClasses.icon}`}>
          {icon}
        </div>
      </div>
      <p className={`mt-4 text-xs font-medium ${colorClasses.text}`}>
        {change}
      </p>
    </div>
  );
};

export default Dashboard;