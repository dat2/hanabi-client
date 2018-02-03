import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { lifecycle } from 'recompose';
import { firestoreConnect } from 'react-redux-firebase';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Player from 'components/Player';
import { joinGame } from 'features/games/actions';
import reducer from 'features/hanabi/reducer';
import saga from 'features/hanabi/saga';

export function Hanabi({ game }) {
  return (
    <article>
      <pre>{JSON.stringify(game, null, 2)}</pre>
      {/* <ul>{messages.map((m) => <li key={m.id}>{m.message}</li>)}</ul>*/}
      {game &&
        game.players.map((player) => <Player key={player.name} {...player} />)}
    </article>
  );
}

Hanabi.propTypes = {
  game: PropTypes.object,
};

const mapStateToProps = (
  { firestore: { data } },
  { match: { params: { gameId } } },
) => ({
  game: data.games && data.games[gameId],
});

const mapDispatchToProps = {
  joinGame,
};

export default compose(
  injectReducer({ key: 'hanabi', reducer }),
  injectSaga({ key: 'hanabi', saga }),
  firestoreConnect(({ match: { params: { gameId } } }) => [`games/${gameId}`]),
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      if (this.props.game) {
        this.props.joinGame(this.props.match.params.gameId);
      }
    },
    componentWillReceiveProps(nextProps) {
      if (!this.props.game && nextProps.game) {
        this.props.joinGame(this.props.match.params.gameId);
      }
    },
  }),
)(Hanabi);
