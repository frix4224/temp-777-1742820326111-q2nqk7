import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Package, Calendar, Clock, CreditCard, ChevronRight, ArrowRight, TrendingUp, Users, Bell, FileText, Settings } from 'lucide-react';

const BusinessDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: "Active Orders",
      value: "12",
      change: "+2",
      trend: "up",
      icon: Package,
      color: "bg-blue-600",
      lightColor: "bg-blue-50"
    },
    {
      title: "Monthly Volume",
      value: "486 kg",
      change: "+12%",
      trend: "up",
      icon: TrendingUp,
      color: "bg-green-600",
      lightColor: "bg-green-50"
    },
    {
      title: "Team Members",
      value: "8",
      change: "+1",
      trend: "up",
      icon: Users,
      color: "bg-purple-600",
      lightColor: "bg-purple-50"
    },
    {
      title: "Next Pickup",
      value: "Today",
      time: "17:00",
      icon: Clock,
      color: "bg-amber-600",
      lightColor: "bg-amber-50"
    }
  ];

  const recentOrders = [
    {
      id: "ORD-2024-001",
      status: "Processing",
      items: "24 items",
      pickup: "Mar 12, 17:00",
      delivery: "Mar 13, 17:00"
    },
    {
      id: "ORD-2024-002",
      status: "Scheduled",
      items: "36 items",
      pickup: "Mar 13, 17:00",
      delivery: "Mar 14, 17:00"
    },
    {
      id: "ORD-2024-003",
      status: "Completed",
      items: "18 items",
      pickup: "Mar 11, 17:00",
      delivery: "Mar 12, 17:00"
    }
  ];

  const notifications = [
    {
      id: 1,
      title: "Order Ready for Pickup",
      message: "Order #ORD-2024-001 is ready for pickup",
      time: "5 min ago",
      type: "info"
    },
    {
      id: 2,
      title: "New Team Member Added",
      message: "Sarah Johnson has been added to your team",
      time: "1 hour ago",
      type: "success"
    },
    {
      id: 3,
      title: "Monthly Report Available",
      message: "Your February 2024 report is now available",
      time: "2 hours ago",
      type: "info"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'bg-blue-100 text-blue-700';
      case 'scheduled':
        return 'bg-purple-100 text-purple-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Business Dashboard
            </h1>
            <p className="text-gray-600">
              Welcome back, Hotel Metropolis
            </p>
          </div>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <motion.button
              onClick={() => navigate('/business/schedule')}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Pickup
            </motion.button>
            <motion.button
              className="p-2 rounded-xl bg-gray-100 text-gray-600 relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </motion.button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <motion.div
              key={stat.title}
              className={`${stat.lightColor} rounded-2xl p-6`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center text-white`}>
                  <stat.icon size={24} />
                </div>
                {stat.change && (
                  <span className={`text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                )}
              </div>
              <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
              <div className="flex items-baseline">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                {stat.time && (
                  <span className="ml-2 text-gray-600">{stat.time}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                <motion.button
                  onClick={() => navigate('/business/orders')}
                  className="text-blue-600 font-medium flex items-center"
                  whileHover={{ x: 5 }}
                >
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </motion.button>
              </div>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <motion.div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-medium text-gray-900">{order.id}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">{order.items}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Pickup: {order.pickup}</div>
                      <div className="text-sm text-gray-600">Delivery: {order.delivery}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
                <motion.button
                  className="text-blue-600 font-medium flex items-center"
                  whileHover={{ x: 5 }}
                >
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </motion.button>
              </div>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    className="p-4 bg-gray-50 rounded-xl"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-medium text-gray-900">{notification.title}</h3>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {[
            { icon: FileText, title: 'View Reports', link: '/business/reports' },
            { icon: CreditCard, title: 'Billing & Invoices', link: '/business/billing' },
            { icon: Users, title: 'Team Management', link: '/business/team' },
            { icon: Settings, title: 'Account Settings', link: '/business/settings' }
          ].map((action) => (
            <motion.button
              key={action.title}
              onClick={() => navigate(action.link)}
              className="flex items-center p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <action.icon className="w-6 h-6 text-blue-600 mr-3" />
              <span className="font-medium text-gray-900">{action.title}</span>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;