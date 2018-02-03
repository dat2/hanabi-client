import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withState } from 'recompose';
import { firestoreConnect } from 'react-redux-firebase';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Player from 'components/Player';
import reducer from 'features/hanabi/reducer';
import saga from 'features/hanabi/saga';

export function Hanabi({ message, setMessage, game }) {
  return (
    <article>
      <div>
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      <pre>{JSON.stringify(game, null, 2)}</pre>
      {/* <ul>{messages.map((m) => <li key={m.id}>{m.message}</li>)}</ul>*/}
      {game &&
        game.players.map((player) => <Player key={player.name} {...player} />)}
    </article>
  );
}

Hanabi.propTypes = {
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  game: PropTypes.object,
};

const mapStateToProps = (
  { firestore: { data } },
  { match: { params: { gameId } } },
) => ({
  game: data.games && data.games[gameId],
});

export default compose(
  injectReducer({ key: 'hanabi', reducer }),
  injectSaga({ key: 'hanabi', saga }),
  firestoreConnect(({ match: { params: { gameId } } }) => [`games/${gameId}`]),
  connect(mapStateToProps),
  withState('message', 'setMessage', ''),
)(Hanabi);
