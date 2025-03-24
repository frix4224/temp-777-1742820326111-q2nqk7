import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, Calendar, Package, MapPin, ArrowRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface LocationState {
  orderNumber: string;
  totalAmount: number;
  estimatedDelivery: string;
  paymentId?: string;
}

const OrderSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  useEffect(() => {
    if (!state?.orderNumber) {
      navigate('/');
      return;
    }

    const updateOrderStatus = async () => {
      try {
        const { error } = await supabase
          .from('orders')
          .update({ 
            status: 'processing',
            payment_status: 'paid'
          })
          .eq('order_number', state.orderNumber);

        if (error) {
          console.error('Error updating order status:', error);
        }
      } catch (error) {
        console.error('Error in updateOrderStatus:', error);
      }
    };

    updateOrderStatus();
  }, [state?.orderNumber, navigate]);

  if (!state?.orderNumber) {
    return null;
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for your order. Your laundry is in good hands!
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center">
                <Package className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-600">Order Number</span>
              </div>
              <span className="font-medium text-gray-900">{state.orderNumber}</span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-600">Estimated Delivery</span>
              </div>
              <span className="font-medium text-gray-900">
                {new Date(state.estimatedDelivery).toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-600">Total Amount</span>
              </div>
              <span className="font-medium text-gray-900">
                €{state.totalAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Next?</h3>
          <div className="space-y-3 text-gray-600">
            <p>• You'll receive a confirmation email with your order details</p>
            <p>• We'll notify you when your laundry is picked up</p>
            <p>• Track your order status in the app or website</p>
            <p>• Get updates on delivery progress</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            onClick={() => navigate('/account/orders')}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Order Status
            <ArrowRight className="w-5 h-5 ml-2" />
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
      </div>
    </div>
  );
};

export default OrderSuccess;