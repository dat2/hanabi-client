import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { lifecycle, withState } from 'recompose';
import { firestoreConnect } from 'react-redux-firebase';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Player from 'components/Player';
import * as Actions from 'features/hanabi/actions';
import { selectMessages, selectPlayers } from 'features/hanabi/selectors';
import reducer from 'features/hanabi/reducer';
import saga from 'features/hanabi/saga';

export function Hanabi({ message, setMessage, game }) {
  return (
    <article>
      <div>
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      <pre>{JSON.stringify(game, null, 2)}</pre>
      {/*
      <ul>{messages.map((m) => <li key={m.id}>{m.message}</li>)}</ul>
      {players.map((player) => <Player key={player.name} {...player} />)}
      */}
    </article>
  );
}

Hanabi.propTypes = {
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (
  { firestore: { data } },
  { match: { params: { gameId } } },
) => ({
  game: data.games[gameId],
});

export default compose(
  injectReducer({ key: 'hanabi', reducer }),
  injectSaga({ key: 'hanabi', saga }),
  firestoreConnect((props) => [`games/${props.match.params.gameId}`]),
  connect(mapStateToProps),
  withState('message', 'setMessage', ''),
)(Hanabi);
