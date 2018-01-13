import { fromJS } from 'immutable';

import { RECEIVE_CHAT_MESSAGE, INITIALIZE_GAME } from './constants';

const initialState = fromJS({
  messages: [],
  game: null,
  players: [{ name: 'nick' }, { name: 'bob' }],
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CHAT_MESSAGE:
      return state.update('messages', (messages) =>
        messages.push(fromJS(action.payload)),
      );
    case INITIALIZE_GAME:
      return state.set('game', fromJS(action.payload.blob));
    default:
      return state;
  }
}

export default homeReducer;
