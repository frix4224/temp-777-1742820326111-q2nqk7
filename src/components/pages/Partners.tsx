import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Heart, Award, Building2, Globe2, ExternalLink } from 'lucide-react';

const Partners: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Partner with Eazyy
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Join our network of successful partners and grow your business with us
          </motion.p>
        </div>

        {/* Partner Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: 'Property Partners',
              description: 'Hotels, apartments, and residential complexes looking to offer premium laundry services.'
            },
            {
              title: 'Business Partners',
              description: 'Companies wanting to provide convenient laundry solutions for their employees.'
            },
            {
              title: 'Franchise Partners',
              description: 'Entrepreneurs ready to own and operate an Eazyy franchise location.'
            }
          ].map((type, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">{type.title}</h3>
              <p className="text-gray-600">{type.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Content Placeholder */}
        <div className="text-center py-12">
          <p className="text-gray-600">Partner success stories coming soon...</p>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our network of successful partners and start growing your business with Eazyy today.
          </p>
          <motion.a
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Become a Partner
            <ExternalLink className="w-5 h-5 ml-2" />
          </motion.a>
        </div>
      </div>
    </div>
  );
};

export default Partners;