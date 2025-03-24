import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Volume2, VolumeX, ArrowLeft, ArrowRight, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Busy Professional",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      quote: "Eazyy has completely transformed my weekly routine. I no longer stress about laundry day, and the quality of service is exceptional!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Entrepreneur",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      quote: "As someone who's always on the go, Eazyy has been a game-changer. The app is intuitive, and the delivery is always on time.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Parent of Three",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      quote: "With three kids, laundry used to take up my entire weekend. Now with Eazyy, I have more time to spend with my family. The eco-friendly options are a huge plus!",
      rating: 4
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const speakTestimonial = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    
    const testimonial = testimonials[currentTestimonial];
    const utterance = new SpeechSynthesisUtterance(
      `${testimonial.quote} - ${testimonial.name}, ${testimonial.role}`
    );
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <section 
      ref={ref}
      className="py-24 bg-gradient-to-b from-blue-100 to-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto">
            Hear from people who have transformed their laundry experience with Eazyy
          </p>
        </motion.div>
        
        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-8 md:p-12 relative"
            >
              <Quote className="absolute top-8 left-8 w-12 h-12 text-blue-100 opacity-50" />
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-blue-100">
                    <img 
                      src={testimonials[currentTestimonial].image} 
                      alt={testimonials[currentTestimonial].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 md:w-6 md:h-6 ${
                          i < testimonials[currentTestimonial].rating 
                            ? "text-yellow-400 fill-yellow-400" 
                            : "text-gray-300"
                        }`} 
                      />
                    ))}
                  </div>
                  
                  <blockquote className="text-xl md:text-2xl text-gray-700 italic mb-6">
                    "{testimonials[currentTestimonial].quote}"
                  </blockquote>
                  
                  <div>
                    <p className="font-semibold text-gray-900 text-lg md:text-xl">{testimonials[currentTestimonial].name}</p>
                    <p className="text-gray-500">{testimonials[currentTestimonial].role}</p>
                  </div>
                </div>
              </div>
              
              <motion.button
                onClick={speakTestimonial}
                className={`absolute bottom-4 right-4 p-3 rounded-full ${
                  isSpeaking ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-700"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={isSpeaking ? "Stop speaking" : "Listen to testimonial"}
              >
                {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </motion.button>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-center mt-8 space-x-4">
            <motion.button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-blue-100 text-blue-700"
              whileHover={{ scale: 1.1, backgroundColor: "#dbeafe" }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
            </motion.button>
            
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setCurrentTestimonial(index);
                    if (isSpeaking) {
                      window.speechSynthesis.cancel();
                      setIsSpeaking(false);
                    }
                  }}
                  className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${
                    currentTestimonial === index ? "bg-blue-700" : "bg-blue-200"
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
            
            <motion.button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-blue-100 text-blue-700"
              whileHover={{ scale: 1.1, backgroundColor: "#dbeafe" }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;