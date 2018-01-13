import { fromJS } from 'immutable';
import * as R from 'ramda';

import {
  RECEIVE_CHAT_MESSAGE,
  INITIALIZE_GAME,
  DEAL_CARD,
  SET_NEXT_PLAYER,
  GIVE_COLOUR_INFO,
  GIVE_NUMBER_INFO,
  DISCARD,
} from './constants';

const initialState = fromJS({
  messages: [],
  deck: [],
  discardPile: [],
  players: [{ name: 'nick' }, { name: 'bob' }],
  playerHands: [],
  currentPlayer: 0,
  infoTokens: 8,
});

function onReceiveChatMessage(state, message) {
  return state.update('messages', (messages) => messages.push(fromJS(message)));
}

function onInitializeGame(state, diff) {
  return state.merge(fromJS(diff));
}

function onGivePlayerColour(state, colour, playerIndex) {
  return onGivePlayerInfo(state, colour, playerIndex, 'canSeeColour', 'colour');
}

function onGivePlayerNumber(state, colour, playerIndex) {
  return onGivePlayerInfo(state, colour, playerIndex, 'canSeeNumber', 'number');
}

function onGivePlayerInfo(state, info, playerIndex, infoKey, cardKey) {
  return state
    .updateIn(['playerHands', playerIndex], (hand) =>
      hand.map((card) =>
        card.update(infoKey, (canSee) => canSee || card.get(cardKey) === info),
      ),
    )
    .update('infoTokens', (infoTokens) => infoTokens - 1);
}

function onDiscard(state, cardIndex) {
  const currentCard = state.getIn([
    'playerHands',
    state.get('currentPlayer'),
    cardIndex,
  ]);
  return state
    .update('discardPile', (discardPile) =>
      discardPile.unshift(
        currentCard.delete('canSeeColour').delete('canSeeNumber'),
      ),
    )
    .updateIn(['playerHands', state.get('currentPlayer')], (hand) =>
      hand.delete(cardIndex),
    );
}

function onDealCard(state) {
  const nextCard = state.get('deck').first();
  if (nextCard) {
    return state
      .set('deck', state.get('deck').shift())
      .updateIn(['playerHands', state.get('currentPlayer')], (hand) =>
        hand.unshift(
          nextCard.merge({ canSeeColour: false, canSeeNumber: false }),
        ),
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
    case GIVE_COLOUR_INFO:
      return onGivePlayerColour(
        state,
        action.payload.colour,
        action.payload.playerIndex,
      );
    case GIVE_NUMBER_INFO:
      return onGivePlayerNumber(
        state,
        action.payload.number,
        action.payload.playerIndex,
      );
    case DISCARD:
      return onDiscard(state, action.payload.cardIndex);
    case DEAL_CARD:
      return onDealCard(state);
    case SET_NEXT_PLAYER:
      return onSetNextPlayer(state);
    default:
      return state;
  }
}

export default hanabiReducer;
