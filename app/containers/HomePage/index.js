import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withState } from 'recompose';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { setName } from 'features/api/actions';
import saga from 'features/api/saga';

const HomePage = ({ name, setNameState, setName }) => (
  <div>
    <input value={name} onChange={(e) => setNameState(e.target.value)} />
    <button onClick={() => setName(name)}>set name</button>
    <button onClick={() => createGame()}>create game</button>
  </div>
);

const mapDispatchToProps = {
  setName,
};

const withConnect = connect(undefined, mapDispatchToProps);

export default compose(
  withConnect,
  withState('name', 'setNameState', ''),
)(HomePage);
