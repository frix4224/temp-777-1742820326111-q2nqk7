import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Settings, 
  LogOut,
  Building2,
  FileText,
  CreditCard
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeTab }) => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'businesses', label: 'Businesses', icon: Building2 },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => navigate(`/admin/${tab.id}`)}
                    className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {React.createElement(tab.icon, {
                      className: 'w-5 h-5 mr-3'
                    })}
                    {tab.label}
                  </motion.button>
                ))}

                <motion.button
                  onClick={handleSignOut}
                  className="w-full flex items-center px-4 py-3 rounded-xl text-left text-red-600 hover:bg-red-50 transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Sign Out
                </motion.button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 min-h-[500px]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;