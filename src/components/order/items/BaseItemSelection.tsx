import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Plus, Minus, ArrowLeft, ArrowRight, ShoppingBag, Info, Tag, Star, Check } from 'lucide-react';
import { useServices } from '../../../contexts/ServicesContext';

interface ServiceInfo {
  id: string;
  name: string;
  icon: any;
  color: string;
  lightColor: string;
  description: string;
  features: string[];
}

interface BaseItemSelectionProps {
  service: string;
  serviceInfo: ServiceInfo;
}

interface SelectedItem {
  id: string;
  name: string;
  price: number | null;
  quantity: number;
}

const BaseItemSelection: React.FC<BaseItemSelectionProps> = ({
  service,
  serviceInfo
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { categories, items, getServiceCategories, getCategoryItems } = useServices();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: SelectedItem }>({});
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  const availableCategories = getServiceCategories(service);

  // Filter items based on active category and search term
  const filteredItems = activeCategory 
    ? getCategoryItems(activeCategory)
    : availableCategories.flatMap(cat => getCategoryItems(cat.id));

  const searchFilteredItems = filteredItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate totals
  const totalAmount = Object.values(selectedItems).reduce(
    (sum, item) => sum + ((item.price || 0) * item.quantity),
    0
  );

  const totalItems = Object.values(selectedItems).reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleQuantityChange = (item: any, change: number) => {
    if (item.is_custom_price) {
      navigate('/order/custom-quote', {
        state: {
          item,
          returnPath: location.pathname
        }
      });
      return;
    }

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
          id: item.id,
          name: item.name,
          price: item.price,
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
        <motion.div 
          className={`${serviceInfo.lightColor} rounded-2xl p-6 mb-8 shadow-lg overflow-hidden relative`}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-16 h-16 ${serviceInfo.color} rounded-2xl flex items-center justify-center shadow-lg transform transition-transform duration-200 hover:scale-110`}>
                  <serviceInfo.icon size={32} className="text-white" />
                </div>
                <div className="ml-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {serviceInfo.name}
                  </h1>
                  <p className="text-gray-700 text-lg">
                    {serviceInfo.description}
                  </p>
                </div>
              </div>
              <motion.button
                onClick={() => setShowInfo(!showInfo)}
                className={`p-3 rounded-xl ${serviceInfo.color} text-white hover:opacity-90 transition-all duration-200`}
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
                  className="mt-6 pt-6 border-t border-gray-200"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Service Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {serviceInfo.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className={`w-8 h-8 ${serviceInfo.color} rounded-lg flex items-center justify-center`}>
                            <Check className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            <motion.button
              onClick={() => setActiveCategory(null)}
              className={`flex-shrink-0 px-6 py-3 rounded-xl transition-all duration-200 ${
                !activeCategory 
                  ? `${serviceInfo.color} text-white shadow-lg` 
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200 shadow'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All Items
            </motion.button>
            {availableCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex-shrink-0 px-6 py-3 rounded-xl transition-all duration-200 ${
                  activeCategory === category.id 
                    ? `${serviceInfo.color} text-white shadow-lg` 
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200 shadow'
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
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search items..."
              className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300 shadow-md"
            />
          </div>
          {searchTerm && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-500"
            >
              {searchFilteredItems.length} results
            </motion.div>
          )}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          <AnimatePresence mode="popLayout">
            {searchFilteredItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full text-center py-12"
              >
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </motion.div>
            ) : (
              searchFilteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                    item.is_popular ? `border-l-4 ${serviceInfo.color}` : 'border border-gray-100'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        {item.is_popular && (
                          <div className={`ml-2 px-2 py-1 ${serviceInfo.lightColor} ${serviceInfo.color.replace('bg-', 'text-')} text-xs font-medium rounded-full flex items-center`}>
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            Popular
                          </div>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                      )}
                      <div className="flex items-center">
                        <Tag className={`w-4 h-4 ${serviceInfo.color.replace('bg-', 'text-')} mr-2`} />
                        {item.price !== null ? (
                          <span className="text-lg font-semibold text-gray-900">
                            €{item.price.toFixed(2)}
                          </span>
                        ) : (
                          <span className={`font-medium ${serviceInfo.color.replace('bg-', 'text-')}`}>
                            Custom Price
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 ml-4">
                      {item.price !== null ? (
                        <>
                          <motion.button
                            onClick={() => handleQuantityChange(item, -1)}
                            className={`w-9 h-9 rounded-full flex items-center justify-center ${
                              selectedItems[item.id]
                                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                            whileHover={selectedItems[item.id] ? { scale: 1.1 } : {}}
                            whileTap={selectedItems[item.id] ? { scale: 0.9 } : {}}
                            disabled={!selectedItems[item.id]}
                          >
                            <Minus className="w-4 h-4" />
                          </motion.button>
                          
                          <div className="w-8 text-center">
                            <span className="font-semibold text-gray-900">
                              {selectedItems[item.id]?.quantity || 0}
                            </span>
                          </div>
                          
                          <motion.button
                            onClick={() => handleQuantityChange(item, 1)}
                            className={`w-9 h-9 rounded-full ${serviceInfo.color} text-white flex items-center justify-center shadow-md hover:shadow-lg`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Plus className="w-4 h-4" />
                          </motion.button>
                        </>
                      ) : (
                        <motion.button
                          onClick={() => handleQuantityChange(item, 1)}
                          className={`px-4 py-2 ${serviceInfo.color} text-white rounded-xl text-sm font-medium shadow-md hover:shadow-lg`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Request Quote
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
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
                className={`w-full sm:w-auto flex items-center justify-center px-8 py-4 rounded-xl font-medium transition-all duration-300 ${
                  Object.keys(selectedItems).length > 0
                    ? `${serviceInfo.color} text-white shadow-lg hover:shadow-xl`
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