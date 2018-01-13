import { fromJS } from 'immutable';

import { RECEIVE_CHAT_MESSAGE } from './constants';

const initialState = fromJS({
  messages: [],
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CHAT_MESSAGE:
      return state.update('messages', (messages) =>
        messages.push(fromJS(action.payload)),
      );
    default:
      return state;
  }
}

export default homeReducer;
