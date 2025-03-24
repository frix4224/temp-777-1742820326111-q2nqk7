import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, X, ArrowLeft, ArrowRight, Clock, Info } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface CustomPriceRequest {
  images: File[];
  description: string;
  item_name: string;
  urgency: 'standard' | 'express';
}

const CustomPriceRequest: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [request, setRequest] = useState<CustomPriceRequest>({
    images: [],
    description: '',
    item_name: '',
    urgency: 'standard'
  });
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);
    if (request.images.length + newFiles.length > 3) {
      setError('Maximum 3 images allowed');
      return;
    }

    // Validate file types and sizes
    const invalidFiles = newFiles.filter(file => {
      const isValidType = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      return !isValidType || !isValidSize;
    });

    if (invalidFiles.length > 0) {
      setError('Only JPG, PNG, or WebP images under 10MB are allowed');
      return;
    }

    setError(null);
    const validFiles = newFiles.filter(file => file.type.startsWith('image/'));
    const updatedImages = [...request.images, ...validFiles];
    setRequest(prev => ({ ...prev, images: updatedImages }));

    // Generate preview URLs
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrls(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeImage = (index: number) => {
    setRequest(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (images: File[]): Promise<string[]> => {
    const uploadPromises = images.map(async (image) => {
      const fileExt = image.name.split('.').pop()?.toLowerCase() || '';
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `custom-quotes/${user?.id}/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('quotes')
        .upload(filePath, image, {
          contentType: image.type,
          cacheControl: '3600'
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('quotes')
        .getPublicUrl(filePath);

      return publicUrl;
    });

    return Promise.all(uploadPromises);
  };

  const handleSubmit = async () => {
    if (!user) {
      navigate('/login', { 
        state: { 
          returnTo: '/order/custom-quote',
          orderData: request
        }
      });
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Upload images and get their URLs
      const imageUrls = await uploadImages(request.images);

      // Create the quote request in the database
      const { data, error } = await supabase
        .from('custom_price_quotes')
        .insert({
          item_name: request.item_name || request.description.split('\n')[0],
          description: request.description,
          urgency: request.urgency,
          image_url: imageUrls,
          user_id: user.id,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      // Navigate to confirmation page
      navigate('/order/quote-confirmation', {
        state: {
          message: "Your request has been sent! You'll receive a price quote within 2 hours.",
          requestId: data.id
        }
      });
    } catch (err) {
      console.error('Error submitting quote request:', err);
      setError('Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Request Custom Price Quote
          </h1>
          <p className="text-lg text-gray-600">
            Upload photos and provide details about your item for a personalized price quote
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
          {/* Image Upload */}
          <div className="mb-8">
            <label className="block text-lg font-medium text-gray-900 mb-4">
              Upload Images
              <span className="text-sm text-gray-500 ml-2">
                (Up to 3 images)
              </span>
            </label>
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors duration-300 ${
                isDragging
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-500'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files)}
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <motion.button
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </div>
                ))}
                {Array.from({ length: 3 - previewUrls.length }).map((_, index) => (
                  <div
                    key={`empty-${index}`}
                    className="h-32 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center"
                  >
                    <Upload className="w-6 h-6 text-gray-400" />
                  </div>
                ))}
              </div>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-600 font-medium hover:text-blue-700"
              >
                Upload photos
              </button>
              <p className="text-sm text-gray-500 mt-2">
                or drag and drop your images here
              </p>
            </div>

            {error && (
              <p className="mt-2 text-sm text-red-600">
                {error}
              </p>
            )}

            {/* Mobile Camera Button */}
            <motion.button
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 w-full py-3 flex items-center justify-center text-gray-600 hover:text-gray-900"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Camera className="w-5 h-5 mr-2" />
              Take a Photo
            </motion.button>
          </div>

          {/* Item Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Item Name
            </label>
            <input
              type="text"
              value={request.item_name}
              onChange={(e) => setRequest(prev => ({ ...prev, item_name: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300"
              placeholder="Enter item name"
              required
            />
          </div>

          {/* Item Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Item Description
            </label>
            <textarea
              value={request.description}
              onChange={(e) => setRequest(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Please describe the item and any specific cleaning requirements..."
              className="w-full h-32 px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300"
              required
            />
          </div>

          {/* Urgency Level */}
          <div className="mb-8">
            <label className="block text-lg font-medium text-gray-900 mb-4">
              Service Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.button
                onClick={() => setRequest(prev => ({ ...prev, urgency: 'standard' }))}
                className={`p-4 rounded-xl text-left transition-all duration-300 ${
                  request.urgency === 'standard'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center mb-2">
                  <Clock className="w-5 h-5 mr-2" />
                  <span className="font-medium">Standard Service</span>
                </div>
                <p className={request.urgency === 'standard' ? 'text-white/90' : 'text-gray-600'}>
                  Regular cleaning with standard turnaround time
                </p>
              </motion.button>

              <motion.button
                onClick={() => setRequest(prev => ({ ...prev, urgency: 'express' }))}
                className={`p-4 rounded-xl text-left transition-all duration-300 ${
                  request.urgency === 'express'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center mb-2">
                  <Clock className="w-5 h-5 mr-2" />
                  <span className="font-medium">Express Cleaning</span>
                </div>
                <p className={request.urgency === 'express' ? 'text-white/90' : 'text-gray-600'}>
                  Priority service with faster turnaround
                </p>
              </motion.button>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 rounded-xl p-4 mb-8">
            <div className="flex items-start">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-sm text-blue-900">
                <p className="font-medium mb-1">What happens next?</p>
                <ul className="space-y-1 text-blue-800">
                  <li>• We'll review your request within 2 hours</li>
                  <li>• You'll receive a detailed price quote via email</li>
                  <li>• Accept the quote to proceed with your order</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <motion.button
              onClick={() => navigate(-1)}
              className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-900"
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </motion.button>

            <motion.button
              onClick={handleSubmit}
              disabled={!request.description || request.images.length === 0 || loading}
              className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                request.description && request.images.length > 0 && !loading
                  ? 'bg-blue-600 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              whileHover={request.description && request.images.length > 0 && !loading ? { scale: 1.05 } : {}}
              whileTap={request.description && request.images.length > 0 && !loading ? { scale: 0.95 } : {}}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                  Submitting...
                </div>
              ) : (
                <>
                  Request Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPriceRequest;