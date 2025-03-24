import React from 'react';
import { motion } from 'framer-motion';
import { Package, Shirt, Wind, Scissors, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Services: React.FC = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 'wash',
      icon: Package,
      title: 'Eazyy Bag',
      description: 'Professional washing and folding service for your everyday laundry needs.',
      price: 'From €2,99/item',
      color: 'bg-blue-600',
      lightColor: 'bg-blue-50'
    },
    {
      id: 'iron',
      icon: Shirt,
      title: 'Wash & Iron',
      description: 'Complete laundry service with professional pressing for a crisp finish.',
      price: 'From €4,99/item',
      color: 'bg-purple-600',
      lightColor: 'bg-purple-50'
    },
    {
      id: 'dry-cleaning',
      icon: Wind,
      title: 'Dry Cleaning',
      description: 'Expert dry cleaning for delicate garments and special care items.',
      price: 'From €9,99/item',
      color: 'bg-emerald-600',
      lightColor: 'bg-emerald-50'
    },
    {
      id: 'repairs',
      icon: Scissors,
      title: 'Repairs & Alterations',
      description: 'Professional mending and alteration services for your garments.',
      price: 'From €6,99/item',
      color: 'bg-amber-600',
      lightColor: 'bg-amber-50'
    }
  ];

  const features = [
    'Free Pickup & Delivery',
    'Same-Day Service Available',
    'Real-Time Order Tracking',
    'Eco-Friendly Products',
    'Professional Handling',
    'Satisfaction Guaranteed'
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Services
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Professional laundry services tailored to your needs
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            >
              <div className={`${service.lightColor} p-6`}>
                <div className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center text-white mb-6`}>
                  {React.createElement(service.icon, { size: 28 })}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h2>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 font-medium">{service.price}</span>
                  <motion.button
                    onClick={() => navigate('/order/service')}
                    className={`flex items-center px-4 py-2 ${service.color} text-white rounded-xl`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Book Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <motion.div 
          className="bg-blue-600 rounded-2xl p-8 text-white mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Our Services?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-3" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Experience the convenience of professional laundry services.
          </p>
          <motion.button
            onClick={() => navigate('/order/service')}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Schedule a Pickup
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;