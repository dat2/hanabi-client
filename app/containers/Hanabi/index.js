import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withState } from 'recompose';
import Immutable from 'immutable';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import * as Actions from './actions';
import { selectMessages } from './selectors';
import reducer from './reducer';
import saga from './saga';

export function Hanabi({ message, setMessage, sendChatMessage, messages, startGame }) {
  return (
    <article>
      <Helmet>
        <title>Hanabi</title>
        <meta name="description" content="" />
      </Helmet>
      <div>
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={() => sendChatMessage(message)}>
          Send message
        </button>
        <ul>
          {
          messages.map((m) => <li key={m.get('id')}>{ m.get('message') }</li>)
        }
        </ul>
        <button onClick={() => startGame()}>
          Send a game message
        </button>
      </div>
    </article>
  );
}

Hanabi.propTypes = {
  sendChatMessage: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  messages: PropTypes.instanceOf(Immutable.List).isRequired,
  startGame: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  sendChatMessage: Actions.sendChatMessage,
  startGame: Actions.startGame,
};

const mapStateToProps = createStructuredSelector({
  messages: selectMessages,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withState('message', 'setMessage', '')
)(Hanabi);
