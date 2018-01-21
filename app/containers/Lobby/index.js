import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withState } from 'recompose';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { setName, createGame } from 'features/api/actions';
import saga from 'features/api/saga';

const Lobby = ({ name, setNameState, setName, createGame }) => (
  <div>
    <input value={name} onChange={(e) => setNameState(e.target.value)} />
    <button onClick={() => setName(name)}>set name</button>
    <button onClick={() => createGame()}>create game</button>
  </div>
);

Lobby.propTypes = {
  createGame: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  setName,
  createGame
};

const withConnect = connect(undefined, mapDispatchToProps);

export default compose(
  injectSaga({ key: 'api', saga }),
  withConnect,
  withState('name', 'setNameState', ''),
)(Lobby);
