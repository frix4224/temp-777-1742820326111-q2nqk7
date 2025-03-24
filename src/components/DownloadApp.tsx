import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Smartphone, Check, Star } from 'lucide-react';
import Logo from './Logo';

const DownloadApp: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.3, 1, 1, 0.3]);
  
  return (
    <section 
      id="download" 
      ref={containerRef}
      className="py-12 sm:py-24 bg-gradient-to-b from-white to-blue-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div 
            ref={ref}
            className="lg:w-1/2 xl:w-3/5 mb-12 lg:mb-0 lg:pr-8 xl:pr-16 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Download the <Logo size="medium" className="inline-block mx-2" /> App Today
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8">
              Join thousands of happy customers who have simplified their laundry routine. Our app makes it easy to:
            </p>
            
            <div className="space-y-3 sm:space-y-4 mb-8 text-base sm:text-lg">
              <FeatureItem text="Schedule pickups with just a few taps" />
              <FeatureItem text="Track your laundry's status in real-time" />
              <FeatureItem text="Manage payments and view history" />
              <FeatureItem text="Set preferences for how your clothes are cleaned" />
              <FeatureItem text="Rate your experience and provide feedback" />
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <AppStoreButton />
              <PlayStoreButton />
            </div>
          </motion.div>
          
          <div className="lg:w-1/2 xl:w-2/5 flex justify-center">
            <motion.div 
              className="relative scale-90 sm:scale-100 lg:scale-110 xl:scale-125"
              style={{ y, opacity }}
            >
              <div className="relative w-64 h-[500px] bg-gradient-to-b from-blue-600 to-blue-400 rounded-[40px] p-3 shadow-2xl">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-black rounded-b-2xl" />
                <div className="w-full h-full bg-white rounded-[32px] overflow-hidden flex items-center justify-center">
                  <div className="relative w-full h-full bg-blue-50 flex flex-col">
                    <div className="h-16 bg-blue-600 flex items-center justify-center">
                      <Smartphone className="text-white mr-2" />
                      <Logo size="small" color="white" />
                    </div>
                    
                    <div className="flex-1 p-4 flex flex-col items-center">
                      <motion.div 
                        className="w-full h-32 bg-white rounded-lg shadow-md mb-4 flex items-center justify-center"
                        animate={{ 
                          y: [0, 5, 0],
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut"
                        }}
                      >
                        <div className="text-center">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Smartphone className="text-blue-600 w-6 h-6" />
                          </div>
                          <p className="text-sm text-gray-700">Schedule Pickup</p>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="w-full h-32 bg-white rounded-lg shadow-md mb-4 flex items-center justify-center"
                        animate={{ 
                          y: [0, 5, 0],
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut",
                          delay: 0.5
                        }}
                      >
                        <div className="text-center">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Check className="text-green-600 w-6 h-6" />
                          </div>
                          <p className="text-sm text-gray-700">Track Order</p>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="w-full h-32 bg-white rounded-lg shadow-md flex items-center justify-center"
                        animate={{ 
                          y: [0, 5, 0],
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut",
                          delay: 1
                        }}
                      >
                        <div className="text-center">
                          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Star className="text-yellow-600 w-6 h-6" />
                          </div>
                          <p className="text-sm text-gray-700">Rate Service</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* App store badges floating */}
              <motion.div 
                className="absolute -top-12 -right-20 bg-white p-3 rounded-xl shadow-lg hidden sm:block"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [-2, 2, -2]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                  alt="Download on App Store" 
                  className="h-8"
                />
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-12 -left-20 bg-white p-3 rounded-xl shadow-lg hidden sm:block"
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [2, -2, 2]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                  alt="Get it on Google Play" 
                  className="h-8"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureItem: React.FC<{text: string}> = ({ text }) => {
  return (
    <div className="flex items-start">
      <div className="mt-1 mr-3 flex-shrink-0">
        <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
          <Check className="w-3 h-3 text-blue-600" />
        </div>
      </div>
      <p className="text-gray-700">{text}</p>
    </div>
  );
};

const AppStoreButton: React.FC = () => {
  return (
    <motion.a
      href="https://apps.apple.com/nl/app/eazyy/id6739165274"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center px-6 py-3 bg-black rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div>
        <div className="flex items-center justify-center">
          <svg className="w-7 h-7 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.0349 12.5C17.0171 9.58008 19.4574 8.12305 19.5698 8.05664C18.1748 6.05566 16.0317 5.85938 15.2771 5.84766C13.4614 5.66016 11.7029 6.92578 10.7771 6.92578C9.83301 6.92578 8.40137 5.86523 6.86621 5.89453C4.85254 5.92383 2.98926 7.07617 1.98535 8.88477C-0.0771484 12.5469 1.48926 18.0234 3.45801 21.0059C4.44629 22.4688 5.59277 24.1211 7.10254 24.0645C8.57715 24.002 9.13379 23.1211 10.9083 23.1211C12.6651 23.1211 13.1865 24.0645 14.7317 24.0293C16.3242 24.002 17.3164 22.5391 18.2695 21.0645C19.4102 19.3711 19.8848 17.7139 19.9024 17.6279C19.8672 17.6162 17.0583 16.5352 17.0349 12.5Z" fill="white"/>
            <path d="M14.5781 3.75977C15.3857 2.77148 15.9189 1.41602 15.7598 0.0371094C14.6201 0.0839844 13.2295 0.820312 12.3867 1.78516C11.6377 2.64258 10.9951 4.04492 11.1719 5.37695C12.4453 5.46875 13.7354 4.73047 14.5781 3.75977Z" fill="white"/>
          </svg>
          <div>
            <div className="text-xs">Download on the</div>
            <div className="text-sm font-semibold">App Store</div>
          </div>
        </div>
      </div>
    </motion.a>
  );
};

const PlayStoreButton: React.FC = () => {
  return (
    <motion.a
      href="https://play.google.com/store/apps/details?id=com.eazyy.app&pcampaignid=web_share"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center px-6 py-3 bg-black rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div>
        <div className="flex items-center justify-center">
          <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.9236 8.23227C15.1356 6.67287 10.6607 4.16885 3.71978 0.282486C3.25183 -0.0265614 2.71342 -0.0670615 2.24823 0.090392L14.1569 11.999L17.9236 8.23227Z" fill="#32BBFF"/>
            <path d="M2.24824 0.090332C2.16105 0.119863 2.07621 0.155488 1.99507 0.197207C1.48137 0.461473 1.10388 1.00516 1.10388 1.68549V22.3122C1.10388 22.9925 1.48132 23.5363 1.99507 23.8005C2.07607 23.8423 2.16092 23.8779 2.24796 23.9073L14.1568 11.999L2.24824 0.090332Z" fill="#32BBFF"/>
            <path d="M14.1569 11.999L2.24799 23.9073C2.71331 24.0648 3.25172 24.0244 3.71982 23.7152C10.451 19.9461 14.8754 17.472 17.6957 15.8993C17.7742 15.8552 17.8512 15.8121 17.9272 15.7698L14.1569 11.999Z" fill="#32BBFF"/>
            <path d="M1.10388 11.999V22.3122C1.10388 22.9925 1.48132 23.5363 1.99507 23.8005C2.07607 23.8423 2.16092 23.8779 2.24796 23.9073L14.1568 11.999H1.10388Z" fill="#2C9FD9"/>
            <path d="M3.71978 0.282486C3.25183 -0.0265614 2.71342 -0.0670615 2.24823 0.090392L14.1569 11.999L17.9236 8.23227C15.1356 6.67287 10.6607 4.16885 3.71978 0.282486Z" fill="#29CC5E"/>
            <path d="M3.71982 23.7152C10.451 19.9461 14.8754 17.472 17.6957 15.8993C17.7742 15.8552 17.8512 15.8121 17.9272 15.7698L14.1569 11.999L2.24799 23.9073C2.71331 24.0648 3.25172 24.0244 3.71982 23.7152Z" fill="#D93F21"/>
            <path d="M22.8961 11.9989C22.8961 11.4275 22.6078 10.8509 22.0363 10.5311C22.0363 10.5311 20.9676 9.93479 17.6919 8.0987L14.1569 11.999L17.9272 15.7698C20.9617 13.9949 22.0363 13.3926 22.0363 13.3926C22.6078 13.0729 22.8961 12.5704 22.8961 11.9989Z" fill="#FFD500"/>
            <path d="M22.0363 13.3926C22.6078 13.0729 22.8961 12.5704 22.8961 11.9989C22.8961 11.4275 22.6078 10.8509 22.0363 10.5311L14.1569 11.999L22.0363 13.3926Z" fill="#FFAA00"/>
          </svg>
          <div>
            <div className="text-xs">GET IT ON</div>
            <div className="text-sm font-semibold">Google Play</div>
          </div>
        </div>
      </div>
    </motion.a>
  );
};

export default DownloadApp;