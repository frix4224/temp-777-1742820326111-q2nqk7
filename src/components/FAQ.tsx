import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [predictedQuestion, setPredictedQuestion] = useState('');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const faqs = [
    {
      question: "How does the pickup and delivery process work?",
      answer: "Our process is simple! Schedule a pickup through our app or website, and our team will arrive at your specified time. We'll collect your laundry, clean it according to your preferences, and deliver it back to you at your chosen time slot. You'll receive real-time notifications throughout the process."
    },
    {
      question: "What happens if I miss my pickup or delivery?",
      answer: "No worries! If you miss a pickup or delivery, you can reschedule in the app. Additional fees may apply for repeated missed appointments."
    },
    {
      question: "How long does the service take?",
      answer: "Our standard turnaround time is 24-48 hours. We also offer express service with same-day return for an additional fee. The exact timing depends on your location and the service selected. You can track the status of your order in real-time through our app."
    },
    {
      question: "What cleaning products do you use?",
      answer: "We use eco-friendly, hypoallergenic cleaning products that are gentle on fabrics but tough on stains. Our detergents are phosphate-free and biodegradable. We also offer fragrance-free options for customers with sensitivities. All our products are certified environmentally safe."
    },
    {
      question: "Do you offer special handling for delicate items?",
      answer: "Yes, we provide special handling for delicate fabrics, including silk, cashmere, and wool. These items receive gentle cleaning with appropriate temperature settings and specialized detergents. Please mark these items or notify us when scheduling your pickup."
    },
    {
      question: "Is there a minimum order requirement?",
      answer: "No, we do not have any minimum order requirements. You can send us any amount of laundry you need cleaned, and we'll take care of it with the same high-quality service."
    }
  ];

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (searchTerm.length > 3) {
      const lowerSearch = searchTerm.toLowerCase();
      
      if (lowerSearch.includes('price') || lowerSearch.includes('cost')) {
        setPredictedQuestion("What are your pricing options?");
      } else if (lowerSearch.includes('time') || lowerSearch.includes('long') || lowerSearch.includes('fast')) {
        setPredictedQuestion("How long does the service take?");
      } else if (lowerSearch.includes('pickup') || lowerSearch.includes('deliver')) {
        setPredictedQuestion("How does the pickup and delivery process work?");
      } else if (lowerSearch.includes('product') || lowerSearch.includes('clean') || lowerSearch.includes('detergent')) {
        setPredictedQuestion("What cleaning products do you use?");
      } else {
        setPredictedQuestion("");
      }
    } else {
      setPredictedQuestion("");
    }
  }, [searchTerm]);

  return (
    <section 
      ref={ref}
      className="py-12 sm:py-24 bg-gradient-to-b from-blue-100 to-white"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            Find answers to common questions about our services
          </p>
        </motion.div>
        
        <motion.div 
          className="relative mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for answers..."
              className="w-full p-3 sm:p-4 pl-10 sm:pl-12 pr-4 rounded-xl border border-gray-300 focus:border-blue-700 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300 text-base sm:text-lg"
            />
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          
          <AnimatePresence>
            {predictedQuestion && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-100"
              >
                <p className="text-sm text-gray-600 mb-1">Did you mean:</p>
                <button 
                  onClick={() => {
                    setSearchTerm("");
                    const questionIndex = faqs.findIndex(faq => faq.question === predictedQuestion);
                    if (questionIndex !== -1) {
                      setOpenIndex(questionIndex);
                    }
                  }}
                  className="text-blue-700 font-medium text-sm hover:underline"
                >
                  {predictedQuestion}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        <div className="space-y-3 sm:space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const actualIndex = faqs.findIndex(item => item.question === faq.question);
              return (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                >
                  <FAQItem 
                    question={faq.question} 
                    answer={faq.answer} 
                    isOpen={openIndex === actualIndex}
                    toggleOpen={() => toggleQuestion(actualIndex)}
                  />
                </motion.div>
              );
            })
          ) : (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-500 text-lg">No matching questions found. Try a different search term.</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, toggleOpen }) => {
  return (
    <motion.div 
      className={`border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 ${
        isOpen ? "shadow-md" : "hover:shadow-sm"
      }`}
      layout
    >
      <motion.button
        onClick={toggleOpen}
        className="w-full p-4 sm:p-5 flex justify-between items-center text-left bg-white"
        whileHover={{ backgroundColor: "#f9fafb" }}
        whileTap={{ scale: 0.995 }}
      >
        <span className="font-medium text-gray-900 text-base sm:text-lg pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-700 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 flex-shrink-0" />
        )}
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-100">
              <p className="text-gray-600 text-base sm:text-lg">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FAQ;