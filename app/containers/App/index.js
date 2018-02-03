import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';
import { withFirestore } from 'react-redux-firebase';

import ErrorBoundary from 'components/ErrorBoundary';
import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import RegisterPage from 'containers/RegisterPage/Loadable';
import CreateGamePage from 'containers/CreateGamePage/Loadable';
import Hanabi from 'containers/Hanabi/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import injectSaga from 'utils/injectSaga';

import gamesSaga from 'features/games/saga';
import userSaga from 'features/user/saga';

function App({ location }) {
  return (
    <ErrorBoundary>
      <main>
        <Switch location={location}>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/create" component={CreateGamePage} />
          <Route path="/games/:gameId" component={Hanabi} />
          <Route component={NotFoundPage} />
        </Switch>
      </main>
    </ErrorBoundary>
  );
}

App.propTypes = {
  location: PropTypes.object.isRequired,
};

export default compose(
  withRouter,
  withFirestore,
  injectSaga({ key: 'user', saga: userSaga }),
  injectSaga({ key: 'games', saga: gamesSaga }),
)(App);
