import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Download, ExternalLink, Mail } from 'lucide-react';

const Press: React.FC = () => {
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
            Press Center
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Get the latest news and updates about Eazyy's mission to revolutionize the laundry industry
          </motion.p>
        </div>

        {/* Press Contact */}
        <div className="bg-blue-600 rounded-2xl p-8 text-white mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Press Contact</h2>
              <p className="mb-4 md:mb-0">For press inquiries, please contact our media relations team</p>
            </div>
            <motion.a
              href="mailto:press@eazyy.app"
              className="flex items-center px-6 py-3 bg-white text-blue-600 rounded-xl font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Press Team
            </motion.a>
          </div>
        </div>

        {/* Content Placeholder */}
        <div className="text-center py-12">
          <p className="text-gray-600">Press releases and media coverage coming soon...</p>
        </div>

        {/* Brand Assets */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Brand Assets
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Logo Package', 'Brand Guidelines', 'Media Kit'].map((asset, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{asset}</h3>
                <p className="text-gray-600 mb-4">Coming soon...</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Press;