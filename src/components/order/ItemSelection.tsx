import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Plus, Minus, ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react';

interface Item {
  id: string;
  name: string;
  price: number;
  description?: string;
}

interface ItemsByCategory {
  [key: string]: {
    [key: string]: Item[];
  };
}

const itemsByCategory: ItemsByCategory = {
  'wash-iron': {
    'tops': [
      { id: 'shirt', name: 'Shirt', price: 4.99, description: 'Business or casual shirts' },
      { id: 'tshirt', name: 'T-Shirt', price: 3.99, description: 'Cotton t-shirts' },
      { id: 'polo', name: 'Polo Shirt', price: 4.49, description: 'Polo or golf shirts' },
      { id: 'blouse', name: 'Blouse', price: 5.99, description: 'Women\'s blouses' },
      { id: 'sweater', name: 'Sweater', price: 6.99, description: 'Knit sweaters and jumpers' }
    ],
    'bottoms': [
      { id: 'pants', name: 'Pants', price: 5.99, description: 'Regular or dress pants' },
      { id: 'jeans', name: 'Jeans', price: 6.99, description: 'Denim jeans' },
      { id: 'shorts', name: 'Shorts', price: 4.99, description: 'Casual shorts' },
      { id: 'skirt', name: 'Skirt', price: 5.99, description: 'Regular or pleated skirts' }
    ]
  },
  'dry-cleaning': {
    'formal': [
      { id: 'suit', name: 'Suit (2-piece)', price: 19.99, description: 'Jacket and pants' },
      { id: 'blazer', name: 'Blazer', price: 12.99, description: 'Single jacket or blazer' },
      { id: 'dress-pants', name: 'Dress Pants', price: 8.99, description: 'Formal trousers' }
    ],
    'delicate': [
      { id: 'silk-blouse', name: 'Silk Blouse', price: 9.99, description: 'Delicate silk tops' },
      { id: 'wool-sweater', name: 'Wool Sweater', price: 11.99, description: 'Wool or cashmere sweaters' }
    ]
  }
};

interface SelectedItem extends Item {
  quantity: number;
}

const ItemSelection: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: SelectedItem }>({});
  
  const service = location.state?.service || 'wash-iron';
  const category = location.state?.category || 'tops';
  
  const items = itemsByCategory[service]?.[category] || [];
  
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Items
          </h1>
          <p className="text-lg text-gray-600">
            Select the items you'd like to have cleaned
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search items..."
            className="w-full px-12 py-4 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Items List */}
        <div className="space-y-4 mb-8">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    {item.description && (
                      <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                    )}
                    <p className="text-blue-600 font-medium mt-2">${item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <motion.button
                      onClick={() => handleQuantityChange(item, -1)}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      disabled={!selectedItems[item.id]}
                    >
                      <Minus className="w-4 h-4" />
                    </motion.button>
                    
                    <span className="w-8 text-center font-medium">
                      {selectedItems[item.id]?.quantity || 0}
                    </span>
                    
                    <motion.button
                      onClick={() => handleQuantityChange(item, 1)}
                      className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-200"
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

        {/* Total and Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:relative md:border-none md:bg-transparent md:p-0">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <motion.button
                onClick={() => navigate('/order/category', { state: { service } })}
                className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Categories
              </motion.button>

              <div className="flex items-center">
                <div className="mr-6">
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-2xl font-bold text-gray-900">${totalAmount.toFixed(2)}</p>
                </div>

                <motion.button
                  onClick={() => Object.keys(selectedItems).length > 0 && navigate('/order/schedule')}
                  className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    Object.keys(selectedItems).length > 0
                      ? 'bg-blue-600 text-white shadow-lg hover:shadow-xl'
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
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ItemSelection;