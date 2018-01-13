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
import { withState } from 'recompose';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import messages from './messages';
import { sendMessage } from './actions';
import { selectMessages } from './selectors';
import reducer from './reducer';
import saga from './saga';

export function HomePage({ message, setMessage, sendMessage, messages }) {
  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="" />
      </Helmet>
      <div>
        <input value={message} onChange={e => setMessage(e.target.value)} />
        <button onClick={() => sendMessage(message)}>
          Send message
        </button>
        <ul>
        {
          messages.map((message, index) => <li key={index}>{ message }</li>)
        }
        </ul>
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
  messages: selectMessages
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withState('message', 'setMessage', '')
)(HomePage);
