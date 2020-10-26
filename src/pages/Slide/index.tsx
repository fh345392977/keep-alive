import React from 'react';
import { useLocation } from 'react-router-dom';

export default () => {
  const location = useLocation();
  return <div>slide-{location.pathname}</div>;
};
