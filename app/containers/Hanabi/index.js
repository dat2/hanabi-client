import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { lifecycle, withState } from 'recompose';
import Immutable from 'immutable';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Player from 'components/Player';
import { joinGame } from 'features/api/actions';
import * as Actions from 'features/game/actions';
import { selectMessages, selectPlayers } from 'features/game/selectors';
import reducer from 'features/game/reducer';
import saga from 'features/game/saga';

export function Hanabi({
  message,
  setMessage,
  sendChatMessage,
  messages,
  players,
  startGame,
}) {
  return (
    <article>
      <div>
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={() => sendChatMessage(message)}>Send message</button>
        <button onClick={() => startGame()}>Start game</button>
      </div>
    </article>
  );
}

Hanabi.propTypes = {
  sendChatMessage: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired,
  players: PropTypes.array.isRequired,
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
  joinGame: () => joinGame(gameId)
}, dispatch);

const mapStateToProps = createStructuredSelector({
  messages: selectMessages,
  players: selectPlayers
});

export default compose(
  injectReducer({ key: 'hanabi', reducer }),
  injectSaga({ key: 'hanabi', saga }),
  connect(mapStateToProps, mapDispatchToProps),
  withState('message', 'setMessage', ''),
  lifecycle({
    componentDidMount() {
      this.props.joinGame();
    }
  })
)(Hanabi);
