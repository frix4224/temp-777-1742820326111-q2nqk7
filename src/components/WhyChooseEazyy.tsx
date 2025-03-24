import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Clock, Leaf, MapPin, Star, ArrowLeft, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Instant Service Estimation",
    description: "Get real-time pricing and time estimates based on your laundry needs.",
    color: "bg-blue-700",
    lightColor: "bg-blue-50",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Processing",
    description: "We use sustainable practices and environmentally friendly cleaning products.",
    color: "bg-green-700",
    lightColor: "bg-green-50",
  },
  {
    icon: MapPin,
    title: "Live Delivery Tracking",
    description: "Track your laundry's journey in real-time from pickup to delivery.",
    color: "bg-purple-700",
    lightColor: "bg-purple-50",
  },
  {
    icon: Star,
    title: "Premium Quality",
    description: "Experience the difference with our premium cleaning techniques and attention to detail.",
    color: "bg-amber-700",
    lightColor: "bg-amber-50",
  },
];

const WhyChooseEazyy: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    if (isAutoPlaying) {
      setCurrentSlide((prev) => (prev === features.length - 1 ? 0 : prev + 1));
    }
  }, [isAutoPlaying]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsAutoPlaying(false);
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev === features.length - 1 ? 0 : prev + 1));
    } else if (isRightSwipe) {
      setCurrentSlide((prev) => (prev === 0 ? features.length - 1 : prev - 1));
    }
    
    // Resume auto-play after 5 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  return (
    <section 
      id="services" 
      ref={ref} 
      className="py-12 sm:py-24 bg-gradient-to-b from-white to-blue-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-8 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
            Why Choose Eazyy?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of laundry services with our innovative features
          </p>
        </motion.div>

        {/* Mobile View */}
        <div className="lg:hidden">
          <div 
            className="relative overflow-hidden touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className={`${features[currentSlide].lightColor} rounded-xl p-6 sm:p-8 mx-auto max-w-sm`}
              >
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className={`${features[currentSlide].color} w-14 h-14 rounded-xl flex items-center justify-center text-white mb-6`}>
                    {React.createElement(features[currentSlide].icon, { 
                      size: 28,
                      className: "text-white"
                    })}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {features[currentSlide].title}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {features[currentSlide].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between mt-8 px-4">
            <motion.button
              onClick={() => {
                setIsAutoPlaying(false);
                prevSlide();
                setTimeout(() => setIsAutoPlaying(true), 5000);
              }}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous feature"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>

            <div className="flex space-x-3">
              {features.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentSlide(index);
                    setTimeout(() => setIsAutoPlaying(true), 5000);
                  }}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    currentSlide === index ? features[index].color : 'bg-gray-300'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Go to feature ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={() => {
                setIsAutoPlaying(false);
                nextSlide();
                setTimeout(() => setIsAutoPlaying(true), 5000);
              }}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next feature"
            >
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`${feature.lightColor} rounded-xl p-1`}
            >
              <motion.div
                className="bg-white rounded-xl shadow-lg p-6 sm:p-8 h-full hover:shadow-xl transition-shadow duration-300"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className={`${feature.color} w-14 h-14 rounded-xl flex items-center justify-center text-white mb-6`}>
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseEazyy;