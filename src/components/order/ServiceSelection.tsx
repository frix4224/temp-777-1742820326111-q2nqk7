import React from 'react';
import { motion } from 'framer-motion';
import { Package, Shirt, Wind, Scissors, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    id: 'easy-bag',
    icon: Package,
    title: 'Regular Laundry',
    description: 'Professional washing and drying',
    price: 9.99,
    unit: 'per kg',
    color: 'bg-blue-600',
    lightColor: 'bg-blue-50',
    route: '/order/items/easy-bag'
  },
  {
    id: 'wash-iron',
    icon: Shirt,
    title: 'Wash and Iron',
    description: 'Wash and ironing laundry',
    price: 5.00,
    unit: 'per kg',
    color: 'bg-purple-600',
    lightColor: 'bg-purple-50',
    route: '/order/items/wash-iron'
  },
  {
    id: 'dry-cleaning',
    icon: Wind,
    title: 'Dry Cleaning',
    description: 'Expert care for delicate items',
    price: 14.99,
    unit: 'per item',
    color: 'bg-emerald-600',
    lightColor: 'bg-emerald-50',
    route: '/order/items/dry-cleaning'
  },
  {
    id: 'repairs',
    icon: Scissors,
    title: 'Repairs & Alterations',
    description: 'Custom fits and repairs',
    price: 19.99,
    unit: 'per service',
    color: 'bg-amber-600',
    lightColor: 'bg-amber-50',
    route: '/order/items/repairs'
  }
];

const ServiceSelection: React.FC = () => {
  const navigate = useNavigate();

  const handleServiceSelect = (route: string) => {
    navigate(route);
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
            Choose a Service
          </h1>
          <p className="text-lg text-gray-600">
            Select the service that best fits your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <motion.div
              key={service.id}
              onClick={() => handleServiceSelect(service.route)}
              className={`${service.lightColor} rounded-2xl p-6 shadow hover:shadow-lg cursor-pointer transition-all duration-300`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center text-white`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>

              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-lg font-bold text-gray-900">
                    From €{service.price.toFixed(2)}
                  </span>
                  <span className="ml-2 text-sm text-gray-600">
                    {service.unit}
                  </span>
                </div>
                <motion.div
                  className={`${service.color} text-white px-3 py-1 rounded-lg flex items-center`}
                  whileHover={{ x: 5 }}
                >
                  <span className="text-sm font-medium mr-1">Select</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-between">
          <motion.button
            onClick={() => navigate('/')}
            className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Home
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ServiceSelection;