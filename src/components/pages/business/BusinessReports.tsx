import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FileText, Download, Calendar, ArrowLeft, Filter, Search, TrendingUp, Package, DollarSign } from 'lucide-react';

interface Report {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
  status: 'ready' | 'generating' | 'failed';
}

const BusinessReports: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const reports: Report[] = [
    {
      id: 'REP-2024-001',
      name: 'Monthly Activity Report',
      type: 'activity',
      date: 'Mar 1, 2024',
      size: '2.4 MB',
      status: 'ready'
    },
    {
      id: 'REP-2024-002',
      name: 'Financial Summary',
      type: 'financial',
      date: 'Mar 1, 2024',
      size: '1.8 MB',
      status: 'ready'
    },
    {
      id: 'REP-2024-003',
      name: 'Usage Analytics',
      type: 'analytics',
      date: 'Mar 15, 2024',
      size: '3.2 MB',
      status: 'generating'
    }
  ];

  const stats = [
    {
      title: "Total Orders",
      value: "486",
      change: "+12%",
      icon: Package,
      color: "bg-blue-600",
      lightColor: "bg-blue-50"
    },
    {
      title: "Revenue",
      value: "€24,486",
      change: "+8%",
      icon: DollarSign,
      color: "bg-green-600",
      lightColor: "bg-green-50"
    },
    {
      title: "Growth",
      value: "18%",
      change: "+2%",
      icon: TrendingUp,
      color: "bg-purple-600",
      lightColor: "bg-purple-50"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
        return 'bg-green-100 text-green-700';
      case 'generating':
        return 'bg-yellow-100 text-yellow-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || report.type === activeFilter;
    return matchesSearch && matchesFilter;
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
                Reports & Analytics
              </h1>
            </div>
            <p className="text-gray-600 mt-2">
              View and download your business reports
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <motion.div
              key={stat.title}
              className={`${stat.lightColor} rounded-2xl p-6`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center text-white`}>
                  <stat.icon size={24} />
                </div>
                <span className="text-sm font-medium text-green-600">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div className="relative w-full sm:w-auto mb-4 sm:mb-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search reports..."
                className="w-full sm:w-80 pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </motion.button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-gray-100 pt-4"
              >
                <div className="flex flex-wrap gap-2">
                  {['all', 'activity', 'financial', 'analytics'].map((filter) => (
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
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <motion.div
              key={report.id}
              className="bg-white rounded-xl shadow-lg p-6"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div className="flex items-center mb-4 sm:mb-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center">
                      <h3 className="text-lg font-semibold text-gray-900">{report.name}</h3>
                      <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {report.date} • {report.size}
                    </div>
                  </div>
                </div>
                <motion.button
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={report.status !== 'ready'}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessReports;