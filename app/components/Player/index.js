import React from 'react';
import PropTypes from 'prop-types';

import Card from 'components/Card';

const Player = ({ displayName, hand }) => (
  <div>
    <p>{displayName}</p>
    {hand.map((card) => (
      <Card key={`${card.number} ${card.colour}`} {...card} />
    ))}
  </div>
);

Player.propTypes = {
  displayName: PropTypes.string.isRequired,
  hand: PropTypes.arrayOf(PropTypes.shape(Card.propTypes)).isRequired,
};

export default Player;
