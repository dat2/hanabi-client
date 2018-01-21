import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { createGame } from 'features/api/actions';
import saga from 'features/api/saga';

const Lobby = ({ createGame }) => (
  <div>
    <button onClick={createGame}>create game</button>
  </div>
);

Lobby.propTypes = {
  createGame: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  createGame
};

const withConnect = connect(undefined, mapDispatchToProps);

export default compose(
  injectSaga({ key: 'api', saga }),
  withConnect,
)(Lobby);
