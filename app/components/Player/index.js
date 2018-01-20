import React from 'react';

const Player = ({ name, hand }) => (
  <div>
    <p>{name}</p>
    {hand.map((card, index) => <Card key={`${card.number} ${card.colour} ${index}`} {...card} />)}
  </div>
);

export default Player;
