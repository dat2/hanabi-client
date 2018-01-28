import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/fontawesome-free-solid';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { lifecycle, withState } from 'recompose';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import * as ApiActions from 'features/api/actions';
import { selectGames } from 'features/api/selectors';
import apiReducer from 'features/api/reducer';

const HomePage = ({ name, setNameState, setName, games }) => (
  <article className="mw6 center">
    <input value={name} onChange={(e) => setNameState(e.target.value)} />
    <button onClick={() => setName(name)}>set name</button>
    <Link to="/create">Create New Game</Link>
    <hr className="bb b--black-05" />
    <table className="w-100 pv2 ph3">
      <tbody>
        {games.map((game) => (
          <tr key={game.id} className="striped--light-gray">
            <td className="pv2 ph3">{game.name}</td>
            <td className="pv2 ph3">
              {game.players.length} / {game.max_players}
            </td>
            <td className="pv2 ph3">
              {game.password ? <FontAwesomeIcon icon={faLock} /> : null}
            </td>
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
  name: PropTypes.string.isRequired,
  setNameState: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  games: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      players: PropTypes.array.isRequired,
      max_players: PropTypes.number.isRequired,
      password: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

const mapStateToProps = createStructuredSelector({
  games: selectGames,
});

const mapDispatchToProps = {
  fetchGames: ApiActions.fetchGames,
  setName: ApiActions.setName,
};

export default compose(
  injectReducer({ key: 'api', reducer: apiReducer }),
  connect(mapStateToProps, mapDispatchToProps),
  withState('name', 'setNameState', ''),
  lifecycle({
    componentDidMount() {
      this.props.fetchGames();
    },
  }),
)(HomePage);
