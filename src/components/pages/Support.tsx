import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ChevronUp, MessageSquare, Phone, Mail, Calendar, DollarSign, Package, Clock, Info } from 'lucide-react';

const Support: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const helpCategories = [
    {
      id: 'ordering',
      title: 'Ordering & Scheduling',
      articles: [
        { 
          id: 'how-to-order',
          title: 'How to place an order',
          content: 'To place an order:\n1. Open our app or website\n2. Select your service type\n3. Choose your items\n4. Schedule pickup & delivery times\n5. Add your address\n6. Confirm and pay'
        },
        { 
          id: 'modify-order',
          title: 'Modifying your order',
          content: 'You can modify your order up to 2 hours before the scheduled pickup time. Simply go to your Orders section and select the order you wish to modify.'
        },
        { 
          id: 'scheduling',
          title: 'Available pickup & delivery times',
          content: 'We offer pickup and delivery between 5:00 PM and 10:00 PM, 7 days a week. Same-day service is available for orders placed before 10:00 AM.'
        }
      ]
    },
    {
      id: 'services',
      title: 'Services & Pricing',
      articles: [
        { 
          id: 'service-types',
          title: 'Our service types explained',
          content: '• Eazyy Bag: Weight-based washing for regular laundry\n• Wash & Iron: Professional cleaning with pressing\n• Dry Cleaning: For delicate items\n• Repairs: Expert mending and alterations'
        },
        { 
          id: 'pricing',
          title: 'How pricing works',
          content: 'Pricing varies by service type:\n• Eazyy Bag: From €2.99/item\n• Wash & Iron: From €4.99/item\n• Dry Cleaning: From €9.99/item\n• Repairs: From €6.99/item'
        },
        { 
          id: 'special-care',
          title: 'Special care instructions',
          content: 'For delicate items or special care requirements, you can add notes during order placement. We follow care labels and handle items accordingly.'
        }
      ]
    },
    {
      id: 'account',
      title: 'Account & Billing',
      articles: [
        { 
          id: 'payment-methods',
          title: 'Accepted payment methods',
          content: 'We accept:\n• Credit/Debit Cards\n• iDEAL\n• Bancontact\n• Apple Pay\n• Google Pay'
        },
        { 
          id: 'billing-cycle',
          title: 'Billing and invoices',
          content: 'Payment is processed after order confirmation. You\'ll receive a digital invoice via email, and you can also access all invoices in your account dashboard.'
        },
        { 
          id: 'refunds',
          title: 'Refund policy',
          content: 'If you\'re not satisfied with our service, please contact us within 48 hours of delivery. We\'ll inspect the items and process eligible refunds within 3-5 business days.'
        }
      ]
    }
  ];

  const filteredCategories = helpCategories.map(category => ({
    ...category,
    articles: category.articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.articles.length > 0);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    setExpandedQuestion(null);
  };

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How can we help you?
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search our help center or browse categories below to find the answers you need
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for help articles..."
              className="w-full px-12 py-4 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Help Categories */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {filteredCategories.map((category) => (
                <div key={category.id} className="border-b border-gray-100 last:border-0">
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <h2 className="text-lg font-semibold text-gray-900">{category.title}</h2>
                    {expandedCategory === category.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {expandedCategory === category.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-4">
                          {category.articles.map((article) => (
                            <div key={article.id} className="border-b border-gray-100 last:border-0">
                              <button
                                onClick={() => toggleQuestion(article.id)}
                                className="w-full py-4 flex items-center justify-between text-left"
                              >
                                <h3 className="text-blue-600 hover:text-blue-700 font-medium">
                                  {article.title}
                                </h3>
                                {expandedQuestion === article.id ? (
                                  <ChevronUp className="w-4 h-4 text-gray-400" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 text-gray-400" />
                                )}
                              </button>
                              
                              <AnimatePresence>
                                {expandedQuestion === article.id && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="pb-4"
                                  >
                                    <p className="text-gray-600 whitespace-pre-line">
                                      {article.content}
                                    </p>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {filteredCategories.length === 0 && (
              <div className="text-center py-12">
                <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No matching articles found. Try a different search term.</p>
              </div>
            )}
          </div>

          {/* Contact Options */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <MessageSquare className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-lg font-semibold text-gray-900">Live Chat</h2>
              </div>
              <p className="text-gray-600 mb-4">Chat with our support team in real-time</p>
              <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200">
                Start Chat
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Phone className="w-6 h-6 text-green-600 mr-3" />
                <h2 className="text-lg font-semibold text-gray-900">Phone Support</h2>
              </div>
              <p className="text-gray-600 mb-2">Available Mon-Sat, 8AM-8PM</p>
              <a href="tel:+31626076881" className="text-green-600 font-medium hover:text-green-700">
                +31 6 26076881
              </a>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Mail className="w-6 h-6 text-purple-600 mr-3" />
                <h2 className="text-lg font-semibold text-gray-900">Email Support</h2>
              </div>
              <p className="text-gray-600 mb-2">We'll respond within 24 hours</p>
              <a href="mailto:support@eazyy.app" className="text-purple-600 font-medium hover:text-purple-700">
                support@eazyy.app
              </a>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-amber-600 mr-3" />
                <h2 className="text-lg font-semibold text-gray-900">Business Hours</h2>
              </div>
              <div className="space-y-2 text-gray-600">
                <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                <p>Saturday: 9:00 AM - 6:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;