import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Plus, Minus, ArrowLeft, ArrowRight, ShoppingBag, Package, Shirt, Wind, Scissors, Info } from 'lucide-react';

interface Item {
  id: string;
  name: string;
  price: number;
  description?: string;
  categoryId: string;
  popular?: boolean;
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon?: any;
}

interface ServiceInfo {
  id: string;
  name: string;
  icon: any;
  color: string;
  lightColor: string;
}

interface SelectedItem extends Item {
  quantity: number;
}

const services: { [key: string]: ServiceInfo } = {
  'easy-bag': {
    id: 'easy-bag',
    name: 'Eazyy Bag',
    icon: Package,
    color: 'bg-blue-600',
    lightColor: 'bg-blue-50'
  },
  'wash-iron': {
    id: 'wash-iron',
    name: 'Wash & Iron',
    icon: Shirt,
    color: 'bg-purple-600',
    lightColor: 'bg-purple-50'
  },
  'dry-cleaning': {
    id: 'dry-cleaning',
    name: 'Dry Cleaning',
    icon: Wind,
    color: 'bg-emerald-600',
    lightColor: 'bg-emerald-50'
  },
  'repairs': {
    id: 'repairs',
    name: 'Repairs',
    icon: Scissors,
    color: 'bg-amber-600',
    lightColor: 'bg-amber-50'
  }
};

const categories: { [key: string]: Category[] } = {
  'wash-iron': [
    { id: 'tops', name: 'Tops', description: 'Shirts, t-shirts, and blouses', icon: Shirt },
    { id: 'bottoms', name: 'Bottoms', description: 'Pants, shorts, and skirts' },
    { id: 'dresses', name: 'Dresses', description: 'Dresses and jumpsuits' },
    { id: 'outerwear', name: 'Outerwear', description: 'Jackets and coats' }
  ],
  'dry-cleaning': [
    { id: 'formal', name: 'Formal Wear', description: 'Suits and formal attire' },
    { id: 'delicate', name: 'Delicate Items', description: 'Silk and wool garments' },
    { id: 'special', name: 'Special Care', description: 'Items requiring special attention' }
  ],
  'repairs': [
    { id: 'basic', name: 'Basic Repairs', description: 'Simple fixes and alterations' },
    { id: 'advanced', name: 'Advanced Repairs', description: 'Complex repairs and modifications' }
  ],
  'easy-bag': [
    { id: 'mixed', name: 'Mixed Items', description: 'All types of regular laundry' }
  ]
};

const items: Item[] = [
  // Tops
  { id: 'shirt', name: 'Shirt', price: 4.99, description: 'Business or casual shirts', categoryId: 'tops', popular: true },
  { id: 'tshirt', name: 'T-Shirt', price: 3.99, description: 'Cotton t-shirts', categoryId: 'tops', popular: true },
  { id: 'polo', name: 'Polo Shirt', price: 4.49, description: 'Polo or golf shirts', categoryId: 'tops' },
  { id: 'blouse', name: 'Blouse', price: 5.99, description: 'Women\'s blouses', categoryId: 'tops' },
  
  // Bottoms
  { id: 'pants', name: 'Pants', price: 5.99, description: 'Regular or dress pants', categoryId: 'bottoms', popular: true },
  { id: 'jeans', name: 'Jeans', price: 6.99, description: 'Denim jeans', categoryId: 'bottoms', popular: true },
  { id: 'shorts', name: 'Shorts', price: 4.99, description: 'Casual shorts', categoryId: 'bottoms' },
  { id: 'skirt', name: 'Skirt', price: 5.99, description: 'Regular or pleated skirts', categoryId: 'bottoms' },

  // Formal Wear
  { id: 'suit', name: 'Suit (2-piece)', price: 19.99, description: 'Complete suit cleaning', categoryId: 'formal', popular: true },
  { id: 'blazer', name: 'Blazer', price: 12.99, description: 'Single blazer or jacket', categoryId: 'formal' },
  { id: 'formal_dress', name: 'Formal Dress', price: 15.99, description: 'Evening or formal dresses', categoryId: 'formal' },

  // Delicate Items
  { id: 'silk_blouse', name: 'Silk Blouse', price: 9.99, description: 'Delicate silk tops', categoryId: 'delicate' },
  { id: 'wool_sweater', name: 'Wool Sweater', price: 11.99, description: 'Wool or cashmere sweaters', categoryId: 'delicate', popular: true },
  { id: 'silk_dress', name: 'Silk Dress', price: 14.99, description: 'Silk dresses', categoryId: 'delicate' }
];

const UnifiedSelection: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: SelectedItem }>({});
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  
  const service = location.state?.service || 'wash-iron';
  const serviceInfo = services[service];
  const availableCategories = categories[service] || [];

  // Filter items based on active category and search term
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return (!activeCategory || item.categoryId === activeCategory) && matchesSearch;
  });

  // Sort items to show popular items first
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (a.popular && !b.popular) return -1;
    if (!a.popular && b.popular) return 1;
    return 0;
  });

  const totalAmount = Object.values(selectedItems).reduce(
    (sum, item) => sum + item.price * item.quantity,
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
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
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
                {React.createElement(serviceInfo.icon, { size: 28 })}
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  {serviceInfo.name}
                </h1>
                <p className="text-gray-600">
                  Select items for your order
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
                  <h3 className="font-medium text-gray-900 mb-2">Service Information</h3>
                  <ul className="space-y-2">
                    <li>• Professional cleaning and care</li>
                    <li>• 24-48 hour turnaround time</li>
                    <li>• Free pickup and delivery</li>
                    <li>• Satisfaction guaranteed</li>
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
            {availableCategories.map((category) => (
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
            {sortedItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 ${
                  item.popular ? 'border-2 border-blue-200' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      {item.popular && (
                        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                    )}
                    <p className="text-blue-600 font-medium mt-2">€{item.price.toFixed(2)}</p>
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
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <motion.button
              onClick={() => navigate('/order/service', { state: { service } })}
              className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </motion.button>

            <div className="flex items-center">
              <div className="mr-6">
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900">€{totalAmount.toFixed(2)}</p>
              </div>

              <motion.button
                onClick={() => Object.keys(selectedItems).length > 0 && navigate('/order/address', { 
                  state: { 
                    service,
                    items: selectedItems
                  }
                })}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
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
                <span className="ml-2">({Object.values(selectedItems).reduce((sum, item) => sum + item.quantity, 0)})</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UnifiedSelection;