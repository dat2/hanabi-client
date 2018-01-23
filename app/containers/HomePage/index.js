import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { lifecycle, withState } from 'recompose';
import { createStructuredSelector } from 'reselect';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { setName, fetchGames } from 'features/api/actions';
import { selectGames } from 'features/api/selectors';
import apiReducer from 'features/api/reducer';

const HomePage = ({ name, setNameState, setName }) => (
  <div>
    <input value={name} onChange={(e) => setNameState(e.target.value)} />
    <button onClick={() => setName(name)}>set name</button>
  </div>
);

const mapStateToProps = createStructuredSelector({
  games: selectGames
});

const mapDispatchToProps = {
  fetchGames,
  setName,
};

export default compose(
  injectReducer({ key: 'api', reducer: apiReducer }),
  connect(mapStateToProps, mapDispatchToProps),
  withState('name', 'setNameState', ''),
  lifecycle({
    componentDidMount() {
      this.props.fetchGames();
    }
  })
)(HomePage);
