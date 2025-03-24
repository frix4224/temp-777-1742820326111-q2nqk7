import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Loader, AlertCircle, Eye, EyeOff, Phone } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import AuthLayout from './AuthLayout';
import { z } from 'zod';

// Validation schemas
const emailSchema = z
  .string()
  .email('Invalid email address');

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
}

interface ValidationErrors {
  [key: string]: string;
}

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [cooldownEndTime, setCooldownEndTime] = useState<number | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);

  // Rate limiting configuration
  const RATE_LIMIT_COOLDOWN = 60000; // 60 seconds cooldown
  const RATE_LIMIT_ATTEMPTS = 2; // Allow 2 attempts before cooldown

  // Countdown timer for cooldown period
  useEffect(() => {
    if (!cooldownEndTime) return;

    const timer = setInterval(() => {
      if (Date.now() >= cooldownEndTime) {
        setCooldownEndTime(null);
        setAttemptCount(0);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldownEndTime]);

  const validateField = async (name: keyof FormData, value: string): Promise<string | null> => {
    try {
      switch (name) {
        case 'email':
          emailSchema.parse(value);
          break;
        case 'password':
          passwordSchema.parse(value);
          break;
        case 'confirmPassword':
          if (value !== formData.password) {
            return 'Passwords do not match';
          }
          break;
        case 'firstName':
        case 'lastName':
          if (!value.trim()) {
            return `${name === 'firstName' ? 'First' : 'Last'} name is required`;
          }
          break;
        case 'phone':
          if (value && !/^\+?[\d\s-]{10,}$/.test(value)) {
            return 'Invalid phone number format';
          }
          break;
      }
      return null;
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors[0].message;
      }
      return 'Validation error occurred';
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    const error = await validateField(name as keyof FormData, value);
    setErrors(prev => ({
      ...prev,
      [name]: error || ''
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if in cooldown period
    if (cooldownEndTime) {
      const remainingTime = Math.ceil((cooldownEndTime - Date.now()) / 1000);
      setErrors({ form: `Please wait ${remainingTime} seconds before trying again` });
      return;
    }

    // Validate all fields
    const validationErrors: ValidationErrors = {};
    for (const [key, value] of Object.entries(formData)) {
      const error = await validateField(key as keyof FormData, value);
      if (error) {
        validationErrors[key] = error;
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      await signUp(
        formData.email, 
        formData.password,
        {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone
          }
        }
      );

      // Reset rate limit on successful registration
      setAttemptCount(0);
      setCooldownEndTime(null);
      
      // Navigate to home page
      navigate('/');
    } catch (error: any) {
      console.error('Registration error:', error);
      
      if (error.message === 'over_email_send_rate_limit') {
        // Increment attempt count
        const newAttemptCount = attemptCount + 1;
        setAttemptCount(newAttemptCount);

        // If exceeded attempts, start cooldown
        if (newAttemptCount >= RATE_LIMIT_ATTEMPTS) {
          const cooldownEnd = Date.now() + RATE_LIMIT_COOLDOWN;
          setCooldownEndTime(cooldownEnd);
          setErrors({ 
            form: `Too many attempts. Please wait ${RATE_LIMIT_COOLDOWN / 1000} seconds before trying again` 
          });
        } else {
          setErrors({ 
            form: `Please wait a moment before trying again (${RATE_LIMIT_ATTEMPTS - newAttemptCount} attempts remaining)` 
          });
        }
      } else {
        setErrors({ 
          form: error.message || 'Error creating account. Please try again.' 
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const getFieldStatus = (fieldName: keyof FormData) => {
    if (!formData[fieldName]) return 'neutral';
    return errors[fieldName] ? 'error' : 'valid';
  };

  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Join Eazyy for hassle-free laundry service"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <AnimatePresence>
          {errors.form && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-lg bg-red-50 text-red-600 flex items-start"
            >
              <AlertCircle className="w-5 h-5 mt-0.5 mr-2 flex-shrink-0" />
              <span>{errors.form}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                disabled={loading}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-300 ${
                  getFieldStatus('firstName') === 'error'
                    ? 'border-red-300 focus:border-red-500 focus:ring focus:ring-red-200'
                    : getFieldStatus('firstName') === 'valid'
                    ? 'border-green-300 focus:border-green-500 focus:ring focus:ring-green-200'
                    : 'border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200'
                }`}
                placeholder="Enter first name"
              />
              {errors.firstName && (
                <span className="text-xs text-red-600 mt-1">{errors.firstName}</span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                disabled={loading}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-300 ${
                  getFieldStatus('lastName') === 'error'
                    ? 'border-red-300 focus:border-red-500 focus:ring focus:ring-red-200'
                    : getFieldStatus('lastName') === 'valid'
                    ? 'border-green-300 focus:border-green-500 focus:ring focus:ring-green-200'
                    : 'border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200'
                }`}
                placeholder="Enter last name"
              />
              {errors.lastName && (
                <span className="text-xs text-red-600 mt-1">{errors.lastName}</span>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-300 ${
                getFieldStatus('email') === 'error'
                  ? 'border-red-300 focus:border-red-500 focus:ring focus:ring-red-200'
                  : getFieldStatus('email') === 'valid'
                  ? 'border-green-300 focus:border-green-500 focus:ring focus:ring-green-200'
                  : 'border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200'
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className="text-xs text-red-600 mt-1">{errors.email}</span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number (Optional)
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={loading}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-300 ${
                getFieldStatus('phone') === 'error'
                  ? 'border-red-300 focus:border-red-500 focus:ring focus:ring-red-200'
                  : getFieldStatus('phone') === 'valid'
                  ? 'border-green-300 focus:border-green-500 focus:ring focus:ring-green-200'
                  : 'border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200'
              }`}
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <span className="text-xs text-red-600 mt-1">{errors.phone}</span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              className={`w-full pl-10 pr-12 py-3 rounded-xl border transition-all duration-300 ${
                getFieldStatus('password') === 'error'
                  ? 'border-red-300 focus:border-red-500 focus:ring focus:ring-red-200'
                  : getFieldStatus('password') === 'valid'
                  ? 'border-green-300 focus:border-green-500 focus:ring focus:ring-green-200'
                  : 'border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200'
              }`}
              placeholder="Create a password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            {errors.password && (
              <span className="text-xs text-red-600 mt-1">{errors.password}</span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={loading}
              className={`w-full pl-10 pr-12 py-3 rounded-xl border transition-all duration-300 ${
                getFieldStatus('confirmPassword') === 'error'
                  ? 'border-red-300 focus:border-red-500 focus:ring focus:ring-red-200'
                  : getFieldStatus('confirmPassword') === 'valid'
                  ? 'border-green-300 focus:border-green-500 focus:ring focus:ring-green-200'
                  : 'border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200'
              }`}
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            {errors.confirmPassword && (
              <span className="text-xs text-red-600 mt-1">{errors.confirmPassword}</span>
            )}
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={loading || cooldownEndTime !== null}
          className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center ${
            loading || cooldownEndTime !== null
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white shadow-lg hover:shadow-xl'
          }`}
          whileHover={loading || cooldownEndTime !== null ? {} : { scale: 1.02 }}
          whileTap={loading || cooldownEndTime !== null ? {} : { scale: 0.98 }}
        >
          {loading ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : cooldownEndTime ? (
            `Try again in ${Math.ceil((cooldownEndTime - Date.now()) / 1000)}s`
          ) : (
            'Create Account'
          )}
        </motion.button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default RegisterForm;