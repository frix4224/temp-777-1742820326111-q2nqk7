import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shirt, Tangent as Pants, Trees as Dress, Cat as Coat, ArrowLeft, ArrowRight } from 'lucide-react';

interface CategoryData {
  [key: string]: {
    title: string;
    categories: {
      id: string;
      name: string;
      icon: any;
      description: string;
    }[];
  };
}

const categoryData: CategoryData = {
  'wash-iron': {
    title: 'Wash & Iron Categories',
    categories: [
      { id: 'tops', name: 'Tops', icon: Shirt, description: 'Shirts, t-shirts, and blouses' },
      { id: 'bottoms', name: 'Bottoms', icon: Pants, description: 'Pants, shorts, and skirts' },
      { id: 'dresses', name: 'Dresses', icon: Dress, description: 'Dresses and jumpsuits' },
      { id: 'outerwear', name: 'Outerwear', icon: Coat, description: 'Jackets and coats' },
    ]
  },
  'dry-cleaning': {
    title: 'Dry Cleaning Categories',
    categories: [
      { id: 'formal', name: 'Business Wear', icon: Shirt, description: 'Suits and formal attire' },
      { id: 'delicate', name: 'Delicate Items', icon: Dress, description: 'Silk and wool garments' },
      { id: 'outerwear', name: 'Outerwear', icon: Coat, description: 'Winter coats and jackets' },
    ]
  },
  'repairs': {
    title: 'Repair Services',
    categories: [
      { id: 'basic', name: 'Basic Repairs', icon: Shirt, description: 'Buttons and small fixes' },
      { id: 'advanced', name: 'Advanced Repairs', icon: Pants, description: 'Zippers and major alterations' },
    ]
  },
  'easy-bag': {
    title: 'Easy Bag Options',
    categories: [
      { id: 'small', name: 'Small Bag', icon: Shirt, description: 'Up to 6kg of laundry' },
      { id: 'medium', name: 'Medium Bag', icon: Shirt, description: 'Up to 12kg of laundry' },
      { id: 'large', name: 'Large Bag', icon: Shirt, description: 'Up to 18kg of laundry' },
    ]
  }
};

const CategorySelection: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const service = location.state?.service || 'wash-iron';
  const { title, categories } = categoryData[service];

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Auto-progress after selection
    setTimeout(() => {
      navigate('/order/items', { 
        state: { 
          service,
          category: categoryId 
        } 
      });
    }, 300);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          <p className="text-lg text-gray-600">
            Select the category that matches your needs
          </p>
        </div>

        <div className="overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-w-[600px] md:min-w-0">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`w-full p-6 rounded-2xl text-left transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white hover:scale-[1.02] text-gray-900 shadow-md hover:shadow-lg'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-xl ${
                    selectedCategory === category.id ? 'bg-white/20' : 'bg-blue-100'
                  } flex items-center justify-center`}>
                    {React.createElement(category.icon, {
                      size: 24,
                      className: selectedCategory === category.id ? 'text-white' : 'text-blue-600'
                    })}
                  </div>
                  <h3 className="ml-4 text-xl font-bold">{category.name}</h3>
                </div>
                <p className={`text-base ${
                  selectedCategory === category.id ? 'text-white/90' : 'text-gray-600'
                }`}>
                  {category.description}
                </p>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-between">
          <motion.button
            onClick={() => navigate('/order/service')}
            className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Services
          </motion.button>

          <motion.button
            onClick={() => selectedCategory && navigate('/order/items', { 
              state: { 
                service,
                category: selectedCategory 
              } 
            })}
            className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              selectedCategory
                ? 'bg-blue-600 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            whileHover={selectedCategory ? { scale: 1.05 } : {}}
            whileTap={selectedCategory ? { scale: 0.95 } : {}}
            disabled={!selectedCategory}
          >
            Continue
            <ArrowRight className="w-5 h-5 ml-2" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default CategorySelection;