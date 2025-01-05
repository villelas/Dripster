import React, { useState } from 'react';
import './Header.css';

function Header() {
  const [isActive, setIsActive] = useState(false);

  const handleMenuClick = () => {
    setIsActive(!isActive);
    document.body.classList.toggle('menu-active', !isActive); // Add or remove class
  };

  return (
    <div className="menu" onClick={handleMenuClick}>
      <svg className="hamburger" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
        <g fill="none" stroke="#000" strokeWidth="8" strokeLinecap="round">
          <path d="M 55,26.000284 L 24.056276,25.999716" />
          <path d="M 24.056276,49.999716 L 75.943724,50.000284" />
          <path d="M 45,73.999716 L 75.943724,74.000284" />
          <path d="M 75.943724,26.000284 L 45,25.999716" />
          <path d="M 24.056276,73.999716 L 55,74.000284" />
        </g>
      </svg>
    </div>
  );
}

export default Header;