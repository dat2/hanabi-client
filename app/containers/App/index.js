/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';

import Hanabi from 'containers/Hanabi/Loadable';
import Lobby from 'containers/Lobby/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import injectSaga from 'utils/injectSaga';
import apiSaga from 'features/api/saga';

function App() {
  return (
    <div>
      <Helmet>
        <meta name="description" content="" />
      </Helmet>
      <Switch>
        <Route exact path="/" component={Lobby} />
        <Route path="/games/:gameId" component={Hanabi} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default compose(
  injectSaga({ key: 'api', saga: apiSaga }),
  withRouter
)(App);
