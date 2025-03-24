import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Download, FileText, ChevronDown, ChevronUp, Calendar, ArrowLeft, Filter, Search } from 'lucide-react';

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  items: number;
}

const BusinessBilling: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const invoices: Invoice[] = [
    {
      id: 'INV-2024-001',
      date: 'Mar 1, 2024',
      amount: 1249.99,
      status: 'paid',
      items: 124
    },
    {
      id: 'INV-2024-002',
      date: 'Mar 15, 2024',
      amount: 899.50,
      status: 'pending',
      items: 86
    },
    {
      id: 'INV-2024-003',
      date: 'Feb 28, 2024',
      amount: 1599.99,
      status: 'paid',
      items: 156
    },
    {
      id: 'INV-2024-004',
      date: 'Feb 15, 2024',
      amount: 749.99,
      status: 'overdue',
      items: 72
    }
  ];

  const paymentMethods = [
    {
      id: 'card-1',
      type: 'visa',
      last4: '4242',
      expiry: '12/25',
      isDefault: true
    },
    {
      id: 'card-2',
      type: 'mastercard',
      last4: '8888',
      expiry: '09/24',
      isDefault: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'overdue':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesFilter = activeFilter === 'all' || invoice.status === activeFilter;
    const matchesSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <div className="flex items-center gap-4">
              <motion.button
                onClick={() => navigate('/business/dashboard')}
                className="text-gray-600 hover:text-gray-900"
                whileHover={{ x: -5 }}
              >
                <ArrowLeft className="w-6 h-6" />
              </motion.button>
              <h1 className="text-2xl font-bold text-gray-900">
                Billing & Invoices
              </h1>
            </div>
            <p className="text-gray-600 mt-2">
              Manage your payment methods and view invoice history
            </p>
          </div>
          <motion.button
            onClick={() => navigate('/business/billing/add-payment')}
            className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Add Payment Method
          </motion.button>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Methods</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paymentMethods.map((method) => (
              <motion.div
                key={method.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900 capitalize">{method.type}</span>
                      {method.isDefault && (
                        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <span className="text-gray-600">•••• {method.last4} | Expires {method.expiry}</span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <ChevronDown className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Invoices */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Invoice History</h2>
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 rounded-xl bg-gray-100 text-gray-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter className="w-5 h-5" />
              </motion.button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search invoices..."
                  className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </div>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mb-6"
              >
                <div className="flex flex-wrap gap-2">
                  {['all', 'paid', 'pending', 'overdue'].map((filter) => (
                    <motion.button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-4 py-2 rounded-xl capitalize ${
                        activeFilter === filter
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {filter}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            {filteredInvoices.map((invoice) => (
              <motion.div
                key={invoice.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-gray-900">{invoice.id}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      {invoice.date} • {invoice.items} items
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-medium text-gray-900">€{invoice.amount.toFixed(2)}</div>
                  </div>
                  <motion.button
                    className="p-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessBilling;