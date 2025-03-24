import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Database, Share2, Lock, Eye, Clock, Mail, Phone, MapPin } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  const sections = [
    {
      id: 'collection',
      icon: Database,
      title: 'Information We Collect',
      content: [
        {
          subtitle: 'Personal Information',
          items: [
            'Full name',
            'Contact details (email, phone number, address)',
            'Payment information (credit/debit card details, billing information)',
            'Account credentials (username, password)'
          ]
        },
        {
          subtitle: 'Non-Personal Information',
          items: [
            'Browser type and operating system',
            'IP address and geolocation (if enabled)',
            'Device type and unique device identifiers',
            'Website and app usage statistics (e.g., pages visited, time spent)'
          ]
        },
        {
          subtitle: 'Location Data',
          items: [
            'If enabled, we may collect and process your precise or approximate location to provide localized services such as pickup and delivery scheduling.',
            'You can manage location permissions in your device settings.'
          ]
        },
        {
          subtitle: 'Cookies and Tracking Technologies',
          items: [
            'We use cookies and similar technologies to enhance your experience, analyze website traffic, and remember preferences.',
            'You can manage cookie preferences through your browser settings.'
          ]
        }
      ]
    },
    {
      id: 'usage',
      icon: Eye,
      title: 'How We Use Your Information',
      content: [
        {
          items: [
            'Service Provision: To process orders, manage bookings, and deliver requested services.',
            'Customer Support: To respond to inquiries, troubleshoot issues, and provide assistance.',
            'Personalization: To tailor our content, recommendations, and promotional offers.',
            'Marketing Communications: To send updates, special offers, and promotions (with opt-out options).',
            'Fraud Prevention & Security: To verify transactions and detect suspicious activity.'
          ]
        }
      ]
    },
    {
      id: 'sharing',
      icon: Share2,
      title: 'Sharing Your Information',
      content: [
        {
          subtitle: 'Service Providers & Partners',
          items: [
            'Payment Processors: To securely handle transactions and payments.',
            'Logistics Partners: For order fulfillment, delivery, and scheduling.',
            'IT & Security Providers: To maintain our website, mobile app, and data security.',
            'Customer Support Services: To improve user experience and resolve issues.'
          ]
        },
        {
          subtitle: 'Business Transfers',
          items: [
            'If Eazyy undergoes a merger, acquisition, or asset sale, personal data may be transferred to the new entity.'
          ]
        }
      ]
    },
    {
      id: 'security',
      icon: Lock,
      title: 'Data Security',
      content: [
        {
          items: [
            'Encryption: Secure encryption for data storage and transactions.',
            'Access Controls: Restricted access to personal data.',
            'Fraud Prevention: Automated monitoring for suspicious activities.',
            'Secure Data Transfers: Protection for data handled by third parties.'
          ]
        }
      ]
    },
    {
      id: 'retention',
      icon: Clock,
      title: 'Data Retention & Your Rights',
      content: [
        {
          subtitle: 'Data Retention',
          items: [
            'We retain your data only as long as necessary for service purposes.',
            'When data is no longer needed, we securely delete or anonymize it.'
          ]
        },
        {
          subtitle: 'Your Rights',
          items: [
            'Right to Access: Request details of the personal data we hold about you.',
            'Right to Rectification: Request correction of inaccurate or incomplete data.',
            'Right to Erasure: Request deletion of your data.',
            'Right to Restrict Processing: Request limitation on data use.',
            'Right to Object: Opt-out of marketing communications.'
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            Last updated: March 1, 2024
          </p>
        </div>

        <div className="prose prose-lg max-w-none mb-8">
          <p className="text-gray-600">
            Welcome to Eazyy! Your privacy is important to us, and we are committed to protecting your personal data. 
            This Privacy Policy explains how we collect, use, store, and safeguard your data when you use our website, 
            mobile application, and services.
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
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  {React.createElement(section.icon, {
                    className: "w-6 h-6 text-blue-600"
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
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
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

        <div className="mt-12 bg-blue-50 rounded-2xl p-6 sm:p-8">
          <div className="flex items-start">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Contact Us
              </h2>
              <p className="text-gray-600 mb-4">
                If you have any questions or concerns regarding this Privacy Policy, please contact us:
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <Mail className="w-5 h-5 text-blue-600 mr-3" />
                  info@eazyy.app
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 text-blue-600 mr-3" />
                  +31 626076881
                </li>
                <li className="flex items-center">
                  <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                  Argonweg 34, 1362AB Almere
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            By using Eazyy, you acknowledge that you have read and understood this Privacy Policy.
            Thank you for trusting us with your personal information!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;