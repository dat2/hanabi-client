import React from 'react';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { push, replace } from 'react-router-redux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';
import { getCookie } from 'redux-cookie';

import HomePage from 'containers/HomePage/Loadable';
import SetNamePage from 'containers/SetNamePage/Loadable';
import CreateGamePage from 'containers/CreateGamePage/Loadable';
import Hanabi from 'containers/Hanabi/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import apiSaga from 'features/api/saga';
import apiReducer from 'features/api/reducer';

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/set-name" component={SetNamePage} />
        <Route path="/create" component={CreateGamePage} />
        <Route path="/games/:gameId" component={Hanabi} />
        <Route component={NotFoundPage} />
      </Switch>
    </main>
  );
}

const mapDispatchToProps = {
  getCookie,
  push,
  replace,
};

export default compose(
  withRouter,
  injectSaga({ key: 'api', saga: apiSaga }),
  injectReducer({ key: 'api', reducer: apiReducer }),
  connect(undefined, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const name = this.props.getCookie('name');
      if (!name) {
        this.props.push({
          pathname: '/set-name',
          state: { from: this.props.location.pathname },
        });
      } else {
        this.props.replace({
          pathname: '/',
        });
      }
    },
  }),
)(App);
