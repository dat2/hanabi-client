import { fromJS } from 'immutable';

import { SEND_MESSAGE, RECEIVE_MESSAGE } from './constants';

const initialState = fromJS({
  messages: []
});

function homeReducer(state = initialState, action) {
  switch(action.type) {
    case SEND_MESSAGE:
    case RECEIVE_MESSAGE:
      return state.update('messages', messages => messages.push(fromJS(action.payload)));
    default:
      return state;
  }
}

export default homeReducer;
