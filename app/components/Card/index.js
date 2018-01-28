import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ number, colour, showNumber, showColour }) => (
  <svg width="100" height="100">
    <rect width="100%" height="100%" fill="purple" />
    <rect
      x="30"
      y="30"
      width="40"
      height="40"
      stroke="grey"
      fill={showColour ? colour : 'grey'}
    />
    <text x="50" y="50" textAnchor="middle" dominantBaseline="middle">
      {showNumber ? number : ''}
    </text>
  </svg>
);

Card.propTypes = {
  number: PropTypes.number.isRequired,
  colour: PropTypes.oneOf(['white', 'yellow', 'blue', 'green', 'red'])
    .isRequired,
  showNumber: PropTypes.bool.isRequired,
  showColour: PropTypes.bool.isRequired,
};

export default Card;
