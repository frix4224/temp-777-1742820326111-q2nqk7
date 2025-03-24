import React from 'react';
import { Package } from 'lucide-react';
import BaseItemSelection from './BaseItemSelection';
import { useServices } from '../../../contexts/ServicesContext';

const EazyBagItems: React.FC = () => {
  const { services } = useServices();
  const service = services.find(s => s.service_identifier === 'easy-bag');

  const serviceInfo = {
    id: service?.service_identifier || 'easy-bag',
    name: service?.name || 'Eazyy Bag',
    icon: Package,
    color: service?.color_scheme?.primary || 'bg-blue-600',
    lightColor: service?.color_scheme?.secondary || 'bg-blue-50',
    description: service?.short_description || 'Weight-based washing service for regular laundry',
    features: service?.features || []
  };

  return (
    <BaseItemSelection
      service="easy-bag"
      serviceInfo={serviceInfo}
    />
  );
};

export default EazyBagItems;