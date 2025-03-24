import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { format, addDays, isBefore, isAfter, setHours, setMinutes } from 'date-fns';
import { Calendar, Clock, ArrowLeft, ArrowRight, DoorOpen, Building2, UserRound, Info } from 'lucide-react';

interface DeliveryOption {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  instructions?: string[];
}

const SchedulePickup: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);
  const [pickupTime, setPickupTime] = useState<string>('');
  const [deliveryTime, setDeliveryTime] = useState<string>('');
  const [pickupOption, setPickupOption] = useState<string>('');
  const [deliveryOption, setDeliveryOption] = useState<string>('');
  const [notes, setNotes] = useState('');

  // Get order details from location state
  const { service, items, address } = location.state || {};

  // Generate available dates (next 7 days)
  const availableDates = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i + 1));

  // Generate available time slots (17:00-22:00)
  const timeSlots = [
    '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  const deliveryOptions: DeliveryOption[] = [
    {
      id: 'in-person',
      title: 'Receive in Person',
      description: 'Hand-delivered directly to you',
      icon: UserRound,
      instructions: [
        'You will get notified when we arrive',
        'Have your laundry ready',
        'Be available in the selected time slot'
      ]
    },
    {
      id: 'door',
      title: 'Leave at Door',
      description: 'Contactless delivery at your doorstep',
      icon: DoorOpen,
      instructions: [
        'Place your laundry outside your door',
        'We will notify you when we arrive',
        'Ensure the area is accessible'
      ]
    },
    {
      id: 'reception',
      title: 'Drop off at Reception',
      description: 'Leave with building reception/concierge',
      icon: Building2,
      instructions: [
        'Inform your reception/concierge',
        'We will collect from reception',
        'Available for apartments and offices'
      ]
    }
  ];

  // Check if a time slot is available for pickup
  const isPickupTimeAvailable = (time: string) => {
    if (!pickupDate) return false;
    const [hours, minutes] = time.split(':').map(Number);
    const slotTime = setMinutes(setHours(pickupDate, hours), minutes);
    return isAfter(slotTime, new Date());
  };

  // Check if a time slot is available for delivery
  const isDeliveryTimeAvailable = (time: string) => {
    if (!pickupDate || !deliveryDate) return false;
    const [hours, minutes] = time.split(':').map(Number);
    const slotTime = setMinutes(setHours(deliveryDate, hours), minutes);
    return isAfter(slotTime, pickupDate);
  };

  const handleContinue = () => {
    if (!pickupDate || !deliveryDate || !pickupTime || !deliveryTime || !pickupOption || !deliveryOption) {
      return;
    }

    // Combine dates and times
    const pickup = new Date(pickupDate);
    const [pickupHours, pickupMinutes] = pickupTime.split(':').map(Number);
    pickup.setHours(pickupHours, pickupMinutes);

    const delivery = new Date(deliveryDate);
    const [deliveryHours, deliveryMinutes] = deliveryTime.split(':').map(Number);
    delivery.setHours(deliveryHours, deliveryMinutes);

    // Navigate to confirmation with all order details
    navigate('/order/confirmation', {
      state: {
        service,
        items,
        pickup_date: pickup.toISOString(),
        delivery_date: delivery.toISOString(),
        pickup_address: `${address?.street}, ${address?.city} ${address?.postalCode}`,
        delivery_address: `${address?.street}, ${address?.city} ${address?.postalCode}`,
        pickup_option: pickupOption,
        delivery_option: deliveryOption,
        special_instructions: notes
      }
    });
  };

  const handleBack = () => {
    navigate('/order/address', { 
      state: { service, items, address } 
    });
  };

  const isNextEnabled = pickupDate && deliveryDate && pickupTime && deliveryTime && pickupOption && deliveryOption;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Schedule Pickup & Delivery
          </h1>
          <p className="text-lg text-gray-600">
            Choose your preferred pickup and delivery times
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pickup Section */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div className="flex items-center mb-6">
                <Calendar className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-xl font-bold text-gray-900">Pickup Date</h2>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-8">
                {availableDates.map((date) => (
                  <motion.button
                    key={date.toISOString()}
                    onClick={() => setPickupDate(date)}
                    className={`p-3 rounded-xl text-center transition-all duration-300 ${
                      pickupDate?.toDateString() === date.toDateString()
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-sm font-medium">
                      {format(date, 'EEE')}
                    </div>
                    <div className="text-lg font-bold">
                      {format(date, 'd')}
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 text-blue-600 mr-3" />
                  <h2 className="text-xl font-bold text-gray-900">Pickup Time</h2>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <motion.button
                      key={`pickup-${time}`}
                      onClick={() => setPickupTime(time)}
                      disabled={!isPickupTimeAvailable(time)}
                      className={`p-3 rounded-xl text-center transition-all duration-300 ${
                        pickupTime === time
                          ? 'bg-blue-600 text-white'
                          : isPickupTimeAvailable(time)
                          ? 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                      whileHover={isPickupTimeAvailable(time) ? { scale: 1.05 } : {}}
                      whileTap={isPickupTimeAvailable(time) ? { scale: 0.95 } : {}}
                    >
                      {time}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <Info className="w-6 h-6 text-blue-600 mr-3" />
                  <h2 className="text-xl font-bold text-gray-900">Pickup Preference</h2>
                </div>

                <div className="space-y-3">
                  {deliveryOptions.map((option) => (
                    <motion.button
                      key={option.id}
                      onClick={() => setPickupOption(option.id)}
                      className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                        pickupOption === option.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-lg ${
                          pickupOption === option.id ? 'bg-white/20' : 'bg-white'
                        } flex items-center justify-center mr-3`}>
                          {React.createElement(option.icon, {
                            className: pickupOption === option.id ? 'text-white' : 'text-blue-600'
                          })}
                        </div>
                        <div>
                          <div className="font-medium">{option.title}</div>
                          <div className={pickupOption === option.id ? 'text-white/80' : 'text-gray-500'}>
                            {option.description}
                          </div>
                        </div>
                      </div>
                      {pickupOption === option.id && option.instructions && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pl-13"
                        >
                          <ul className="space-y-2 pl-4">
                            {option.instructions.map((instruction, index) => (
                              <li key={index} className="flex items-start text-white/80 text-sm">
                                <div className="w-1.5 h-1.5 bg-white rounded-full mt-1.5 mr-2 flex-shrink-0" />
                                {instruction}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Section */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div className="flex items-center mb-6">
                <Calendar className="w-6 h-6 text-green-600 mr-3" />
                <h2 className="text-xl font-bold text-gray-900">Delivery Date</h2>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-8">
                {availableDates.map((date) => (
                  <motion.button
                    key={date.toISOString()}
                    onClick={() => setDeliveryDate(date)}
                    disabled={!pickupDate || isBefore(date, pickupDate)}
                    className={`p-3 rounded-xl text-center transition-all duration-300 ${
                      deliveryDate?.toDateString() === date.toDateString()
                        ? 'bg-green-600 text-white'
                        : !pickupDate || isBefore(date, pickupDate)
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                    whileHover={pickupDate && !isBefore(date, pickupDate) ? { scale: 1.05 } : {}}
                    whileTap={pickupDate && !isBefore(date, pickupDate) ? { scale: 0.95 } : {}}
                  >
                    <div className="text-sm font-medium">
                      {format(date, 'EEE')}
                    </div>
                    <div className="text-lg font-bold">
                      {format(date, 'd')}
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 text-green-600 mr-3" />
                  <h2 className="text-xl font-bold text-gray-900">Delivery Time</h2>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <motion.button
                      key={`delivery-${time}`}
                      onClick={() => setDeliveryTime(time)}
                      disabled={!isDeliveryTimeAvailable(time)}
                      className={`p-3 rounded-xl text-center transition-all duration-300 ${
                        deliveryTime === time
                          ? 'bg-green-600 text-white'
                          : isDeliveryTimeAvailable(time)
                          ? 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                      whileHover={isDeliveryTimeAvailable(time) ? { scale: 1.05 } : {}}
                      whileTap={isDeliveryTimeAvailable(time) ? { scale: 0.95 } : {}}
                    >
                      {time}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <Info className="w-6 h-6 text-green-600 mr-3" />
                  <h2 className="text-xl font-bold text-gray-900">Delivery Preference</h2>
                </div>

                <div className="space-y-3">
                  {deliveryOptions.map((option) => (
                    <motion.button
                      key={option.id}
                      onClick={() => setDeliveryOption(option.id)}
                      className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                        deliveryOption === option.id
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-lg ${
                          deliveryOption === option.id ? 'bg-white/20' : 'bg-white'
                        } flex items-center justify-center mr-3`}>
                          {React.createElement(option.icon, {
                            className: deliveryOption === option.id ? 'text-white' : 'text-green-600'
                          })}
                        </div>
                        <div>
                          <div className="font-medium">{option.title}</div>
                          <div className={deliveryOption === option.id ? 'text-white/80' : 'text-gray-500'}>
                            {option.description}
                          </div>
                        </div>
                      </div>
                      {deliveryOption === option.id && option.instructions && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pl-13"
                        >
                          <ul className="space-y-2 pl-4">
                            {option.instructions.map((instruction, index) => (
                              <li key={index} className="flex items-start text-white/80 text-sm">
                                <div className="w-1.5 h-1.5 bg-white rounded-full mt-1.5 mr-2 flex-shrink-0" />
                                {instruction}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div className="mt-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="flex items-center mb-4">
              <Info className="w-6 h-6 text-gray-600 mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Notes to Driver</h2>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any special instructions for pickup or delivery..."
              className="w-full h-32 px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300 resize-none"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <motion.button
            onClick={handleBack}
            className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </motion.button>

          <motion.button
            onClick={handleContinue}
            className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              isNextEnabled
                ? 'bg-blue-600 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            whileHover={isNextEnabled ? { scale: 1.05 } : {}}
            whileTap={isNextEnabled ? { scale: 0.95 } : {}}
            disabled={!isNextEnabled}
          >
            Continue
            <ArrowRight className="w-5 h-5 ml-2" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default SchedulePickup;