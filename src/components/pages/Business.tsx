import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Building2, Calendar, Clock, CreditCard, Users, Headphones, Package, ArrowRight, CheckCircle2, Star } from 'lucide-react';

const Business: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Building2,
      title: "Tailored Solutions",
      description: "Custom laundry packages designed for your business needs",
      color: "bg-blue-600",
      lightColor: "bg-blue-50"
    },
    {
      icon: Clock,
      title: "Priority Service",
      description: "Dedicated pickup slots and faster turnaround times",
      color: "bg-purple-600",
      lightColor: "bg-purple-50"
    },
    {
      icon: CreditCard,
      title: "Flexible Billing",
      description: "Monthly invoicing and automated payment options",
      color: "bg-emerald-600",
      lightColor: "bg-emerald-50"
    },
    {
      icon: Users,
      title: "Team Management",
      description: "Multiple user accounts for your staff members",
      color: "bg-amber-600",
      lightColor: "bg-amber-50"
    }
  ];

  const packages = [
    {
      name: "Hotel Package",
      description: "Perfect for hotels and hospitality businesses",
      price: "Custom",
      features: [
        "Bedding & Linen Service",
        "Guest Laundry Processing",
        "Staff Uniform Cleaning",
        "24/7 Priority Support",
        "Same-Day Service Available",
        "Monthly Billing"
      ],
      popular: true
    },
    {
      name: "Restaurant Package",
      description: "Tailored for restaurants and catering services",
      price: "Custom",
      features: [
        "Table Linen Service",
        "Kitchen Textile Cleaning",
        "Staff Uniform Service",
        "Priority Support",
        "Next-Day Service",
        "Monthly Billing"
      ]
    },
    {
      name: "Gym Package",
      description: "Designed for fitness centers and spas",
      price: "Custom",
      features: [
        "Towel Service",
        "Gym Equipment Cleaning",
        "Staff Uniform Service",
        "Priority Support",
        "Daily Pickup Available",
        "Monthly Billing"
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Eazyy Business Solutions
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Professional laundry services tailored for businesses. Streamline your operations with our dedicated B2B solutions.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.button
              onClick={() => navigate('/business/register')}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
            <motion.button
              onClick={() => navigate('/business/contact')}
              className="w-full sm:w-auto px-8 py-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-300 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Sales
              <Headphones className="w-5 h-5 ml-2" />
            </motion.button>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={`${feature.lightColor} rounded-2xl p-6`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            >
              <div className={`${feature.color} w-14 h-14 rounded-xl flex items-center justify-center text-white mb-4`}>
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Packages */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Business Packages</h2>
            <p className="text-lg text-gray-600">Choose the perfect package for your business</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                className={`bg-white rounded-2xl shadow-lg p-8 relative ${
                  pkg.popular ? 'border-2 border-blue-500' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
              >
                {pkg.popular && (
                  <div className="absolute top-4 right-4">
                    <Star className="w-6 h-6 text-blue-500 fill-blue-500" />
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <p className="text-gray-600 mb-6">{pkg.description}</p>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-gray-900">{pkg.price}</span>
                  <span className="text-gray-600 ml-2">/ month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  onClick={() => navigate('/business/contact')}
                  className="w-full py-4 bg-blue-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Quote
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          className="bg-blue-600 rounded-2xl p-8 text-white text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses that trust Eazyy with their laundry needs. Get started today and experience the difference.
          </p>
          <motion.button
            onClick={() => navigate('/business/register')}
            className="px-8 py-4 bg-white text-blue-600 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Free Trial
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Business;