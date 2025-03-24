import React from 'react';
import { Scissors } from 'lucide-react';
import BaseItemSelection from './BaseItemSelection';
import { useServices } from '../../../contexts/ServicesContext';

const RepairItems: React.FC = () => {
  const { services } = useServices();
  const service = services.find(s => s.service_identifier === 'repairs');

  const serviceInfo = {
    id: service?.service_identifier || 'repairs',
    name: service?.name || 'Repairs & Alterations',
    icon: Scissors,
    color: service?.color_scheme?.primary || 'bg-amber-600',
    lightColor: service?.color_scheme?.secondary || 'bg-amber-50',
    description: service?.short_description || 'Expert mending and alterations services',
    features: service?.features || []
  };

  return (
    <BaseItemSelection
      service="repairs"
      serviceInfo={serviceInfo}
    />
  );
};

export default RepairItems;