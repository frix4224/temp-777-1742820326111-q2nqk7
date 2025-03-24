import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  role: string;
  image: string;
  content: string;
  rating: number;
  date: string;
}

const reviews: Review[] = [
  {
    id: '1',
    author: 'Sarah Johnson',
    role: 'Regular Customer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&q=80',
    content: 'Eazyy has completely transformed my weekly routine. The quality of service is exceptional, and the app makes everything so convenient!',
    rating: 5,
    date: 'March 2024'
  },
  {
    id: '2',
    author: 'Michael Chen',
    role: 'Business Professional',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&q=80',
    content: 'As someone with a busy schedule, Eazyy is a lifesaver. The pickup and delivery are always on time, and my clothes come back perfectly clean.',
    rating: 5,
    date: 'February 2024'
  },
  {
    id: '3',
    author: 'Emma Rodriguez',
    role: 'Parent',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=128&q=80',
    content: 'The eco-friendly approach and attention to detail make Eazyy stand out. My family\'s laundry has never been in better hands.',
    rating: 5,
    date: 'January 2024'
  }
];

const Reviews: React.FC = () => {
  const [currentReview, setCurrentReview] = useState(0);

  const nextReview = () => {
    setCurrentReview((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real experiences from people who have transformed their laundry routine with Eazyy
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-lg p-8 relative"
            >
              <Quote className="absolute top-8 left-8 w-12 h-12 text-blue-100" />
              
              <div className="flex flex-col md:flex-row items-center text-center md:text-left">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-blue-100">
                    <img 
                      src={reviews[currentReview].image}
                      alt={reviews[currentReview].author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-center md:justify-start mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-6 h-6 ${
                          i < reviews[currentReview].rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  
                  <blockquote className="text-xl md:text-2xl text-gray-700 italic mb-6">
                    "{reviews[currentReview].content}"
                  </blockquote>
                  
                  <div>
                    <p className="font-semibold text-gray-900 text-lg md:text-xl">
                      {reviews[currentReview].author}
                    </p>
                    <p className="text-gray-500">{reviews[currentReview].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-8 space-x-4">
            <motion.button
              onClick={prevReview}
              className="p-3 rounded-full bg-white shadow-lg text-gray-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
            
            <div className="flex items-center space-x-2">
              {reviews.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentReview === index ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
            
            <motion.button
              onClick={nextReview}
              className="p-3 rounded-full bg-white shadow-lg text-gray-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;