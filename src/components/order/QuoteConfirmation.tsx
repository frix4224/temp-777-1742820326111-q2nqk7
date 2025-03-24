import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, Clock, Mail, Bell } from 'lucide-react';

interface LocationState {
  message: string;
  requestId: string;
}

const QuoteConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Quote Request Submitted!
          </h1>

          <p className="text-gray-600 mb-8">
            {state?.message || "We've received your request and will get back to you soon."}
          </p>

          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-blue-600 mr-2" />
              <span className="text-blue-900 font-medium">What happens next?</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                <p className="text-left text-blue-800">
                  You'll receive an email with your custom price quote within 2 hours
                </p>
              </div>
              <div className="flex items-start">
                <Bell className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                <p className="text-left text-blue-800">
                  We'll also send you a notification when your quote is ready
                </p>
              </div>
            </div>
          </div>

          {state?.requestId && (
            <p className="text-sm text-gray-500 mb-8">
              Request ID: {state.requestId}
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              onClick={() => navigate('/account/quotes')}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Quotes
            </motion.button>

            <motion.button
              onClick={() => navigate('/')}
              className="w-full sm:w-auto px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Home
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuoteConfirmation;