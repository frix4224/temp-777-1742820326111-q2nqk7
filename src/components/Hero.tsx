import React from 'react';
import { motion } from 'framer-motion';
import { Download, Smartphone, Check, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-white"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {/* Soft wave patterns */}
        <div className="absolute inset-0 opacity-5">
          <svg viewBox="0 0 1440 320" className="w-full h-full absolute bottom-0">
            <path fill="rgba(59, 130, 246, 0.3)" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
          <svg viewBox="0 0 1440 320" className="w-full h-full absolute bottom-0" style={{transform: 'translateY(20%)'}}>
            <path fill="rgba(59, 130, 246, 0.2)" fillOpacity="1" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,144C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        
        {/* Floating bubbles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500 opacity-5"
            style={{
              width: Math.random() * 80 + 40,
              height: Math.random() * 80 + 40,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0.05, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center">
        {/* Left side - Text content */}
        <motion.div
          className="md:w-1/2 text-center md:text-left mb-12 md:mb-0 lg:pr-12 xl:pr-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Clean laundry without effort
          </h1>
          
          <motion.div 
            className="text-xl lg:text-2xl max-w-xl lg:max-w-2xl mb-8 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="font-medium"><span className="text-blue-600">Always</span> <span className="text-gray-800">freshly washed</span></span>
            <span className="font-medium"><span className="text-blue-600">Always</span> <span className="text-gray-800">picked up & delivered for free</span></span>
            <span className="font-medium"><span className="text-blue-600">Always</span> <span className="text-gray-800">effortlessly clean</span></span>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.a
              href="https://apps.apple.com/nl/app/eazyy/id6739165274"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-[#000000] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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

            <motion.a
              href="https://play.google.com/store/apps/details?id=com.eazyy.app&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-[#000000] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <motion.button
              onClick={() => navigate('/order/service')}
              className="w-full sm:w-auto px-8 py-4 bg-[#2563eb] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Schedule a Pickup
            </motion.button>
          </motion.div>
          
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <div className="flex items-center">
              <Check className="w-5 h-5 mr-2 text-green-500" />
              <span>Free Pickup & Delivery</span>
            </div>
            <div className="flex items-center">
              <Check className="w-5 h-5 mr-2 text-green-500" />
              <span>24-Hour Turnaround</span>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Right side - Phone mockup */}
        <motion.div 
          className="md:w-1/2 flex justify-center mx-auto md:mx-0 scale-110 md:scale-125 lg:scale-135"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative">
            <motion.div 
              className="relative w-[300px] h-[600px] bg-black rounded-[45px] p-3 shadow-2xl overflow-hidden"
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              {/* Dynamic Island */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-b-[20px] z-20" />
              
              {/* Screen */}
              <div className="w-full h-full bg-white rounded-[40px] overflow-hidden flex items-center justify-center relative">
                {/* Status Bar */}
                <div className="absolute top-0 left-0 right-0 h-10 flex items-center justify-between px-5 z-10">
                  <div className="text-gray-800 text-sm font-medium">17:43</div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <div className="h-3 w-1 bg-gray-500 rounded-sm"></div>
                      <div className="h-4 w-1 bg-gray-500 rounded-sm"></div>
                      <div className="h-5 w-1 bg-gray-500 rounded-sm"></div>
                      <div className="h-3 w-1 bg-gray-500 rounded-sm"></div>
                    </div>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 9L12 2L23 9V20C23 20.5304 22.7893 21.0391 22.4142 21.4142C22.0391 21.7893 21.5304 22 21 22H3C2.46957 22 1.96086 21.7893 1.58579 21.4142C1.21071 21.0391 1 20.5304 1 20V9Z" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div className="flex items-center space-x-1">
                      <div className="text-gray-800 text-xs">68</div>
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="4" y="6" width="16" height="12" rx="2" stroke="#4B5563" strokeWidth="2"/>
                        <path d="M7 10V14" stroke="#4B5563" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M11 8V16" stroke="#4B5563" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M15 10V14" stroke="#4B5563" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* App Content */}
                <div className="relative w-full h-full pt-14 pb-8 flex flex-col">
                  {/* User greeting */}
                  <div className="px-6 pt-4 pb-6 flex justify-between items-center">
                    <div>
                      <h2 className="text-3xl font-medium text-blue-700">Hello</h2>
                      <p className="text-xl text-blue-600">Sat 01 Mar</p>
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-blue-600 flex items-center justify-center">
                      <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Services section */}
                  <div className="px-6">
                    <h3 className="text-3xl font-medium text-blue-700 mb-4">Services</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {/* Service Card 1 */}
                      <div className="bg-white rounded-xl border border-blue-200 overflow-hidden">
                        <div className="flex flex-col items-center py-4">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                            <svg className="w-8 h-8 text-blue-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M6 9.5V15L12 18L18 15V9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <text x="9" y="14" fill="currentColor" fontSize="4" fontWeight="bold">6 KG</text>
                            </svg>
                          </div>
                          <h4 className="text-blue-600 text-lg font-medium text-center">Eazyy Bag</h4>
                          <p className="text-blue-600 text-xs text-center">For washing and folding</p>
                        </div>
                      </div>
                      
                      {/* Service Card 2 */}
                      <div className="bg-white rounded-xl border border-blue-200 overflow-hidden">
                        <div className="flex flex-col items-center py-4">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                            <svg className="w-8 h-8 text-blue-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M4 10H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                              <path d="M4 14H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                              <path d="M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                          </div>
                          <h4 className="text-blue-600 text-lg font-medium text-center">Wash</h4>
                          <p className="text-blue-600 text-xs text-center">Light and dark clothes washed together</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom navigation */}
                  <div className="mt-auto">
                    <div className="bg-blue-700 py-4 px-6 flex justify-between items-center">
                      <div className="text-white text-2xl font-bold">Cart</div>
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    <div className="h-1 w-32 bg-gray-300 rounded-full mx-auto mt-2"></div>
                  </div>
                </div>
              </div>
              
              {/* Side buttons */}
              <div className="absolute top-[120px] -right-[2px] w-[2px] h-10 bg-gray-700 rounded-l-sm" />
              <div className="absolute top-[150px] -right-[2px] w-[2px] h-14 bg-gray-700 rounded-l-sm" />
              <div className="absolute top-[120px] -left-[2px] w-[2px] h-10 bg-gray-700 rounded-r-sm" />
            </motion.div>
            
            {/* Floating elements */}
            <motion.div 
              className="absolute -top-8 -right-8 w-16 h-16 bg-blue-500 rounded-full opacity-10"
              animate={{ 
                y: [0, -20, 0],
                x: [0, 10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute -bottom-10 -left-10 w-20 h-20 bg-purple-500 rounded-full opacity-10"
              animate={{ 
                y: [0, 20, 0],
                x: [0, -10, 0],
                scale: [1, 1.3, 1]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 1
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;