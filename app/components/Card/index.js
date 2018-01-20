import React from 'react';

const Card = ({ number, colour, showNumber, showColour }) => (
  <svg width="100" height="100">
    <rect width="100%" height="100%" fill="purple" />
    <rect x="30" y="30" width="40" height="40" stroke={colour} fill={colour} />
    <text x="50" y="50" textAnchor="middle" dominantBaseline="middle">
      {number}
    </text>
  </svg>
);

export default Card;
