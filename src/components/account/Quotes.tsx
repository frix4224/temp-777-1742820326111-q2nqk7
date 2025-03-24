import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Camera, Clock, Search, Filter, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import AccountLayout from './AccountLayout';

interface Quote {
  id: string;
  item_name: string;
  description: string;
  status: 'pending' | 'quoted' | 'accepted' | 'declined';
  urgency: 'standard' | 'express';
  created_at: string;
  suggested_price?: number;
  image_url: string[];
}

const Quotes: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (user) {
      fetchQuotes();
    }
  }, [user]);

  const fetchQuotes = async () => {
    try {
      const { data, error } = await supabase
        .from('custom_price_quotes')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQuotes(data || []);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'quoted':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filterQuotes = (quote: Quote) => {
    // Search filter
    const searchMatch = 
      quote.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter
    const statusMatch = filters.status === 'all' || quote.status === filters.status;

    // Date range filter
    let dateMatch = true;
    const quoteDate = new Date(quote.created_at);
    const now = new Date();
    switch (filters.dateRange) {
      case 'today':
        dateMatch = quoteDate.toDateString() === now.toDateString();
        break;
      case 'week':
        const weekAgo = new Date(now.setDate(now.getDate() - 7));
        dateMatch = quoteDate >= weekAgo;
        break;
      case 'month':
        const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
        dateMatch = quoteDate >= monthAgo;
        break;
    }

    return searchMatch && statusMatch && dateMatch;
  };

  const filteredQuotes = quotes.filter(filterQuotes);

  return (
    <AccountLayout activeTab="quotes">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900">Custom Price Quotes</h2>
          
          <motion.button
            onClick={() => navigate('/order/custom-quote')}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Camera className="w-5 h-5 mr-2" />
            Request New Quote
          </motion.button>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search quotes..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gray-50 rounded-xl p-4 space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="quoted">Quoted</option>
                    <option value="accepted">Accepted</option>
                    <option value="declined">Declined</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                  <select
                    value={filters.dateRange}
                    onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">Last 7 Days</option>
                    <option value="month">Last 30 Days</option>
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quotes List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-gray-600">Loading quotes...</p>
          </div>
        ) : filteredQuotes.length === 0 ? (
          <div className="text-center py-12">
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Quotes Found</h3>
            <p className="text-gray-600">
              {searchTerm || filters.status !== 'all' || filters.dateRange !== 'all'
                ? 'Try adjusting your filters'
                : 'Request a quote for your special items'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredQuotes.map((quote) => (
              <motion.div
                key={quote.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="p-6">
                  <div className="flex flex-wrap gap-4 items-start justify-between mb-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Request ID: {quote.id}</div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {new Date(quote.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(quote.status)}`}>
                      {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-lg font-semibold text-gray-900 mb-2">{quote.item_name}</div>
                      <p className="text-gray-600">{quote.description}</p>
                      {quote.suggested_price && (
                        <div className="mt-4">
                          <div className="text-sm text-gray-600">Quote Amount</div>
                          <div className="text-2xl font-bold text-gray-900">
                            €{quote.suggested_price.toFixed(2)}
                          </div>
                        </div>
                      )}
                    </div>

                    {quote.image_url && quote.image_url.length > 0 && (
                      <div className="grid grid-cols-2 gap-2">
                        {quote.image_url.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`${quote.item_name} - Image ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {quote.status === 'quoted' && (
                    <div className="mt-6 flex flex-wrap gap-4">
                      <motion.button
                        onClick={() => navigate(`/order/accept-quote/${quote.id}`)}
                        className="px-6 py-2 bg-blue-600 text-white rounded-xl font-medium flex items-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Accept Quote
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </motion.button>
                      <motion.button
                        onClick={() => navigate(`/order/decline-quote/${quote.id}`)}
                        className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Decline
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AccountLayout>
  );
};

export default Quotes;