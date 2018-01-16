import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { createGame } from './actions';
import reducer from './reducer';
import saga from './saga';

const Lobby = ({ createGame }) => (
  <div>
    <button onClick={createGame}>create game</button>
  </div>
);

Lobby.propTypes = {
  createGame: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = {
  createGame
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'lobby', reducer });
const withSaga = injectSaga({ key: 'lobby', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Lobby);
