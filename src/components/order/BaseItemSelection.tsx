import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Plus, Minus, ArrowLeft, ArrowRight, ShoppingBag, Info } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Category, Item } from '../../lib/supabase';

interface ServiceInfo {
  id: string;
  name: string;
  icon: any;
  color: string;
  lightColor: string;
  description: string;
  features: string[];
}

interface SelectedItem extends Item {
  quantity: number;
}

interface BaseItemSelectionProps {
  service: string;
  serviceInfo: ServiceInfo;
  categories: Category[];
  items: Item[];
}

const BaseItemSelection: React.FC<BaseItemSelectionProps> = ({
  service,
  serviceInfo,
  categories,
  items
}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: SelectedItem }>({});
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  // Filter items based on active category and search term
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return (!activeCategory || item.category_id === activeCategory) && matchesSearch;
  });

  // Calculate totals
  const totalAmount = Object.values(selectedItems).reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );

  const totalItems = Object.values(selectedItems).reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleQuantityChange = (item: Item, change: number) => {
    setSelectedItems(prev => {
      const current = prev[item.id]?.quantity || 0;
      const newQuantity = Math.max(0, current + change);
      
      if (newQuantity === 0) {
        const { [item.id]: _, ...rest } = prev;
        return rest;
      }
      
      return {
        ...prev,
        [item.id]: {
          ...item,
          quantity: newQuantity
        }
      };
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-6xl mx-auto"
      >
        {/* Service Header */}
        <div className={`${serviceInfo.lightColor} rounded-2xl p-6 mb-8`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-14 h-14 ${serviceInfo.color} rounded-xl flex items-center justify-center text-white`}>
                <serviceInfo.icon size={28} />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  {serviceInfo.name}
                </h1>
                <p className="text-gray-600">
                  {serviceInfo.description}
                </p>
              </div>
            </div>
            <motion.button
              onClick={() => setShowInfo(!showInfo)}
              className={`p-2 rounded-lg ${serviceInfo.color} bg-opacity-10 text-gray-700`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Info className="w-6 h-6" />
            </motion.button>
          </div>
          
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-gray-200"
              >
                <div className="text-gray-600">
                  <h3 className="font-medium text-gray-900 mb-2">Service Features</h3>
                  <ul className="space-y-2">
                    {serviceInfo.features.map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            <motion.button
              onClick={() => setActiveCategory(null)}
              className={`flex-shrink-0 px-6 py-3 rounded-xl transition-all duration-200 ${
                !activeCategory ? serviceInfo.color + ' text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All Items
            </motion.button>
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex-shrink-0 px-6 py-3 rounded-xl transition-all duration-200 ${
                  activeCategory === category.id ? serviceInfo.color + ' text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search items..."
            className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 ${
                  item.is_popular ? 'border-2 border-blue-200' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      {item.is_popular && (
                        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                    )}
                    {item.price && (
                      <p className="text-blue-600 font-medium mt-2">€{item.price.toFixed(2)}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <motion.button
                      onClick={() => handleQuantityChange(item, -1)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        selectedItems[item.id]
                          ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                      }`}
                      whileHover={selectedItems[item.id] ? { scale: 1.1 } : {}}
                      whileTap={selectedItems[item.id] ? { scale: 0.9 } : {}}
                      disabled={!selectedItems[item.id]}
                    >
                      <Minus className="w-4 h-4" />
                    </motion.button>
                    
                    <span className="w-8 text-center font-medium">
                      {selectedItems[item.id]?.quantity || 0}
                    </span>
                    
                    <motion.button
                      onClick={() => handleQuantityChange(item, 1)}
                      className={`w-8 h-8 rounded-full ${serviceInfo.lightColor} flex items-center justify-center ${serviceInfo.color.replace('bg-', 'text-')}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Plus className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Fixed Bottom Bar */}
        <motion.div 
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Back Button - Hidden on Mobile */}
              <motion.button
                onClick={() => navigate('/order/service')}
                className="hidden sm:flex items-center px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </motion.button>

              {/* Mobile Price and Items Count */}
              <div className="w-full sm:w-auto flex items-center justify-between sm:hidden bg-gray-50 p-3 rounded-xl">
                <div className="flex items-center">
                  <ShoppingBag className="w-5 h-5 text-gray-600 mr-2" />
                  <span className="text-gray-600">{totalItems} items</span>
                </div>
                <span className="font-bold text-gray-900">€{totalAmount.toFixed(2)}</span>
              </div>

              {/* Desktop Price */}
              <div className="hidden sm:block">
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900">€{totalAmount.toFixed(2)}</p>
              </div>

              {/* Continue Button */}
              <motion.button
                onClick={() => Object.keys(selectedItems).length > 0 && navigate('/order/address', { 
                  state: { 
                    service,
                    items: selectedItems
                  }
                })}
                className={`w-full sm:w-auto flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  Object.keys(selectedItems).length > 0
                    ? serviceInfo.color + ' text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                whileHover={Object.keys(selectedItems).length > 0 ? { scale: 1.05 } : {}}
                whileTap={Object.keys(selectedItems).length > 0 ? { scale: 0.95 } : {}}
                disabled={Object.keys(selectedItems).length === 0}
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                <span>Continue to Checkout</span>
                <span className="ml-2">({totalItems})</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BaseItemSelection;