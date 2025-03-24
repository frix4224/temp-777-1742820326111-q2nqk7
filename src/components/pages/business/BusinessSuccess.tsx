import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2, Calendar, ArrowRight, Download, Clock, Mail, Phone } from 'lucide-react';

interface LocationState {
  companyName: string;
  contactName: string;
  email: string;
}

const BusinessSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

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
            Thank You for Your Interest!
          </h1>
          <p className="text-lg text-gray-600">
            We've received your business registration request and will be in touch soon.
          </p>
        </motion.div>

        {/* Company Details */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Registration Details</h2>
          <div className="space-y-4 text-gray-600">
            <p><span className="font-medium text-gray-900">Company:</span> {state?.companyName}</p>
            <p><span className="font-medium text-gray-900">Contact Person:</span> {state?.contactName}</p>
            <p><span className="font-medium text-gray-900">Email:</span> {state?.email}</p>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">What Happens Next?</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Initial Review
                </h3>
                <p className="text-gray-600">
                  Our team will review your registration within 24 hours
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Consultation Call
                </h3>
                <p className="text-gray-600">
                  A dedicated account manager will contact you to discuss your needs in detail
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Custom Proposal
                </h3>
                <p className="text-gray-600">
                  You'll receive a tailored service proposal based on your requirements
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          className="bg-blue-50 rounded-2xl p-6 sm:p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Need Immediate Assistance?</h2>
          <div className="space-y-3 text-gray-600">
            <p>• Call us at: <a href="tel:+31626076881" className="text-blue-600">+31 6 26076881</a></p>
            <p>• Email: <a href="mailto:business@eazyy.app" className="text-blue-600">business@eazyy.app</a></p>
            <p>• Business hours: Mon-Fri, 9:00 AM - 6:00 PM CET</p>
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