import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Mail, ArrowRight, Check } from 'lucide-react';

const DeleteRequest: React.FC = () => {
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Request Submitted Successfully
            </h2>
            <p className="text-gray-600 mb-6">
              We've received your account deletion request. You will receive an email with further instructions within 24 hours.
            </p>
            <p className="text-sm text-gray-500">
              If you change your mind, you can cancel the deletion request by logging into your account within the next 30 days.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Request Account Deletion
          </h1>
          <p className="text-lg text-gray-600">
            We're sorry to see you go. Please review the information below before proceeding.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-amber-600 mt-1 mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-amber-800 mb-2">
                Important Information
              </h3>
              <ul className="text-amber-700 space-y-2">
                <li>• Account deletion is permanent and cannot be undone</li>
                <li>• All your data will be permanently erased</li>
                <li>• Active orders will still be processed</li>
                <li>• Unused credits will be forfeited</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200 transition-all duration-300"
                  placeholder="Enter your account email"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Deletion (Optional)
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200 transition-all duration-300"
                rows={4}
                placeholder="Please let us know why you're leaving..."
              />
            </div>

            <div className="mb-8">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  required
                  className="mt-1 rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className="ml-3 text-sm text-gray-600">
                  I understand that this action is permanent and cannot be undone. All my data will be
                  permanently deleted from the platform.
                </span>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600">
                <Shield className="w-5 h-5 text-gray-400 mr-2" />
                GDPR Compliant
              </div>

              <motion.button
                type="submit"
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  confirmed && email
                    ? 'bg-red-600 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                whileHover={confirmed && email ? { scale: 1.05 } : {}}
                whileTap={confirmed && email ? { scale: 0.95 } : {}}
                disabled={!confirmed || !email}
              >
                Request Deletion
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.button>
            </div>
          </form>
        </div>

        <div className="text-center text-sm text-gray-500">
          Need help? Contact our{' '}
          <a href="/support" className="text-blue-600 hover:text-blue-700">
            support team
          </a>
        </div>
      </div>
    </div>
  );
};

export default DeleteRequest;