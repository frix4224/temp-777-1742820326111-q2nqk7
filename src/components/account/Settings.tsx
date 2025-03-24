import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Lock, Loader } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import AccountLayout from './AccountLayout';

interface Preferences {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  language: string;
}

const Settings: React.FC = () => {
  const { user, profile, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState<Preferences>(
    profile?.preferences as Preferences || {
      notifications: {
        email: true,
        push: true,
        sms: false
      },
      language: 'en'
    }
  );

  const handlePreferenceChange = async (category: string, key: string, value: any) => {
    try {
      const newPreferences = {
        ...preferences,
        [category]: category === 'notifications' 
          ? { ...preferences.notifications, [key]: value }
          : value
      };

      setPreferences(newPreferences);
      setLoading(true);

      await updateProfile({
        preferences: newPreferences
      });
    } catch (error) {
      console.error('Error updating preferences:', error);
      // Revert changes on error
      setPreferences(preferences);
    } finally {
      setLoading(false);
    }
  };

  // If no user is logged in, show loading state
  if (!user) {
    return (
      <AccountLayout activeTab="settings">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
        </div>
      </AccountLayout>
    );
  }

  return (
    <AccountLayout activeTab="settings">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>

        {/* Notifications */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <div className="flex items-center mb-6">
            <Bell className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
          </div>

          <div className="space-y-4">
            {[
              { key: 'email', label: 'Email Notifications' },
              { key: 'push', label: 'Push Notifications' },
              { key: 'sms', label: 'SMS Notifications' }
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <span className="text-gray-700">{item.label}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={preferences.notifications[item.key as keyof typeof preferences.notifications]}
                    onChange={(e) => handlePreferenceChange('notifications', item.key, e.target.checked)}
                    disabled={loading}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center mb-6">
            <Lock className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="text-lg font-bold text-gray-900">Security</h3>
          </div>

          <motion.button
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
          >
            {loading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              'Change Password'
            )}
          </motion.button>
        </div>
      </div>
    </AccountLayout>
  );
};

export default Settings;