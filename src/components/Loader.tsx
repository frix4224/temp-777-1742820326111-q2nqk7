import React from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <motion.div 
        className="flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          rotate: [0, 10, -10, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        <Logo size="large" color="#2563eb" />
        <div className="mt-8 flex space-x-2">
          <motion.div
            className="w-3 h-3 bg-blue-600 rounded-full"
            animate={{
              y: [0, -10, 0],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0
            }}
          />
          <motion.div
            className="w-3 h-3 bg-blue-600 rounded-full"
            animate={{
              y: [0, -10, 0],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0.2
            }}
          />
          <motion.div
            className="w-3 h-3 bg-blue-600 rounded-full"
            animate={{
              y: [0, -10, 0],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0.4
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Loader