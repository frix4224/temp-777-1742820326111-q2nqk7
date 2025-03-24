import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Calendar, ArrowRight, Download } from 'lucide-react';

const BusinessSuccess: React.FC = () => {
  const navigate = useNavigate();

  const nextSteps = [
    {
      title: "Schedule Onboarding Call",
      description: "Meet with your dedicated account manager to discuss your needs",
      icon: Calendar,
      action: "Schedule Now",
      link: "/business/schedule"
    },
    {
      title: "Download Resources",
      description: "Access your welcome pack and business integration guide",
      icon: Download,
      action: "Download Pack",
      link: "/business/resources"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Registration Successful!
          </h1>
          <p className="text-lg text-gray-600">
            Welcome to Eazyy Business Solutions. We're excited to have you on board!
          </p>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Next Steps</h2>
          <div className="space-y-6">
            {nextSteps.map((step, index) => (
              <motion.div
                key={step.title}
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  {React.createElement(step.icon, {
                    className: "w-6 h-6 text-blue-600"
                  })}
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {step.description}
                  </p>
                  <motion.button
                    onClick={() => navigate(step.link)}
                    className="flex items-center text-blue-600 font-medium hover:text-blue-700"
                    whileHover={{ x: 5 }}
                  >
                    {step.action}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Account Details */}
        <motion.div
          className="bg-blue-50 rounded-2xl p-6 sm:p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Important Information</h2>
          <div className="space-y-3 text-gray-600">
            <p>• Check your email for login credentials</p>
            <p>• Your account manager will contact you within 24 hours</p>
            <p>• Access your business dashboard to manage services</p>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.button
            onClick={() => navigate('/business/dashboard')}
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Go to Dashboard
          </motion.button>
          <motion.button
            onClick={() => navigate('/business')}
            className="w-full sm:w-auto px-8 py-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Business Home
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default BusinessSuccess;