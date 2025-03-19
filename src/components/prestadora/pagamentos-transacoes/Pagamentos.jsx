import React, { useState } from 'react';
import { useTheme } from '../../../utils/context/themeContext';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  DollarSign, 
  CreditCard, 
  Download,
  ArrowUpRight,
  ArrowDownLeft,
  Check,
  AlertTriangle,
  Filter,
  Search,
  ChevronDown,
  Wallet,
  Building, // Replace Bank with Building
  Landmark,
  Plus, // Add missing Plus icon
  MoreVertical, // Add missing MoreVertical icon
  Clock // Add Clock icon
} from 'lucide-react';

// Mock data for transactions
const transactions = [
  {
    id: 'TRX-3847',
    client: 'Roberto Oliveira',
    service: 'Manutenção Elétrica',
    amount: 180.00,
    status: 'completed',
    date: '15/03/2025',
    type: 'income'
  },
  {
    id: 'TRX-3848',
    client: 'Amanda Santos',
    service: 'Limpeza Residencial',
    amount: 220.00,
    status: 'pending',
    date: '16/03/2025',
    type: 'income'
  },
  {
    id: 'TRX-3849',
    client: 'Ricardo Almeida',
    service: 'Instalação de Ar Condicionado',
    amount: 350.00,
    status: 'completed',
    date: '17/03/2025',
    type: 'income'
  },
  {
    id: 'TRX-3850',
    description: 'Taxa de serviço',
    amount: 37.50,
    status: 'completed',
    date: '17/03/2025',
    type: 'fee'
  },
  {
    id: 'TRX-3851',
    description: 'Saque para conta bancária',
    amount: 712.50,
    status: 'completed',
    date: '18/03/2025',
    type: 'withdrawal'
  }
];

// Mock data for bank accounts
const bankAccounts = [
  {
    id: 1,
    bankName: 'Banco do Brasil',
    accountType: 'Conta Corrente',
    accountNumber: '****3456',
    isDefault: true
  },
  {
    id: 2,
    bankName: 'Nubank',
    accountType: 'Conta Digital',
    accountNumber: '****7890',
    isDefault: false
  }
];

const Pagamentos = () => {
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [filterOpen, setFilterOpen] = useState(false);
  const [dateRange, setDateRange] = useState('this-month');
  const [transactionType, setTransactionType] = useState('all');

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

  // Calculate summary data
  const availableBalance = 650.00;
  const totalEarnings = transactions
    .filter(t => t.type === 'income' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);
  const pendingPayments = transactions
    .filter(t => t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0);

  // Filter transactions based on selected filters
  const filteredTransactions = transactions.filter(transaction => {
    if (transactionType !== 'all' && transaction.type !== transactionType) {
      return false;
    }
    return true;
  });

  const getTransactionStatusBadge = (status) => {
    switch(status) {
      case 'completed':
        return {
          label: 'Concluído',
          color: darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'
        };
      case 'pending':
        return {
          label: 'Pendente',
          color: darkMode ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-600'
        };
      case 'failed':
        return {
          label: 'Falhou',
          color: darkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-600'
        };
      default:
        return {
          label: 'Processando',
          color: darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'
        };
    }
  };

  const getTransactionTypeIcon = (type) => {
    switch(type) {
      case 'income':
        return <ArrowDownLeft size={18} className="text-green-500" />;
      case 'withdrawal':
        return <ArrowUpRight size={18} className="text-red-500" />;
      case 'fee':
        return <DollarSign size={18} className="text-amber-500" />;
      default:
        return <DollarSign size={18} className="text-gray-500" />;
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
        <h1 className="text-2xl font-bold mb-1">Pagamentos e Transações</h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Gerencie seus recebimentos, transações e métodos de pagamento
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className={`flex border-b overflow-x-auto ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 whitespace-nowrap ${
              activeTab === 'overview'
                ? darkMode
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'border-b-2 border-blue-600 text-blue-600'
                : darkMode
                ? 'text-gray-400 hover:text-gray-300'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Visão Geral
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-4 py-2 whitespace-nowrap ${
              activeTab === 'transactions'
                ? darkMode
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'border-b-2 border-blue-600 text-blue-600'
                : darkMode
                ? 'text-gray-400 hover:text-gray-300'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Transações
          </button>
          <button
            onClick={() => setActiveTab('payment-methods')}
            className={`px-4 py-2 whitespace-nowrap ${
              activeTab === 'payment-methods'
                ? darkMode
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'border-b-2 border-blue-600 text-blue-600'
                : darkMode
                ? 'text-gray-400 hover:text-gray-300'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Métodos de Pagamento
          </button>
        </div>
      </motion.div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          {/* Balance Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className={`p-6 rounded-lg shadow-sm ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="flex justify-between mb-3">
                <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Saldo Disponível
                </h3>
                <div className={`p-2 rounded-full ${
                  darkMode ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                }`}>
                  <Wallet size={20} />
                </div>
              </div>
              <p className="text-2xl font-bold">R$ {availableBalance.toFixed(2)}</p>
              <div className="flex justify-between items-center mt-4">
                <button className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  darkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}>
                  Sacar
                </button>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Atualizado em 19/03/2025
                </p>
              </div>
            </div>

            <div className={`p-6 rounded-lg shadow-sm ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="flex justify-between mb-3">
                <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Ganhos Totais (Mês)
                </h3>
                <div className={`p-2 rounded-full ${
                  darkMode ? 'bg-green-900/20 text-green-400' : 'bg-green-100 text-green-600'
                }`}>
                  <ArrowDownLeft size={20} />
                </div>
              </div>
              <p className="text-2xl font-bold">R$ {totalEarnings.toFixed(2)}</p>
              <div className="mt-4">
                <div className={`h-2 rounded-full overflow-hidden w-full ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  <div 
                    className="h-full bg-green-500" 
                    style={{ width: `${(totalEarnings / 1500) * 100}%` }}
                  ></div>
                </div>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {((totalEarnings / 1500) * 100).toFixed(0)}% da meta mensal
                </p>
              </div>
            </div>

            <div className={`p-6 rounded-lg shadow-sm ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="flex justify-between mb-3">
                <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Pagamentos Pendentes
                </h3>
                <div className={`p-2 rounded-full ${
                  darkMode ? 'bg-amber-900/20 text-amber-400' : 'bg-amber-100 text-amber-600'
                }`}>
                  <Clock size={20} />
                </div>
              </div>
              <p className="text-2xl font-bold">R$ {pendingPayments.toFixed(2)}</p>
              <div className="flex justify-between items-center mt-4">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  darkMode ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-600'
                }`}>
                  {transactions.filter(t => t.status === 'pending').length} transações
                </span>
                <button className={`text-sm ${
                  darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                }`}>
                  Ver detalhes
                </button>
              </div>
            </div>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div variants={itemVariants}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Transações Recentes</h2>
              <button 
                onClick={() => setActiveTab('transactions')}
                className={`text-sm ${
                  darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                }`}
              >
                Ver todas
              </button>
            </div>
            
            <div className={`rounded-lg overflow-hidden shadow-sm ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Transação
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Data
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Valor
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {transactions.slice(0, 5).map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 mr-3">
                            {getTransactionTypeIcon(transaction.type)}
                          </div>
                          <div>
                            <div className="text-sm font-medium">
                              {transaction.client || transaction.description}
                            </div>
                            {transaction.service && (
                              <div className="text-xs text-gray-500">
                                {transaction.service}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">{transaction.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${
                          transaction.type === 'income' 
                            ? 'text-green-500' 
                            : transaction.type === 'withdrawal' || transaction.type === 'fee'
                            ? 'text-red-500'
                            : ''
                        }`}>
                          {transaction.type === 'income' ? '+' : '-'} 
                          R$ {transaction.amount.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          getTransactionStatusBadge(transaction.status).color
                        }`}>
                          {getTransactionStatusBadge(transaction.status).label}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </>
      )}

      {/* Transactions Tab */}
      {activeTab === 'transactions' && (
        <>
          {/* Filters */}
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
                placeholder="Buscar transações..."
                className={`pl-10 pr-4 py-2 w-full rounded-lg ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                } border focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <button 
                  onClick={() => setFilterOpen(!filterOpen)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    darkMode 
                      ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' 
                      : 'bg-white hover:bg-gray-50 border border-gray-300'
                  }`}
                >
                  <Filter size={18} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                  <span>Filtros</span>
                  <ChevronDown size={16} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                </button>
                
                {filterOpen && (
                  <div className={`absolute right-0 mt-2 w-64 rounded-lg shadow-lg z-10 p-4 ${
                    darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                  }`}>
                    <h3 className="text-sm font-medium mb-2">Período</h3>
                    <div className="space-y-2 mb-4">
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="date-range" 
                          checked={dateRange === 'this-month'} 
                          onChange={() => setDateRange('this-month')}
                          className="text-blue-600"
                        />
                        <span className="ml-2 text-sm">Este mês</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="date-range" 
                          checked={dateRange === 'last-month'} 
                          onChange={() => setDateRange('last-month')}
                          className="text-blue-600"
                        />
                        <span className="ml-2 text-sm">Mês passado</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="date-range" 
                          checked={dateRange === 'custom'} 
                          onChange={() => setDateRange('custom')}
                          className="text-blue-600"
                        />
                        <span className="ml-2 text-sm">Personalizado</span>
                      </label>
                    </div>
                    
                    <h3 className="text-sm font-medium mb-2">Tipo de Transação</h3>
                    <div className="space-y-2 mb-4">
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="transaction-type" 
                          checked={transactionType === 'all'} 
                          onChange={() => setTransactionType('all')}
                          className="text-blue-600"
                        />
                        <span className="ml-2 text-sm">Todas</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="transaction-type" 
                          checked={transactionType === 'income'} 
                          onChange={() => setTransactionType('income')}
                          className="text-blue-600"
                        />
                        <span className="ml-2 text-sm">Recebimentos</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="transaction-type" 
                          checked={transactionType === 'withdrawal'} 
                          onChange={() => setTransactionType('withdrawal')}
                          className="text-blue-600"
                        />
                        <span className="ml-2 text-sm">Saques</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="transaction-type" 
                          checked={transactionType === 'fee'} 
                          onChange={() => setTransactionType('fee')}
                          className="text-blue-600"
                        />
                        <span className="ml-2 text-sm">Taxas</span>
                      </label>
                    </div>
                    
                    <div className="flex justify-end">
                      <button 
                        onClick={() => setFilterOpen(false)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg ${
                          darkMode
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                      >
                        Aplicar
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <button className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                darkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' 
                  : 'bg-white hover:bg-gray-50 border border-gray-300'
              }`}>
                <Download size={18} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                <span>Exportar</span>
              </button>
            </div>
          </motion.div>

          {/* Transactions List */}
          <motion.div variants={itemVariants}>
            <div className={`rounded-lg overflow-hidden shadow-sm ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Transação
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Data
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Valor
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">{transaction.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 mr-3">
                            {getTransactionTypeIcon(transaction.type)}
                          </div>
                          <div>
                            <div className="text-sm font-medium">
                              {transaction.client || transaction.description}
                            </div>
                            {transaction.service && (
                              <div className="text-xs text-gray-500">
                                {transaction.service}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">{transaction.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${
                          transaction.type === 'income' 
                            ? 'text-green-500' 
                            : transaction.type === 'withdrawal' || transaction.type === 'fee'
                            ? 'text-red-500'
                            : ''
                        }`}>
                          {transaction.type === 'income' ? '+' : '-'} 
                          R$ {transaction.amount.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          getTransactionStatusBadge(transaction.status).color
                        }`}>
                          {getTransactionStatusBadge(transaction.status).label}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </>
      )}

      {/* Payment Methods Tab */}
      {activeTab === 'payment-methods' && (
        <>
          {/* Bank Accounts */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Contas Bancárias</h2>
              <button 
                className={`flex items-center gap-1 text-sm font-medium ${
                  darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                }`}
              >
                <span>Adicionar Conta</span>
                <Plus size={16} />
              </button>
            </div>
            
            <div className="space-y-4">
              {bankAccounts.map(account => (
                <div 
                  key={account.id}
                  className={`p-4 rounded-lg shadow-sm border ${
                    account.isDefault
                      ? darkMode 
                        ? 'border-blue-500 bg-blue-900/10' 
                        : 'border-blue-500 bg-blue-50'
                      : darkMode
                      ? 'border-gray-700 bg-gray-800'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Building size={20} className="mr-3" />
                      <div>
                        <h3 className="font-medium">{account.bankName}</h3>
                        <p className="text-sm text-gray-500">{account.accountType}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {account.isDefault && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium mr-3 ${
                          darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'
                        }`}>
                          Padrão
                        </span>
                      )}
                      <button className={`p-2 rounded-full ${
                        darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}>
                        <MoreVertical size={18} className="text-gray-500" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm">Número da conta: {account.accountNumber}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Withdrawal Settings */}
          <motion.div variants={itemVariants}>
            <h2 className="text-lg font-semibold mb-4">Configurações de Saque</h2>
            
            <div className={`p-4 rounded-lg shadow-sm ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium">Conta Padrão</h3>
                <button className={`text-sm ${
                  darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                }`}>
                  Alterar
                </button>
              </div>
              <div className="flex items-center">
                <Building size={20} className="mr-3" />
                <div>
                  <h4 className="font-medium">{bankAccounts.find(account => account.isDefault).bankName}</h4>
                  <p className="text-sm text-gray-500">{bankAccounts.find(account => account.isDefault).accountType}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default Pagamentos;