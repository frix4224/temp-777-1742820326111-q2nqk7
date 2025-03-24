import React from 'react';
import { motion } from 'framer-motion';
import { Package, Users, Building2, TrendingUp } from 'lucide-react';
import AdminLayout from './AdminLayout';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: "Total Orders",
      value: "486",
      change: "+12%",
      icon: Package,
      color: "bg-blue-600",
      lightColor: "bg-blue-50"
    },
    {
      title: "Active Users",
      value: "2,486",
      change: "+8%",
      icon: Users,
      color: "bg-green-600",
      lightColor: "bg-green-50"
    },
    {
      title: "Business Partners",
      value: "48",
      change: "+2%",
      icon: Building2,
      color: "bg-purple-600",
      lightColor: "bg-purple-50"
    },
    {
      title: "Revenue",
      value: "€24,486",
      change: "+18%",
      icon: TrendingUp,
      color: "bg-amber-600",
      lightColor: "bg-amber-50"
    }
  ];

  return (
    <AdminLayout activeTab="dashboard">
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Overview of your business metrics</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              className={`${stat.lightColor} rounded-2xl p-6`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center text-white`}>
                  <stat.icon size={24} />
                </div>
                <span className="text-sm font-medium text-green-600">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Content Placeholder */}
        <div className="text-center py-12">
          <p className="text-gray-600">Dashboard content coming soon...</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;