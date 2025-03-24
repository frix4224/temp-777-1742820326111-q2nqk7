import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Ruler } from 'lucide-react';

const CarpetCleaning: React.FC = () => {
  const navigate = useNavigate();
  const [length, setLength] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  const PRICE_PER_SQM = 12.99;

  useEffect(() => {
    const area = length * width;
    setPrice(area * PRICE_PER_SQM);
  }, [length, width]);

  const handleInputChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setter(numValue);
    }
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
            Carpet Cleaning
          </h1>
          <p className="text-lg text-gray-600">
            Enter your carpet dimensions for an instant price calculation
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row gap-6 mb-8">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Length (meters)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={length || ''}
                  onChange={(e) => handleInputChange(e.target.value, setLength)}
                  min="0"
                  step="0.1"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300"
                  placeholder="Enter length"
                />
                <Ruler className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Width (meters)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={width || ''}
                  onChange={(e) => handleInputChange(e.target.value, setWidth)}
                  min="0"
                  step="0.1"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300"
                  placeholder="Enter width"
                />
                <Ruler className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Area</span>
              <span className="font-medium text-gray-900">
                {(length * width).toFixed(2)} m²
              </span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Price per m²</span>
              <span className="font-medium text-gray-900">
                ${PRICE_PER_SQM.toFixed(2)}
              </span>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-900">
                  Total Price
                </span>
                <span className="text-2xl font-bold text-blue-600">
                  ${price.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <motion.button
            onClick={() => navigate('/order/items')}
            className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </motion.button>

          <motion.button
            onClick={() => navigate('/order/schedule')}
            className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              length > 0 && width > 0
                ? 'bg-blue-600 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            whileHover={length > 0 && width > 0 ? { scale: 1.05 } : {}}
            whileTap={length > 0 && width > 0 ? { scale: 0.95 } : {}}
            disabled={length === 0 || width === 0}
          >
            Continue
            <ArrowRight className="w-5 h-5 ml-2" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default CarpetCleaning;