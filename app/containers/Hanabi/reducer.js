import { fromJS } from 'immutable';
import * as R from 'ramda';

import {
  RECEIVE_CHAT_MESSAGE,
  INITIALIZE_GAME,
  DEAL_CARD,
  SET_NEXT_PLAYER,
} from './constants';

const initialState = fromJS({
  messages: [],
  deck: [],
  playerHands: [],
  players: [{ name: 'nick' }, { name: 'bob' }],
  currentPlayer: 0,
});

function onReceiveChatMessage(state, message) {
  return state.update('messages', (messages) => messages.push(fromJS(message)));
}

function onInitializeGame(state, diff) {
  return state.merge(fromJS(diff));
}

function onDealCard(state) {
  const nextCard = state.get('deck').first();
  if (nextCard) {
    return state
      .set('deck', state.get('deck').shift())
      .updateIn(['playerHands', state.get('currentPlayer')], (hand) =>
        hand.unshift(nextCard),
      );
  }
  return state;
}

function onSetNextPlayer(state) {
  return state.set(
    'currentPlayer',
    R.mathMod(state.get('currentPlayer') + 1, state.get('players').size),
  );
}

function hanabiReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CHAT_MESSAGE:
      return onReceiveChatMessage(state, action.payload);
    case INITIALIZE_GAME:
      return onInitializeGame(state, action.payload);
    case DEAL_CARD:
      return onDealCard(state);
    case SET_NEXT_PLAYER:
      return onSetNextPlayer(state);
    default:
      return state;
  }
}

export default hanabiReducer;
