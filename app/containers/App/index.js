import React from 'react';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';

import HomePage from 'containers/HomePage/Loadable';
import CreateGamePage from 'containers/CreateGamePage/Loadable';
import Hanabi from 'containers/Hanabi/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import injectSaga from 'utils/injectSaga';
import apiSaga from 'features/api/saga';

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/create" component={CreateGamePage} />
        <Route path="/games/:gameId" component={Hanabi} />
        <Route component={NotFoundPage} />
      </Switch>
    </main>
  );
}

export default compose(
  injectSaga({ key: 'api', saga: apiSaga }),
  withRouter
)(App);
