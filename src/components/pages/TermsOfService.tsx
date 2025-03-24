import React from 'react';
import { motion } from 'framer-motion';
import { Scale, FileText, AlertTriangle, ShieldCheck, Wallet, HelpCircle, Mail, Phone, MapPin } from 'lucide-react';

const TermsOfService: React.FC = () => {
  const sections = [
    {
      id: 'use',
      icon: FileText,
      title: 'Use of Our Services',
      content: [
        {
          subtitle: 'Eligibility',
          items: [
            'You must be at least 18 years old to use our services.',
            'By using our services, you confirm that you have the legal authority to enter into this agreement.'
          ]
        },
        {
          subtitle: 'User Account',
          items: [
            'You are responsible for maintaining the confidentiality of your account credentials.',
            'You agree to provide accurate and complete information when creating an account.',
            'Any unauthorized use of your account should be reported immediately to Eazyy.'
          ]
        },
        {
          subtitle: 'Prohibited Activities',
          items: [
            'Using our services for fraudulent or illegal activities.',
            'Impersonating others or providing false information.',
            'Attempting to disrupt or harm our platform, services, or other users.',
            'Violating any applicable laws or regulations.'
          ]
        }
      ]
    },
    {
      id: 'service',
      icon: Scale,
      title: 'Service Terms',
      content: [
        {
          subtitle: 'Orders and Payments',
          items: [
            'By placing an order, you agree to provide accurate billing and payment details.',
            'Payments are processed securely through authorized third-party payment processors.',
            'All transactions are final, and refunds are subject to our discretion.'
          ]
        },
        {
          subtitle: 'Service Availability',
          items: [
            'We strive to provide uninterrupted services, but we do not guarantee availability at all times.',
            'We reserve the right to modify, suspend, or discontinue services without prior notice.'
          ]
        },
        {
          subtitle: 'Pricing & Fees',
          items: [
            'Prices for services are displayed on our platform and may be subject to change.',
            'Additional fees may apply for special requests, expedited services, or third-party processing.'
          ]
        }
      ]
    },
    {
      id: 'cancellations',
      icon: AlertTriangle,
      title: 'Cancellations and Refunds',
      content: [
        {
          items: [
            'Orders may be canceled within a specified timeframe, as indicated on our platform.',
            'Refunds, if applicable, will be processed according to our refund policy.',
            'We reserve the right to refuse refunds for services already rendered.'
          ]
        }
      ]
    },
    {
      id: 'liability',
      icon: ShieldCheck,
      title: 'Limitation of Liability',
      content: [
        {
          items: [
            'Eazyy is not liable for any indirect, incidental, or consequential damages arising from the use of our services.',
            'We are not responsible for delays, interruptions, or service failures due to circumstances beyond our control.',
            'Our total liability for any claim shall not exceed the amount paid for the disputed service.'
          ]
        }
      ]
    },
    {
      id: 'responsibilities',
      icon: Wallet,
      title: 'User Responsibilities',
      content: [
        {
          items: [
            'You agree to comply with all applicable laws while using our services.',
            'You are responsible for safeguarding your account information and notifying us of any unauthorized access.',
            'You acknowledge that your use of our services is at your own risk.'
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-6">
            <Scale className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600">
            Last updated: March 1, 2024
          </p>
        </div>

        <div className="prose prose-lg max-w-none mb-8">
          <p className="text-gray-600">
            Welcome to Eazyy! These Terms and Conditions ("Terms") govern your access to and use of our website, 
            mobile application, and services. By using Eazyy, you agree to comply with these Terms. 
            If you do not agree, please refrain from using our services.
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-6 sm:p-8"
            >
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                  {React.createElement(section.icon, {
                    className: "w-6 h-6 text-purple-600"
                  })}
                </div>
                <div className="ml-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    {section.title}
                  </h2>
                  <div className="space-y-6">
                    {section.content.map((subsection, index) => (
                      <div key={index}>
                        {subsection.subtitle && (
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {subsection.subtitle}
                          </h3>
                        )}
                        <ul className="space-y-2">
                          {subsection.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start text-gray-600">
                              <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-purple-50 rounded-2xl p-6 sm:p-8">
          <div className="flex items-start">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
              <HelpCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Contact Us
              </h2>
              <p className="text-gray-600 mb-4">
                If you have any questions or concerns regarding these Terms, please contact us:
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <Mail className="w-5 h-5 text-purple-600 mr-3" />
                  info@eazyy.app
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 text-purple-600 mr-3" />
                  +31 626076881
                </li>
                <li className="flex items-center">
                  <MapPin className="w-5 h-5 text-purple-600 mr-3" />
                  Argonweg 34, 1362AB Almere
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            By using Eazyy, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;