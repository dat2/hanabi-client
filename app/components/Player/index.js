import React from 'react';
import PropTypes from 'prop-types';

import Card from 'components/Card';

const Player = ({ name, hand }) => (
  <div>
    <p>{name}</p>
    {hand.map((card) => (
      <Card key={`${card.number} ${card.colour}`} {...card} />
    ))}
  </div>
);

Player.propTypes = {
  name: PropTypes.string.isRequired,
  hand: PropTypes.arrayOf(PropTypes.shape(Card.propTypes)).isRequired,
};

export default Player;
