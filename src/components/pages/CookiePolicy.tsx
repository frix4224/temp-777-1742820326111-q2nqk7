import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cookie, Shield, Settings, Info, Check, X } from 'lucide-react';

interface CookieCategory {
  id: string;
  name: string;
  description: string;
  required: boolean;
  enabled: boolean;
}

const CookiePolicy: React.FC = () => {
  const [cookiePreferences, setCookiePreferences] = useState<{ [key: string]: boolean }>({
    necessary: true,
    functional: true,
    analytics: false,
    marketing: false
  });

  const cookieCategories: CookieCategory[] = [
    {
      id: 'necessary',
      name: 'Necessary Cookies',
      description: 'Essential cookies that enable basic functionality and security features of the website.',
      required: true,
      enabled: true
    },
    {
      id: 'functional',
      name: 'Functional Cookies',
      description: 'Cookies that enhance functionality and personalization, such as remembering your preferences.',
      required: false,
      enabled: cookiePreferences.functional
    },
    {
      id: 'analytics',
      name: 'Analytics Cookies',
      description: 'Cookies that help us understand how visitors interact with our website.',
      required: false,
      enabled: cookiePreferences.analytics
    },
    {
      id: 'marketing',
      name: 'Marketing Cookies',
      description: 'Cookies used to track visitors across websites to display relevant advertisements.',
      required: false,
      enabled: cookiePreferences.marketing
    }
  ];

  const toggleCookie = (id: string) => {
    if (id === 'necessary') return; // Cannot toggle necessary cookies
    setCookiePreferences(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const savePreferences = () => {
    // Here you would typically save these preferences to your backend
    console.log('Saving preferences:', cookiePreferences);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-6">
            <Cookie className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cookie Policy
          </h1>
          <p className="text-lg text-gray-600">
            Last updated: March 1, 2024
          </p>
        </div>

        <div className="prose prose-lg max-w-none mb-8">
          <p className="text-gray-600">
            We use cookies and similar technologies to provide, protect, and improve our services.
            This policy explains how and why we use these technologies and the choices you have.
          </p>
        </div>

        {/* Cookie Manager */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Settings className="w-6 h-6 text-gray-400 mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Cookie Preferences</h2>
            </div>
            <motion.button
              onClick={savePreferences}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Save Preferences
            </motion.button>
          </div>

          <div className="space-y-6">
            {cookieCategories.map((category) => (
              <div
                key={category.id}
                className="flex items-start justify-between p-4 rounded-xl bg-gray-50"
              >
                <div className="flex-1 mr-4">
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {category.name}
                    </h3>
                    {category.required && (
                      <span className="ml-2 px-2 py-1 text-xs font-medium text-amber-700 bg-amber-100 rounded-full">
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">
                    {category.description}
                  </p>
                </div>
                <div className="flex items-center">
                  <motion.button
                    onClick={() => toggleCookie(category.id)}
                    className={`relative w-14 h-8 rounded-full transition-colors duration-200 ${
                      category.enabled ? 'bg-green-500' : 'bg-gray-300'
                    } ${category.required ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                    whileHover={!category.required ? { scale: 1.05 } : {}}
                    whileTap={!category.required ? { scale: 0.95 } : {}}
                    disabled={category.required}
                  >
                    <div
                      className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                        category.enabled ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </motion.button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Your Privacy</h3>
            </div>
            <p className="text-gray-600">
              We respect your right to privacy and give you control over your data.
              You can change your cookie preferences at any time.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Info className="w-6 h-6 text-purple-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Learn More</h3>
            </div>
            <p className="text-gray-600">
              Visit our{' '}
              <a href="/privacy" className="text-blue-600 hover:text-blue-700">
                Privacy Policy
              </a>
              {' '}to learn more about how we protect your data.
            </p>
          </div>
        </div>

        {/* Third-Party Cookies */}
        <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Third-Party Cookies
          </h2>
          <p className="text-gray-600 mb-6">
            Some of our pages may contain content from other sites, which may set their own cookies.
            These sites are:
          </p>
          <ul className="space-y-3">
            {[
              'Google Analytics - For website analytics',
              'Stripe - For payment processing',
              'Intercom - For customer support chat',
              'Facebook - For social features and marketing'
            ].map((service, index) => (
              <li key={index} className="flex items-center text-gray-600">
                <div className="w-2 h-2 bg-amber-600 rounded-full mr-3" />
                {service}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;