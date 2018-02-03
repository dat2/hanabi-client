import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import FaLock from 'react-icons/lib/fa/lock';

const HomePage = ({ auth, games }) => (
  <article className="mw6 center">
    {isLoaded(auth) && isEmpty(auth) && <Redirect to="/login" />}
    <Link to="/create">Create New Game</Link>
    <hr className="bb b--black-05" />
    <table className="w-100 pv2 ph3">
      <tbody>
        {games.map((game) => (
          <tr key={game.id} className="striped--light-gray">
            <td className="pv2 ph3">{game.name}</td>
            <td className="pv2 ph3">
              {game.players.length} / {game.maxPlayers}
            </td>
            <td className="pv2 ph3">{game.protected ? <FaLock /> : null}</td>
            <td className="pv2 ph3">
              <Link to={`/games/${game.id}`}>Join</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </article>
);

HomePage.propTypes = {
  auth: PropTypes.object.isRequired,
  games: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      maxPlayers: PropTypes.number.isRequired,
      protected: PropTypes.bool.isRequired,
      password: PropTypes.string,
    }),
  ),
};

HomePage.defaultProps = {
  games: [],
};

const mapStateToProps = ({ firebase: { auth }, firestore: { ordered } }) => ({
  auth,
  games: ordered.games,
});

export default compose(
  firestoreConnect([
    {
      collection: 'games',
      where: ['unlisted', '==', false],
    },
  ]),
  connect(mapStateToProps),
)(HomePage);
