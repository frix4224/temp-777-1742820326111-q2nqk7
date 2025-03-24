import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Package, Shirt, Wind, Scissors, ArrowRight } from 'lucide-react';

const services = [
  {
    id: 'easy-bag',
    name: 'Eazyy Bag',
    icon: Package,
    description: 'Weight-based washing perfect for regular laundry',
    color: 'bg-blue-600',
    lightColor: 'bg-blue-50'
  },
  {
    id: 'wash-iron',
    name: 'Wash & Iron',
    icon: Shirt,
    description: 'Professional cleaning and pressing for individual items',
    color: 'bg-purple-600',
    lightColor: 'bg-purple-50'
  },
  {
    id: 'dry-cleaning',
    name: 'Dry Cleaning',
    icon: Wind,
    description: 'Specialized cleaning for delicate garments',
    color: 'bg-emerald-600',
    lightColor: 'bg-emerald-50'
  },
  {
    id: 'repairs',
    name: 'Repairs',
    icon: Scissors,
    description: 'Expert mending and alterations services',
    color: 'bg-amber-600',
    lightColor: 'bg-amber-50'
  }
];

const WhatEazyyOffers: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 sm:py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-8 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
            What Eazyy Offers
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our premium laundry services tailored to your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${service.lightColor} rounded-2xl p-6`}
            >
              <div className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                <service.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <motion.button
                onClick={() => navigate(`/order/items/${service.id}`)}
                className="text-blue-600 font-medium flex items-center hover:text-blue-700"
                whileHover={{ x: 5 }}
              >
                Learn More
                <ArrowRight className="w-5 h-5 ml-1" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatEazyyOffers;