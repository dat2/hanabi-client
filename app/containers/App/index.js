/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import Hanabi from 'containers/Hanabi/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

export default function App() {
  return (
    <div>
      <Helmet>
        <meta name="description" content="" />
      </Helmet>
      <Switch>
        <Route exact path="/games/:gameId" component={Hanabi} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
