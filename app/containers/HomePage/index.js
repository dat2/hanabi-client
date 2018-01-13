/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import messages from './messages';
import { sendMessage } from './actions';
// import { } from './selectors';
import reducer from './reducer';
import saga from './saga';

export function HomePage({ sendMessage }) {
  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="" />
      </Helmet>
      <div>
        <button onClick={() => sendMessage('hello world')}>
          Send message
        </button>
      </div>
    </article>
  );
}

HomePage.propTypes = {
  sendMessage: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  sendMessage
};

const mapStateToProps = createStructuredSelector({
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
