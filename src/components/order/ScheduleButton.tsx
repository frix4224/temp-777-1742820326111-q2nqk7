import React from 'react';
import { useLocation } from 'react-router-dom';

const ScheduleButton: React.FC = () => {
  const location = useLocation();

  // Don't render anything - button has been removed
  return null;
};

export default ScheduleButton;