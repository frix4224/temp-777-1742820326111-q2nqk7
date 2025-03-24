import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Heart, Award, Building2, Globe2 } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      title: "Customer First",
      description: "We prioritize our customers' needs and satisfaction above all else. Every decision we make is guided by how it will benefit and improve the experience for our customers.",
      icon: Heart,
      color: "blue"
    },
    {
      title: "Quality Focus",
      description: "We maintain the highest standards in our services, from the cleaning products we use to the training of our staff. Excellence is not just a goal, it's our standard.",
      icon: Award,
      color: "blue"
    },
    {
      title: "Sustainability",
      description: "We're committed to environmentally responsible practices, using eco-friendly products and processes to minimize our environmental impact while delivering exceptional results.",
      icon: Globe2,
      color: "blue"
    }
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
            About Eazyy
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            We're revolutionizing the laundry industry with technology and sustainability
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {['Happy Customers', 'Cities Served', 'Items Cleaned', 'Team Members'].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">--</div>
              <div className="text-gray-600">{stat}</div>
            </div>
          ))}
        </motion.div>

        {/* Mission */}
        <motion.div 
          className="bg-blue-600 rounded-2xl p-8 text-white mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-white/90">
              To revolutionize the laundry industry by providing convenient, eco-friendly, and technology-driven cleaning services that give people more time for what matters most in their lives.
            </p>
          </div>
        </motion.div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  {React.createElement(value.icon, {
                    className: "w-6 h-6 text-blue-600"
                  })}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Locations */}
        <motion.div 
          className="bg-gray-50 rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center justify-center mb-6">
            <Building2 className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Our Locations</h2>
          </div>
          <div className="text-center">
            <p className="text-gray-600">Currently serving Amsterdam, Rotterdam, and Utrecht</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;