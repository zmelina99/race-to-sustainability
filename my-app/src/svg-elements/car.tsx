import React from "react";
export 
const F1CarSvg = () => (
  <svg
    width="100"
    height="50"
    viewBox="0 0 100 50"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Body of the car */}
    <rect x="15" y="20" width="70" height="10" rx="5" fill="#ff0000" />
    {/* Rear wing */}
    <rect x="10" y="18" width="10" height="5" fill="#000000" />
    {/* Front wing */}
    <rect x="80" y="18" width="10" height="5" fill="#000000" />
    {/* Rear wheels */}
    <circle cx="20" cy="35" r="5" fill="#000000" />
    <circle cx="30" cy="35" r="5" fill="#000000" />
    {/* Front wheels */}
    <circle cx="70" cy="35" r="5" fill="#000000" />
    <circle cx="80" cy="35" r="5" fill="#000000" />
    {/* Driver's helmet */}
    <circle cx="50" cy="15" r="5" fill="#ffffff" />
  </svg>
);

export default F1CarSvg;
