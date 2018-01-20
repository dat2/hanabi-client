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
import Player from 'components/Player';
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
  joinRoom: () => Actions.joinRoom(gameId)
}, dispatch);

const mapStateToProps = createStructuredSelector({
  messages: selectMessages,
  players: selectPlayers
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
