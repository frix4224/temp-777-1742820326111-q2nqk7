import React from 'react';
import { Shirt } from 'lucide-react';
import BaseItemSelection from './BaseItemSelection';
import { useServices } from '../../../contexts/ServicesContext';

const WashAndIronItems: React.FC = () => {
  const { services } = useServices();
  const service = services.find(s => s.service_identifier === 'wash-iron');

  const serviceInfo = {
    id: service?.service_identifier || 'wash-iron',
    name: service?.name || 'Wash & Iron',
    icon: Shirt,
    color: service?.color_scheme?.primary || 'bg-purple-600',
    lightColor: service?.color_scheme?.secondary || 'bg-purple-50',
    description: service?.short_description || 'Professional cleaning and pressing service',
    features: service?.features || []
  };

  return (
    <BaseItemSelection
      service="wash-iron"
      serviceInfo={serviceInfo}
    />
  );
};

export default WashAndIronItems;