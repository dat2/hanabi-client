import React from 'react';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { push, replace } from 'react-router-redux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';
import { withFirestore, isLoaded } from 'react-redux-firebase';

import ErrorBoundary from 'components/ErrorBoundary';
import HomePage from 'containers/HomePage/Loadable';
import SignUpPage from 'containers/SignUpPage/Loadable';
import CreateGamePage from 'containers/CreateGamePage/Loadable';
import Hanabi from 'containers/Hanabi/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import injectSaga from 'utils/injectSaga';

import gamesSaga from 'features/games/saga';
import userSaga from 'features/user/saga';
import { login } from 'features/user/actions';

function App() {
  return (
    <ErrorBoundary>
      <main>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/create" component={CreateGamePage} />
          <Route path="/games/:gameId" component={Hanabi} />
          <Route component={NotFoundPage} />
        </Switch>
      </main>
    </ErrorBoundary>
  );
}

const mapStateToProps = ({ firebase: { profile } }) => ({
  profile,
});

const mapDispatchToProps = {
  push,
  replace,
  login,
};

export default compose(
  withRouter,
  withFirestore,
  injectSaga({ key: 'user', saga: userSaga }),
  injectSaga({ key: 'games', saga: gamesSaga }),
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.login({
        email: 'nickdujay@gmail.com',
        password: 'abc123',
      });
    },
    componentWillReceiveProps(nextProps) {
      if (!isLoaded(this.props.profile) && isLoaded(nextProps.profile)) {
        // TODO redirect to create user page
      }
    },
  }),
)(App);
