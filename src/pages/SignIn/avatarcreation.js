import React from 'react';
import { useLocation } from 'react-router-dom';

const AvatarCreation = () => {
  const location = useLocation();
  const dripsterName = location.state?.dripstername || "Unknown Dripster"; // Fallback if undefined

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Welcome, {dripsterName}!</h1>
      <p>Let's create your avatar and complete your look!</p>
      {/* Avatar creation logic goes here */}
    </div>
  );
};

export default AvatarCreation;
