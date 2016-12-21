import React from 'react';


const Loady = () => (
  <div className="loady">
    <svg
      className="loady-svg"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
    >
      <polygon
        className="loady--inner"
        points="68.00,50.00 59.00,34.41 41.00,34.41 32.00,50.00 41.00,65.59 59.00,65.59"
        opacity="1"
        fill="rgba(0,0,0,0)"
        fillOpacity="1"
        stroke="#EEFF41"
        strokeWidth="7"
        strokeOpacity="1" strokeDasharray="22 30"
      />
      <rect
        className="loady--outer"
        x="17.5" y="17.5"
        width="65" height="65"
        opacity="1"
        fill="rgba(0,0,0,0)"
        fillOpacity="1"
        stroke="#EEFF41"
        strokeWidth="7"
        strokeOpacity="1"
        strokeDasharray="13 13"
      />
    </svg>
  </div>
);

export default Loady;
