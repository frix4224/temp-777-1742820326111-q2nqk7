import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Package, Truck, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const steps = [
    {
      icon: Calendar,
      title: "Schedule a Pickup",
      description: "Use our app to schedule a pickup at your convenience. Choose a time that works for you.",
      color: "bg-blue-700",
      illustration: <ScheduleAnimation />
    },
    {
      icon: Package,
      title: "We Collect Your Laundry",
      description: "Our professional team will arrive at your doorstep to collect your laundry items.",
      color: "bg-indigo-700",
      illustration: <CollectionAnimation />
    },
    {
      icon: Sparkles,
      title: "Professional Cleaning",
      description: "Your clothes are cleaned using eco-friendly products and state-of-the-art technology.",
      color: "bg-purple-700",
      illustration: <CleaningAnimation />
    },
    {
      icon: Truck,
      title: "Delivery to Your Door",
      description: "Clean, fresh laundry delivered back to you, folded and ready to wear.",
      color: "bg-cyan-700",
      illustration: <DeliveryVanAnimation />
    }
  ];

  const handleTouchStart = (e: React.TouchEvent) => {
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
      nextStep();
    } else if (isRightSwipe) {
      prevStep();
    }
  };

  const nextStep = () => setActiveStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
  const prevStep = () => setActiveStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1));

  return (
    <section 
      id="services" 
      ref={ref}
      className="py-12 sm:py-24 bg-gradient-to-b from-blue-100 to-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-8 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
            How It Works
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the simplicity of our laundry service in just a few steps
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
                key={activeStep}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <div className="bg-blue-50 rounded-xl p-6 mb-6 min-h-[300px] flex items-center justify-center">
                  {steps[activeStep].illustration}
                </div>
                
                <div className={`p-4 sm:p-6 rounded-xl ${steps[activeStep].color} text-white`}>
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/20 flex items-center justify-center">
                      {React.createElement(steps[activeStep].icon, { 
                        size: 24,
                        className: 'text-white'
                      })}
                    </div>
                    <h3 className="ml-3 text-lg sm:text-xl font-bold">{steps[activeStep].title}</h3>
                  </div>
                  <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                    {steps[activeStep].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between px-4">
            <motion.button
              onClick={prevStep}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous step"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    activeStep === index ? steps[index].color : 'bg-gray-300'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextStep}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next step"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-5 gap-8 max-w-6xl mx-auto">
          <div className="col-span-2">
            <div className="space-y-4">
              {steps.map((step, index) => (
                <motion.button
                  key={index}
                  className={`w-full p-6 rounded-xl text-left transition-all duration-300 ${
                    activeStep === index 
                      ? `${step.color} text-white shadow-lg` 
                      : 'bg-white hover:bg-gray-50 text-gray-800 shadow hover:shadow-md'
                  }`}
                  onClick={() => setActiveStep(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center mb-3">
                    <div className={`w-12 h-12 rounded-lg ${
                      activeStep === index ? 'bg-white/20' : step.color
                    } flex items-center justify-center`}>
                      {React.createElement(step.icon, { 
                        size: 24,
                        className: activeStep === index ? 'text-white' : 'text-white'
                      })}
                    </div>
                    <h3 className="ml-4 text-xl font-bold">{step.title}</h3>
                  </div>
                  <p className={activeStep === index ? 'text-white/90' : 'text-gray-600'}>
                    {step.description}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="col-span-3 bg-blue-50 rounded-xl p-8 flex items-center justify-center min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                className="w-full h-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
              >
                {steps[activeStep].illustration}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const ScheduleAnimation = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <motion.div 
      className="w-full max-w-[280px] sm:max-w-[320px] h-[400px] bg-white rounded-3xl shadow-xl overflow-hidden"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ 
        scale: 1,
        opacity: 1,
        y: [0, -10, 0],
        rotateZ: [0, 1, -1, 0]
      }}
      transition={{ 
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.div 
        className="h-16 bg-blue-700 flex items-center px-4"
        animate={{
          backgroundColor: ["#1d4ed8", "#2563eb", "#1d4ed8"]
        }}
        transition={{
          duration: 3,
          repeat: Infinity
        }}
      >
        <Calendar className="w-6 h-6 text-white mr-2" />
        <span className="text-white text-lg font-bold">Schedule Pickup</span>
      </motion.div>
      
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-7 gap-1">
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              className="w-full pt-[100%] bg-blue-100 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                repeat: Infinity
              }}
            />
          ))}
        </div>
        
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="h-12 bg-blue-50 rounded-lg"
            initial={{ x: -50, opacity: 0 }}
            animate={{
              x: [0, 5, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity
            }}
          />
        ))}
        
        <motion.button
          className="w-full h-12 bg-blue-600 text-white rounded-lg font-medium"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          animate={{
            scale: [1, 1.02, 1],
            boxShadow: [
              "0 0 0 rgba(37, 99, 235, 0)",
              "0 0 20px rgba(37, 99, 235, 0.3)",
              "0 0 0 rgba(37, 99, 235, 0)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        >
          Confirm Pickup
        </motion.button>
      </div>
    </motion.div>
  </div>
);

const CollectionAnimation = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <motion.div 
      className="relative"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        y: [0, -20, 0]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.div 
        className="w-32 h-32 sm:w-40 sm:h-40 bg-indigo-100 rounded-2xl relative overflow-hidden"
        animate={{
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.div 
          className="absolute inset-2 bg-indigo-200 rounded-xl"
          animate={{
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        />
        
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Package className="w-16 h-16 sm:w-20 sm:h-20 text-indigo-500" />
        </motion.div>
        
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-indigo-400 rounded-full"
            style={{
              top: `${50 + 45 * Math.sin((i * Math.PI) / 4)}%`,
              left: `${50 + 45 * Math.cos((i * Math.PI) / 4)}%`
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  </div>
);

const CleaningAnimation = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <motion.div 
      className="w-32 h-32 sm:w-40 sm:h-40 bg-purple-100 rounded-full flex items-center justify-center"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ 
        scale: 1,
        opacity: 1,
        rotate: [0, 360]
      }}
      transition={{ 
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <motion.div
        className="absolute w-full h-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-purple-400 rounded-full"
            style={{
              top: `${50 + 45 * Math.sin((i * Math.PI) / 4)}%`,
              left: `${50 + 45 * Math.cos((i * Math.PI) / 4)}%`
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity
            }}
          />
        ))}
      </motion.div>
      
      <motion.div
        animate={{
          rotate: [-360, 0],
          scale: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <Sparkles className="w-16 h-16 sm:w-20 sm:h-20 text-purple-500" />
      </motion.div>
    </motion.div>
  </div>
);

const DeliveryVanAnimation = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="relative w-full max-w-md h-64">
      {/* City Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-blue-100 via-blue-200 to-blue-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      
      {/* Buildings */}
      <div className="absolute bottom-24 left-0 right-0 flex justify-around">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-16 bg-gray-800 rounded-t-lg"
            style={{
              height: `${Math.random() * 60 + 40}px`,
              opacity: 0.8
            }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 0.8 }}
            transition={{ delay: i * 0.2, duration: 1 }}
          >
            {[...Array(Math.floor(Math.random() * 4 + 2))].map((_, j) => (
              <motion.div
                key={j}
                className="w-3 h-3 bg-yellow-300 rounded-sm m-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </motion.div>
        ))}
      </div>

      {/* Road */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-24 bg-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute top-1/2 left-0 right-0 h-2 flex justify-center gap-8"
          animate={{ x: [-100, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-8 h-full bg-yellow-400" />
          ))}
        </motion.div>
      </motion.div>

      {/* Delivery Van */}
      <motion.div
        className="absolute bottom-12 h-20"
        initial={{ x: "120%" }}
        animate={{ x: "-20%" }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <motion.div 
          className="relative w-32 h-16 bg-cyan-600 rounded-lg shadow-lg"
          animate={{ y: [0, -1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          <div className="absolute top-1 left-1 w-8 h-8 bg-cyan-800 rounded-sm" />
          
          <div className="absolute inset-y-2 left-12 right-2 bg-white rounded-sm flex items-center justify-center">
            <span className="text-cyan-700 font-bold">eazyy</span>
          </div>

          <motion.div
            className="absolute -bottom-2 left-4 w-6 h-6 bg-gray-800 rounded-full border-4 border-gray-600"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -bottom-2 right-4 w-6 h-6 bg-gray-800 rounded-full border-4 border-gray-600"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Headlight Glow */}
        <motion.div 
          className="absolute bottom-4 right-0 w-8 h-8 bg-yellow-300 rounded-full opacity-20 blur-lg"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.div>
    </div>
  </div>
);

export default HowItWorks;