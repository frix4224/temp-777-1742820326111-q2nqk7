import React, { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Info, DollarSign, MessageSquare, Menu, X, ChevronRight, User, Mail, Package, ShoppingBag, Building2, LogOut, AlertTriangle } from 'lucide-react';
import Logo from './Logo';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  scrollY: number;
}

const Header: React.FC<HeaderProps> = ({ scrollY }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const controls = useAnimation();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile, signOut } = useAuth();

  useEffect(() => {
    // Header animation based on scroll
    if (scrollY > 50) {
      controls.start({
        backgroundColor: 'rgba(37, 99, 235, 0.98)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        height: '80px',
      });
    } else {
      controls.start({
        backgroundColor: 'rgba(37, 99, 235, 0.98)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0)',
        height: '100px',
      });
    }
  }, [scrollY, controls]);

  const handleNavigation = (path: string) => {
    setIsOpen(false);
    setShowProfileMenu(false);
    setShowSignOutConfirm(false);
    navigate(path);
  };

  const handleSignOutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowSignOutConfirm(true);
    setShowProfileMenu(false);
  };

  const handleSignOutConfirm = async () => {
    try {
      await signOut();
      setShowSignOutConfirm(false);
      setShowProfileMenu(false);
      setIsOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const mainNavItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'services', label: 'Services', path: '/services' },
    { id: 'about', label: 'About', path: '/about' },
    { id: 'contact', label: 'Contact', path: '/contact' }
  ];

  const profileMenuItems = [
    { label: 'Profile', icon: User, path: '/account/profile' },
    { label: 'Orders', icon: Package, path: '/account/orders' },
    { label: 'Settings', icon: DollarSign, path: '/account/settings' }
  ];

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 transition-all duration-300"
        animate={controls}
        initial={{ backgroundColor: 'rgba(37, 99, 235, 0.98)', height: '100px' }}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between h-full">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            onClick={() => handleNavigation('/')}
            style={{ cursor: 'pointer' }}
          >
            <Logo size="medium" color="#ffffff" />
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {mainNavItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`relative px-3 py-2 text-lg font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'text-white'
                    : 'text-white/90 hover:text-white'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"
                    layoutId="activeNav"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}

            <motion.button
              onClick={() => handleNavigation('/business')}
              className="flex items-center px-4 py-2 bg-white text-blue-600 rounded-xl font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Building2 className="w-5 h-5 mr-2" />
              For Business
            </motion.button>

            <div className="flex items-center space-x-4 ml-4">
              <motion.button
                onClick={() => handleNavigation('/order/service')}
                className="flex items-center px-6 py-3 bg-white text-blue-600 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                <span>Order Now</span>
              </motion.button>

              {user ? (
                <div className="relative">
                  <motion.button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center px-4 py-3 text-white hover:bg-white/10 rounded-full text-lg font-medium transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <User className="w-5 h-5 mr-2" />
                    <span>{profile?.first_name || 'Account'}</span>
                  </motion.button>

                  <AnimatePresence>
                    {showProfileMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50"
                      >
                        {profileMenuItems.map((item) => (
                          <motion.button
                            key={item.label}
                            onClick={() => handleNavigation(item.path)}
                            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                            whileHover={{ x: 5 }}
                          >
                            <item.icon className="w-4 h-4 mr-2" />
                            {item.label}
                          </motion.button>
                        ))}
                        <div className="border-t border-gray-100 my-1" />
                        <motion.button
                          onClick={handleSignOutClick}
                          className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100"
                          whileHover={{ x: 5 }}
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.button
                  onClick={() => handleNavigation('/login')}
                  className="flex items-center px-4 py-3 text-white hover:bg-white/10 rounded-full text-lg font-medium transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <User className="w-5 h-5 mr-2" />
                  <span>Sign In</span>
                </motion.button>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden fixed top-6 right-4 z-50 w-12 h-12 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-lg"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 top-0 bg-blue-600 z-40 md:hidden"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <div className="flex flex-col h-full p-6 pt-24">
              <div className="space-y-2">
                {mainNavItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl text-xl font-medium ${
                      location.pathname === item.path
                        ? 'bg-white/20 text-white'
                        : 'text-white/90 hover:bg-white/10'
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.label}
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                ))}

                <motion.button
                  onClick={() => handleNavigation('/business')}
                  className="w-full flex items-center justify-between p-4 rounded-xl text-xl font-medium bg-white text-blue-600"
                  whileTap={{ scale: 0.98 }}
                >
                  For Business
                  <Building2 className="w-5 h-5" />
                </motion.button>

                <motion.button
                  onClick={() => handleNavigation('/order/service')}
                  className="w-full flex items-center justify-between p-4 rounded-xl text-xl font-medium bg-white text-blue-600"
                  whileTap={{ scale: 0.98 }}
                >
                  Order Now
                  <ShoppingBag className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="mt-auto">
                {user ? (
                  <div className="space-y-2">
                    {profileMenuItems.map((item) => (
                      <motion.button
                        key={item.label}
                        onClick={() => handleNavigation(item.path)}
                        className="w-full flex items-center justify-between p-4 rounded-xl text-xl font-medium bg-white/10 text-white"
                        whileTap={{ scale: 0.98 }}
                      >
                        {item.label}
                        <item.icon className="w-5 h-5" />
                      </motion.button>
                    ))}
                    <motion.button
                      onClick={handleSignOutClick}
                      className="w-full flex items-center justify-between p-4 rounded-xl text-xl font-medium bg-white/10 text-white"
                      whileTap={{ scale: 0.98 }}
                    >
                      Sign Out
                      <LogOut className="w-5 h-5" />
                    </motion.button>
                  </div>
                ) : (
                  <motion.button
                    onClick={() => handleNavigation('/login')}
                    className="w-full py-4 bg-white/10 text-white rounded-xl text-xl font-medium flex items-center justify-center"
                    whileTap={{ scale: 0.98 }}
                  >
                    <User className="w-5 h-5 mr-2" />
                    Sign In
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sign Out Confirmation Dialog */}
      <AnimatePresence>
        {showSignOutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowSignOutConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 ml-4">
                  Sign Out
                </h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                Are you sure you want to sign out? You'll need to sign in again to access your account.
              </p>

              <div className="flex justify-end space-x-4">
                <motion.button
                  onClick={() => setShowSignOutConfirm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleSignOutConfirm}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign Out
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;