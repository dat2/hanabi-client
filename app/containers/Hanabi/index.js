import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { lifecycle, withState } from 'recompose';
import Immutable from 'immutable';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Card from 'components/Card';
import * as Actions from './actions';
import { selectMessages, selectPlayers } from './selectors';
import reducer from './reducer';
import saga from './saga';

export function Hanabi({
  message,
  setMessage,
  sendChatMessage,
  messages,
  players,
  startGame,
  giveColourInfo,
  giveNumberInfo,
  discard,
}) {
  return (
    <article>
      <Helmet>
        <title>Hanabi</title>
        <meta name="description" content="" />
      </Helmet>
      <div>
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={() => sendChatMessage(message)}>Send message</button>
        <ul>
          {messages.map((m) => <li key={m.get('id')}>{m.get('message')}</li>)}
        </ul>
        <button onClick={() => startGame()}>Start game</button>
        {players.map((player) => [
          <p>{player.get('name')}</p>,
          ...player.get('hand').map(card => <Card number={card.get('number')} colour={card.get('colour')} />)
        ])}
        {['white', 'yellow', 'blue', 'red', 'green'].map((colour) => (
          <button key={colour} onClick={() => giveColourInfo(colour, 1)}>
            Give {colour} colour info to player 1
          </button>
        ))}
        {[1, 2, 3, 4, 5].map((number) => (
          <button key={number} onClick={() => giveNumberInfo(number, 1)}>
            Give {number} number info to player 1
          </button>
        ))}
        {[0, 1, 2, 3, 4].map((cardIndex) => (
          <button key={cardIndex} onClick={() => discard(cardIndex)}>
            Discard {cardIndex}
          </button>
        ))}
      </div>
    </article>
  );
}

Hanabi.propTypes = {
  sendChatMessage: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  messages: PropTypes.instanceOf(Immutable.List).isRequired,
  players: PropTypes.instanceOf(Immutable.List).isRequired,
  startGame: PropTypes.func.isRequired,
  giveColourInfo: PropTypes.func.isRequired,
  giveNumberInfo: PropTypes.func.isRequired,
  discard: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch, { match: { params: { gameId } }}) => bindActionCreators({
  sendChatMessage: Actions.sendChatMessage,
  startGame: Actions.startGame,
  giveColourInfo: Actions.giveColourInfo,
  giveNumberInfo: Actions.giveNumberInfo,
  discard: Actions.discard,
  joinRoom: () => Actions.joinRoom(gameId)
}, dispatch);

const mapStateToProps = createStructuredSelector({
  messages: selectMessages,
  players: selectPlayers,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'hanabi', reducer });
const withSaga = injectSaga({ key: 'hanabi', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withState('message', 'setMessage', ''),
  lifecycle({
    componentDidMount() {
      this.props.joinRoom();
    }
  })
)(Hanabi);
