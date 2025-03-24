import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { UserRound, DoorOpen, Building2, ArrowLeft, ArrowRight, Info } from 'lucide-react';

interface DeliveryOption {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  instructions?: string[];
}

const deliveryOptions: DeliveryOption[] = [
  {
    id: 'in-person',
    title: 'Receive in Person',
    description: 'Hand-delivered directly to you',
    icon: UserRound,
    instructions: [
      'We\'ll call you when we arrive',
      'Please be available during the delivery window',
      'Have your order ID ready'
    ]
  },
  {
    id: 'door',
    title: 'Leave at the Door',
    description: 'Contactless delivery at your doorstep',
    icon: DoorOpen,
    instructions: [
      'We\'ll send a photo confirmation',
      'Ensure your address is accurate',
      'Provide any gate/entry codes if needed'
    ]
  },
  {
    id: 'reception',
    title: 'Drop off at Reception',
    description: 'Leave with building reception/concierge',
    icon: Building2,
    instructions: [
      'Available for apartments and offices',
      'We\'ll get a signature from reception',
      'Include your unit/office number'
    ]
  }
];

const DeliveryPreferences: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [specialInstructions, setSpecialInstructions] = useState('');

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
            Delivery Preferences
          </h1>
          <p className="text-lg text-gray-600">
            Choose how you'd like to receive your order
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {deliveryOptions.map((option) => (
            <motion.button
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={`w-full text-left transition-all duration-300 ${
                selectedOption === option.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white hover:bg-gray-50'
              } rounded-2xl shadow-lg overflow-hidden`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="p-6">
                <div className={`w-12 h-12 rounded-xl ${
                  selectedOption === option.id ? 'bg-white/20' : 'bg-blue-100'
                } flex items-center justify-center mb-4`}>
                  {React.createElement(option.icon, {
                    size: 24,
                    className: selectedOption === option.id ? 'text-white' : 'text-blue-600'
                  })}
                </div>
                <h3 className="text-lg font-bold mb-2">{option.title}</h3>
                <p className={`text-sm ${
                  selectedOption === option.id ? 'text-white/90' : 'text-gray-600'
                }`}>
                  {option.description}
                </p>
              </div>

              {selectedOption === option.id && option.instructions && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-blue-700 px-6 py-4"
                >
                  <ul className="space-y-2">
                    {option.instructions.map((instruction, index) => (
                      <li key={index} className="flex items-start text-sm text-white/90">
                        <Info className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        {instruction}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Special Instructions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Special Instructions (Optional)
          </label>
          <textarea
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            placeholder="Add any special delivery instructions here..."
            className="w-full h-32 px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300"
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <motion.button
            onClick={() => navigate('/order/schedule')}
            className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </motion.button>

          <motion.button
            onClick={() => navigate('/order/confirmation')}
            className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              selectedOption
                ? 'bg-blue-600 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            whileHover={selectedOption ? { scale: 1.05 } : {}}
            whileTap={selectedOption ? { scale: 0.95 } : {}}
            disabled={!selectedOption}
          >
            Continue
            <ArrowRight className="w-5 h-5 ml-2" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default DeliveryPreferences;